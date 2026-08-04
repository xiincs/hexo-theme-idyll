/* quiet — 模板用到的几个辅助函数 */
'use strict';

const { stripHTML } = require('hexo-util');

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
