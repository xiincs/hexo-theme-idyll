# idyll

[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)
[![Hexo](https://img.shields.io/badge/hexo-%3E%3D7.0-0E83CD?logo=hexo&logoColor=white)](https://hexo.io)
[![GitHub stars](https://img.shields.io/github/stars/xiincs/hexo-theme-idyll?color=blue)](https://github.com/xiincs/hexo-theme-idyll/stargazers)
[![GitHub last commit](https://img.shields.io/github/last-commit/xiincs/hexo-theme-idyll)](https://github.com/xiincs/hexo-theme-idyll/commits/master)
[![GitHub issues](https://img.shields.io/github/issues/xiincs/hexo-theme-idyll)](https://github.com/xiincs/hexo-theme-idyll/issues)

[English](README.md) | **简体中文**

有时候打开一个博客，像走进一间过度装修的客厅。主题在尖叫，插件在打架，而你想看的那些字，缩在角落里喘不过气。

idyll 是另一回事。

它是一间朝南的房间，桌子上有光，窗外有树。你坐下来，字就是字，段落就是段落，没有东西抢戏。

这个名字取自"田园诗"——野地里自然长出来的安静。我们没打算做最酷的主题，只想做一个你写十年字也不会觉得吵的主题。

![idyll 截图](screenshot.png)

## 先决条件

- Hexo >= 7.0
- Node.js >= 18

## 安装

```bash
cd your-hexo-site
git clone https://github.com/xiincs/hexo-theme-idyll.git themes/idyll
cd themes/idyll && npm install
```

然后在你站点的 `_config.yml` 里：

```yaml
theme: idyll
```

就这些。没有构建步骤，没有框架依赖，没有客户端路由。主题目录里多出来的那点东西，只是为了帮你把字摆得更好看一点。

## 配置

打开 `themes/idyll/_config.yml`。所有选项都在里面，注释写得比代码还长，应该不用我多说。

如果你非要一个例子：

```yaml
hero:
  title: "把想清楚的事情，写下来。"
  subtitle: "关于代码、工具，以及一些还没想明白的日常。"

about:
  name: "你的名字"
  avatar: "https://example.com/avatar.png"
  bio: |
    一段简介，空行分段。
```

剩下的，顺着文件往下读就行。

## 它做了什么，没做什么

做了的：

- 给文字足够的呼吸空间。行距、段距、边距都调过，读到第十段眼睛不会累。
- 暗色模式。是深夜台灯下的那种暗。
- 代码块复制、标题锚点、阅读进度条——这些小事，默认开着，但你可以在配置里关掉。
- 评论、giscus、相关文章推荐。都是可选项，默认不打扰。
- 系列文章——给几篇文章写同一个 `series`（可选 `series_order` 排序），会自动生成一个系列索引页，文章末尾也会带上“接下来看哪篇”的导航。

没做的：

- 没有瀑布流，没有卡片堆叠，没有"视觉冲击力"。
- 没有 37 个社交图标在页眉排队。
- 没有为了炫技而存在的动画。

如果你觉得上面这些"没做的"恰恰是你要的，那我们可能不太合适。这很正常，去用别的主题就好。

## 最后

这个主题是我给自己写的。如果你也喜欢它，那是意外之喜。

有问题去 [Issues](https://github.com/xiincs/hexo-theme-idyll/issues) 留言，不用客气，但也不用太客气。

[MIT](LICENSE) 协议，拿去用，拿去改，不用问我。
