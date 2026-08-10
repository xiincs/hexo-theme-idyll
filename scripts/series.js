/* idyll — 系列文章：按 frontmatter 的 series 字段分组，series_order 决定组内顺序 */
'use strict';

const { slugize } = require('hexo-util');

/** 名称 → 该系列下的文章，按 series_order 升序；没写 order 的按日期升序垫底 */
function groupBySeries(posts) {
  const groups = new Map();

  posts.forEach(post => {
    const name = post.series;
    if (!name) return;
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name).push(post);
  });

  groups.forEach(list => {
    list.sort((a, b) => {
      const ao = Number.isFinite(a.series_order) ? a.series_order : Infinity;
      const bo = Number.isFinite(b.series_order) ? b.series_order : Infinity;
      if (ao !== bo) return ao - bo;
      return a.date - b.date;
    });
  });

  return groups;
}

/** 跟 Hexo 内置 Category/Tag 的 path 逻辑一致，中文名不转写、直接进 URL */
function seriesPath(config, name) {
  let dir = config.series_dir || 'series';
  if (!dir.endsWith('/')) dir += '/';
  return `${dir}${slugize(String(name), { transform: config.filename_case })}/`;
}

/** 全部系列，按名字排序。/series/ 索引页用这个 */
hexo.extend.helper.register('idyll_series_list', function () {
  const groups = groupBySeries(this.site.posts);
  return Array.from(groups, ([name, posts]) => ({ name, path: seriesPath(this.config, name), posts }))
    .sort((a, b) => a.name.localeCompare(b.name));
});

/** 当前文章在其系列里的位置：{ name, path, posts, index }；不属于任何系列则返回 null。文章页的系列导航用这个 */
hexo.extend.helper.register('idyll_series', function (post) {
  const name = post && post.series;
  if (!name) return null;

  const posts = groupBySeries(this.site.posts).get(name);
  if (!posts) return null;

  const index = posts.findIndex(p => p._id === post._id);
  if (index === -1) return null;

  return { name, path: seriesPath(this.config, name), posts, index };
});

hexo.extend.generator.register('series', function (locals) {
  const groups = groupBySeries(locals.posts);
  const routes = [];

  groups.forEach((posts, name) => {
    routes.push({
      path: seriesPath(this.config, name),
      layout: ['series-detail', 'index'],
      data: { name, posts }
    });
  });

  return routes;
});
