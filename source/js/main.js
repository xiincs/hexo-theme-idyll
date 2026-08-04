/* ----------------------------------------------------------------------------
   quiet — 前端脚本

   没有依赖，全部是渐进增强：脚本不执行页面依然可读可用。
   每块功能都由 <body data-quiet> 里的开关控制，对应主题 _config.yml 的 extras。
   -------------------------------------------------------------------------- */

(function () {
  'use strict';

  var body  = document.body;
  var flags = (body.getAttribute('data-quiet') || '').split(' ');
  var on    = function (name) { return flags.indexOf(name) !== -1; };

  /* 滚动相关的活儿合并到一个 rAF 里，避免多个 scroll 监听各自触发重排 */
  var jobs = [];
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      for (var i = 0; i < jobs.length; i++) jobs[i]();
      ticking = false;
    });
  }

  /* --- 顶栏：滚动后才显示分隔线 ------------------------------------------ */

  var nav = document.getElementById('nav');
  if (nav) {
    jobs.push(function () {
      nav.classList.toggle('is-stuck', window.scrollY > 4);
    });
  }

  /* --- 阅读进度 ---------------------------------------------------------- */

  var progress = document.getElementById('progress');
  if (progress) {
    var bar = progress.firstElementChild;
    jobs.push(function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = Math.min(100, Math.max(0, pct)).toFixed(2) + '%';
    });
  }

  /* --- 回到顶部 ---------------------------------------------------------- */

  var totop = document.getElementById('totop');
  if (totop) {
    jobs.push(function () {
      totop.classList.toggle('is-on', window.scrollY > window.innerHeight * 0.7);
    });

    totop.addEventListener('click', function () {
      var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  if (jobs.length) {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }

  /* --- 正文增强：锚点 / 站外标记 / 代码复制 ------------------------------- */

  var prose = document.querySelector('.prose');

  /* 标题锚点。用已有的 id（Hexo 会自动生成），没有 id 就跳过，不去猜 */
  if (prose && on('anchor')) {
    var labelAnchor = body.getAttribute('data-anchor') || 'Link to this section';
    var heads = prose.querySelectorAll('h2[id], h3[id], h4[id]');
    Array.prototype.forEach.call(heads, function (h) {
      var a = document.createElement('a');
      a.className = 'anchor';
      a.href = '#' + h.id;
      a.textContent = '#';
      a.setAttribute('aria-label', labelAnchor);
      h.insertBefore(a, h.firstChild);
    });
  }

  /* 目录：滚动时高亮当前所在章节 */
  if (on('toc') && 'IntersectionObserver' in window) {
    var tocLinks = document.querySelectorAll('.toc__link[data-toc-id]');

    if (tocLinks.length) {
      var setActiveToc = function (id) {
        Array.prototype.forEach.call(tocLinks, function (a) {
          a.classList.toggle('is-on', a.getAttribute('data-toc-id') === id);
        });
      };

      /* 只在视口上方 15%~70% 这段区间里判定「当前章节」，
         标题刚冒头或快滑出屏幕都还不算，减少来回横跳 */
      var tocObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActiveToc(entry.target.id);
        });
      }, { rootMargin: '-15% 0px -70% 0px' });

      Array.prototype.forEach.call(tocLinks, function (a) {
        var heading = document.getElementById(a.getAttribute('data-toc-id'));
        if (heading) tocObserver.observe(heading);
      });
    }
  }

  /* 站外链接：加 ↗ 标记，并补上安全的 rel */
  if (prose && on('ext')) {
    var links = prose.querySelectorAll('a[href^="http"]');
    Array.prototype.forEach.call(links, function (a) {
      if (a.host === window.location.host) return;
      if (a.querySelector('img')) return;          // 图片链接不加角标
      a.setAttribute('data-ext', '');
      if (a.target === '_blank') a.rel = 'noopener noreferrer';
    });
  }

  /* 代码块复制按钮 */
  if (prose && on('copy') && navigator.clipboard) {
    var labelCopy = body.getAttribute('data-copy') || 'Copy';
    var labelDone = body.getAttribute('data-copied') || 'Copied';
    var labelFail = body.getAttribute('data-copyfail') || 'Press Ctrl+C';

    /* 按钮自己就是提示区，不弹 alert */
    function flash(btn, text, cls) {
      btn.textContent = text;
      btn.classList.add(cls);
      setTimeout(function () {
        btn.textContent = labelCopy;
        btn.classList.remove(cls);
      }, cls === 'is-fail' ? 2600 : 1600);
    }

    var blocks = prose.querySelectorAll('figure.highlight, pre');
    Array.prototype.forEach.call(blocks, function (block) {
      // figure.highlight 里面也有 pre，只处理最外层那个
      if (block.closest('figure.highlight') !== block && block.closest('figure.highlight')) return;

      var wrap = document.createElement('div');
      wrap.className = 'cb';
      block.parentNode.insertBefore(wrap, block);
      wrap.appendChild(block);

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy';
      btn.textContent = labelCopy;
      wrap.appendChild(btn);

      btn.addEventListener('click', function () {
        // 有行号时只取代码列，否则整块。行号不该被复制走
        var src = block.querySelector('td.code') || block;
        var text = src.innerText.replace(/\n+$/, '');

        navigator.clipboard.writeText(text).then(function () {
          flash(btn, labelDone, 'is-done');
        }, function () {
          // 非 HTTPS、或者用户拒绝了权限。选中代码，让用户自己按 Ctrl+C
          var sel = window.getSelection();
          var range = document.createRange();
          range.selectNodeContents(src);
          sel.removeAllRanges();
          sel.addRange(range);
          flash(btn, labelFail, 'is-fail');
        });
      });
    });
  }

  /* --- 评论：站内手动切换主题时，giscus 的 iframe 跟着换 ------------------ */

  function syncGiscusTheme(mode) {
    var iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe) return;
    var theme = mode === 'light' || mode === 'dark' ? mode : 'preferred_color_scheme';
    iframe.contentWindow.postMessage({ giscus: { setConfig: { theme: theme } } }, 'https://giscus.app');
  }

  /* 页面开着评论区时手动切主题，立刻同步 */
  document.addEventListener('quiet:theme', function (e) { syncGiscusTheme(e.detail); });

  /* giscus 的 iframe 是异步插进来的，加载完成时它自己会广播一条消息。
     借这条消息补一次同步：如果打开页面前就已经手动切到某个主题，
     giscus 默认跟的是系统偏好（见 comments.ejs 的 data-theme），
     这一步能避免评论区先按系统配色闪一下、再变成站点当前配色 */
  window.addEventListener('message', function (e) {
    if (e.origin !== 'https://giscus.app') return;
    if (!(e.data && e.data.giscus)) return;
    var current = document.documentElement.getAttribute('data-theme');
    if (current) syncGiscusTheme(current);
  });
})();
