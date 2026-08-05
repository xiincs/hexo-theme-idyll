# idyll

[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)
[![Hexo](https://img.shields.io/badge/hexo-%3E%3D7.0-0E83CD?logo=hexo&logoColor=white)](https://hexo.io)
[![GitHub stars](https://img.shields.io/github/stars/xiincs/hexo-theme-idyll?color=blue)](https://github.com/xiincs/hexo-theme-idyll/stargazers)
[![GitHub last commit](https://img.shields.io/github/last-commit/xiincs/hexo-theme-idyll)](https://github.com/xiincs/hexo-theme-idyll/commits/master)
[![GitHub issues](https://img.shields.io/github/issues/xiincs/hexo-theme-idyll)](https://github.com/xiincs/hexo-theme-idyll/issues)

**English** | [简体中文](README.zh-CN.md)

Some blogs feel like walking into an over-decorated living room. The theme is shouting, the plugins are fighting each other, and the words you actually came to read are pressed into a corner, gasping for space.

idyll is the other thing.

It's a room that faces south — light on the desk, trees outside the window. You sit down, and a word is just a word, a paragraph just a paragraph. Nothing else is competing for your attention.

The name comes from *idyll* — an old word for a peaceful scene, the kind nobody staged, that just grew that way on its own. We weren't chasing the coolest theme out there. Just one you could write in for ten years and never once find loud.

![idyll screenshot](screenshot.png)

## Requirements

- Hexo >= 7.0
- Node.js >= 18

## Installation

```bash
cd your-hexo-site
git clone https://github.com/xiincs/hexo-theme-idyll.git themes/idyll
cd themes/idyll && npm install
```

Then in your site's `_config.yml`:

```yaml
theme: idyll
```

That's it. No build step, no framework dependency, no client-side router. The extra bit that lands in the theme folder is just there to help arrange the text more nicely.

## Configuration

Open `themes/idyll/_config.yml`. Every option lives there, and the comments run longer than the code — you shouldn't need much more from me.

If you want a taste of it:

```yaml
hero:
  title: "Write down what you've figured out."
  subtitle: "Code, tools, and things still unclear."

about:
  name: "your name"
  avatar: "https://example.com/avatar.png"
  bio: |
    A short bio, one paragraph per line break.
```

Everything else — just read down the file.

## What it does, and doesn't

Does:

- Gives the text room to breathe. Line height, paragraph spacing, margins — all tuned so your eyes aren't tired by the tenth paragraph.
- Dark mode. The kind you get from a desk lamp at midnight.
- Code-block copy, heading anchors, a reading progress bar — small things, on by default, one line each to switch off.
- Comments, giscus, related-post suggestions. All optional, all quiet until you turn them on.

Doesn't:

- No masonry grid, no stacked cards, no "visual impact."
- No thirty-seven social icons lined up in the header.
- No animation that exists just to show off.

If those "doesn't" are exactly what you're looking for, this probably isn't your theme. That's fine — there are plenty of others.

## Finally

I wrote this theme for myself. If you like it too, that's a nice surprise.

Got a problem? Open an [issue](https://github.com/xiincs/hexo-theme-idyll/issues). No need to be formal about it — but no need to be rude either.

[MIT](LICENSE) licensed. Use it, change it, don't ask.
