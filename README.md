# idyll

A quiet, readable [Hexo](https://hexo.io/) theme for personal blogs. No JS framework, no build step — just semantic HTML, one stylesheet, and a handful of progressive-enhancement scripts.

## Design principles

- Warm white background instead of pure white, ink black instead of pure black — easier on the eyes over long reading sessions.
- Accent colors are tied to meaning (e.g. a specific category), never used purely for decoration.
- Hierarchy comes from weight, size, and whitespace first; shadows are a last resort, capped at two levels.

## Features

- Bento-grid about page: identity card, bio, skills, and site stats in one layout
- Reading time, word count (CJK- and Latin-aware), and a scroll progress bar
- Auto-generated table of contents and tag-based related posts
- Light / dark / system theme toggle, persisted across visits
- [giscus](https://giscus.app/) comments (GitHub Discussions-backed, free, no tracking)
- Keyboard shortcut panel (hold <kbd>Shift</kbd> for theme toggle / home / random post)
- Copy-to-clipboard code blocks, heading anchors, external-link markers
- Everything above is a config flag — turn off what you don't want

## Installation

```bash
cd your-hexo-site
git clone https://github.com/xiincs/hexo-theme-idyll.git themes/idyll
```

Set the theme in your site's `_config.yml`:

```yaml
theme: idyll
```

## Configuration

All configuration lives in `themes/idyll/_config.yml`. Highlights:

```yaml
hero:
  title: "Write down what you've figured out."
  subtitle: "Code, tools, and things still unclear."

about:
  name: "your name"
  avatar: "https://example.com/avatar.png"
  bio: |
    A short bio, one paragraph per line break.
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

See the comments in `_config.yml` for the full list of options.

## License

[MIT](LICENSE)
