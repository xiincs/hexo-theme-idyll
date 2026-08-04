/* quiet — 模板用到的几个辅助函数 */
'use strict';

const { stripHTML } = require('hexo-util');
const cheerio = require('cheerio');

const CJK = /[㐀-䶿一-鿿぀-ヿ가-힯]/g;

/** 中文按字数、西文按词数统计，两者相加 */
function countWords(content) {
  const text = stripHTML(content || '').replace(/\s+/g, ' ').trim();
  if (!text) return 0;
  const cjk = (text.match(CJK) || []).length;
  const latin = (text.replace(CJK, ' ').match(/[A-Za-z0-9À-ɏ]+/g) || []).length;
  return cjk + latin;
}

hexo.extend.helper.register('quiet_wordcount', countWords);

hexo.extend.helper.register('quiet_readtime', (content, speed) => {
  const wpm = Number(speed) > 0 ? Number(speed) : 300;
  return Math.max(1, Math.round(countWords(content) / wpm));
});

/** 列表摘要：优先 description，其次 <!-- more --> 之前的部分，最后截正文 */
hexo.extend.helper.register('quiet_excerpt', (post, length) => {
  const len = Number(length) > 0 ? Number(length) : 110;
  const raw = post.description || post.excerpt || post.content || '';
  const text = stripHTML(raw).replace(/\s+/g, ' ').trim();
  return text.length > len ? `${text.slice(0, len).trim()}…` : text;
});

/** 标签云只分三档，避免大小悬殊看着乱 */
hexo.extend.helper.register('quiet_tagstep', (count, max) => {
  if (!max || max <= 1) return 2;
  const ratio = count / max;
  if (ratio > 0.66) return 3;
  if (ratio > 0.33) return 2;
  return 1;
});

/** 目录：只取 h2/h3（见 anchor 功能已依赖的 heading id），h3 挂在最近的 h2 下面 */
hexo.extend.helper.register('quiet_toc', (content) => {
  if (!content) return [];
  const $ = cheerio.load(content);
  const items = [];
  let current = null;

  $('h2[id], h3[id]').each((_, el) => {
    const $el = $(el);
    const text = $el.text().trim();
    const id = $el.attr('id');
    if (!text || !id) return;

    const node = { id, text, children: [] };
    const tag = (el.tagName || el.name || '').toLowerCase();

    if (tag === 'h2') {
      items.push(node);
      current = node;
    } else if (current) {
      current.children.push(node);
    } else {
      // h3 出现在第一个 h2 之前，就当顶层处理，不丢
      items.push(node);
    }
  });

  return items;
});

/** 相关文章：按共享标签、分类打分，同分按时间新的优先。没有标签也没有分类就不推荐 */
hexo.extend.helper.register('quiet_related', function (post, limit) {
  const max = Number(limit) > 0 ? Number(limit) : 3;
  const tags = post.tags && post.tags.length ? post.tags.map(t => t.name) : [];
  const cats = post.categories && post.categories.length ? post.categories.map(c => c.name) : [];
  if (!tags.length && !cats.length) return [];

  const scored = [];
  this.site.posts.forEach(other => {
    if (other._id === post._id) return;

    let score = 0;
    if (other.tags && other.tags.length) {
      other.tags.forEach(t => { if (tags.includes(t.name)) score += 2; });
    }
    if (other.categories && other.categories.length) {
      other.categories.forEach(c => { if (cats.includes(c.name)) score += 1; });
    }
    if (score > 0) scored.push({ post: other, score });
  });

  scored.sort((a, b) => b.score - a.score || b.post.date - a.post.date);
  return scored.slice(0, max).map(s => s.post);
});

/** 站点统计：文章数、分类数、运行天数（从最早一篇算起）、全站字数 */
hexo.extend.helper.register('quiet_site_stats', function () {
  const posts = this.site.posts;

  let oldest = null;
  let words = 0;
  posts.forEach(p => {
    if (!oldest || p.date < oldest) oldest = p.date;
    words += countWords(p.content);
  });

  const days = oldest ? Math.max(1, Math.ceil((Date.now() - oldest.valueOf()) / 86400000)) : 0;

  return {
    postCount: posts.length,
    categoryCount: this.site.categories.length,
    days,
    words
  };
});

/** 写作节奏：每篇文章在时间轴上的相对位置（0 = 最早，100 = 最新）。
    按文章本身打点，不按日历月份分桶 —— 文章少的时候按月份会有大片空白，
    按文章打点无论多少篇都不会出现这个问题。少于 2 篇没有"节奏"可言，
    返回空数组，调用方据此决定要不要渲染这块 */
hexo.extend.helper.register('quiet_writing_rhythm', function () {
  const posts = this.site.posts.toArray().slice().sort((a, b) => a.date - b.date);
  if (posts.length < 2) return [];

  const min = posts[0].date.valueOf();
  const max = posts[posts.length - 1].date.valueOf();
  const span = max - min;

  return posts.map(p => ({
    title: p.title,
    path: p.path,
    date: p.date,
    percent: span > 0 ? ((p.date.valueOf() - min) / span) * 100 : 50
  }));
});
