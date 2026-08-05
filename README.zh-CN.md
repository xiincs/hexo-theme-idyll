# idyll

[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)
[![Hexo](https://img.shields.io/badge/hexo-%3E%3D7.0-0E83CD?logo=hexo&logoColor=white)](https://hexo.io)
[![GitHub stars](https://img.shields.io/github/stars/xiincs/hexo-theme-idyll?color=blue)](https://github.com/xiincs/hexo-theme-idyll/stargazers)
[![GitHub last commit](https://img.shields.io/github/last-commit/xiincs/hexo-theme-idyll)](https://github.com/xiincs/hexo-theme-idyll/commits/master)
[![GitHub issues](https://img.shields.io/github/issues/xiincs/hexo-theme-idyll)](https://github.com/xiincs/hexo-theme-idyll/issues)

[English](README.md) | **简体中文**

一个安静、好读的 [Hexo](https://hexo.io/) 个人博客主题。不依赖任何前端框架，没有构建步骤——只有语义化的 HTML、一份样式表，和几个渐进增强的脚本。

![idyll 截图](screenshot.png)

## 设计原则

- 底色是暖白而不是纯白，文字是墨黑而不是纯黑，长时间阅读不刺眼。
- 强调色只用来区分具体的东西（比如某个分类），不用来单纯装饰。
- 层级优先靠字重、字号和留白拉开；阴影是最后手段，最多叠两级。

## 功能

- Bento 网格布局的关于页：身份卡、自述、技能、站点数据拼在一起
- 阅读时间、字数统计（中英文都算），文章页顶部的阅读进度条
- 自动生成的文章目录，按标签/分类匹配的相关文章推荐
- 亮色 / 暗色 / 跟随系统的主题切换，记住你的选择
- [giscus](https://giscus.app/) 评论（基于 GitHub Discussions，免费、不追踪）
- 快捷键面板（按住 <kbd>Shift</kbd> 呼出，切换主题 / 回首页 / 随机文章）
- 代码块一键复制、标题悬停锚点、站外链接标记
- 以上每一项都是配置开关，不想要的可以直接关掉

## 环境要求

- Hexo >= 7.0
- Node.js >= 18

## 安装

```bash
cd your-hexo-site
git clone https://github.com/xiincs/hexo-theme-idyll.git themes/idyll
cd themes/idyll && npm install
```

主题用 [cheerio](https://cheerio.js.org/) 来生成目录，上面这步 `npm install` 会把它装在主题目录本地，不用你在博客站点自己的 `package.json` 里额外加这个依赖。

在你站点的 `_config.yml` 里指定主题：

```yaml
theme: idyll
```

## 配置

所有配置都在 `themes/idyll/_config.yml` 里，改这一个文件就够了，不用碰模板。几个重点：

```yaml
hero:
  title: "把想清楚的事情，写下来。"
  subtitle: "关于代码、工具，以及一些还没想明白的日常。"

about:
  name: "你的名字"
  avatar: "https://example.com/avatar.png"
  bio: |
    一段简介，空行分段。
  skills:
    - JavaScript
    - Python

comment:
  giscus:
    repo: "user/repo"
    repo_id: ""
    category: "Announcements"
    category_id: ""

extras:
  scroll_progress: true
  back_to_top: true
  copy_code: true
  heading_anchor: true
  external_mark: true
  theme_toggle: true
  toc: true
  related_posts: true
  shortcut_panel: true
```

完整选项见 `_config.yml` 里的注释。

## 许可

[MIT](LICENSE)
