# Photomasonry

A photos-first Hugo website theme with blog features

## Features

- Home page photo stream that pulls content from all galleries
- Masonry-style photo gallery and full screen photo pages
- Responsive
- Dark and light theme support (based on the device preference)
- Accessible
- 95% pure HTML/CSS, no unnecessary JS tricks
- Automatic image processing for galleries with resizing and watermarking

## Installation



## Configuration

- Set your logo and watermark with `params` (optional)
- The post page is set up so that the `lastmod` date is shown if it exists but Hugo by default will return almost any date in the `lastmod` field. You should narrow the definition down.
- The theme is setup for code syntax highlighting with `base16-snazzy` style but if you plan on using it, you'll need to add it to your configuration.

Example of theme configuration in your `hugo.toml`

```toml
...
theme = 'kulmajaba'

[params]
  logo = 'Logo.svg'
  watermark = 'watermark.png'

[frontmatter]
  lastmod = [':git', 'lastmod', 'modified']

[markup]
  [markup.highlight]
    codeFences = true
    lineNoStart = 1
    lineNos = true
    lineNumbersInTable = true
    noClasses = false
    style = 'base16-snazzy'
    tabWidth = 2
```

## Usage

The theme is set up with the assumption that `content/photos` will be your photo gallery folder. You can nest more sections inside it which will become their own galleries.

```
my-website/
└── content/
    ├── photos/
    │   ├── _index.md
    │   ├── photo-1.jpg
    │   ├── photo-1.md
    │   └── sub-gallery/
    │       ├── photo-2.jpg
    │       └── photo-2.md
    └── posts/
        └── hello-world.md
```

The gallery is dependent on file pairs of an image file and a markdown file with the same filename:

```
photos/
  ├── _index.md
  ├── photo-1.jpg
  └── photo-1.md
```

For pages in `content/photos` the images are automatically resized to max. 3840x2160 and watermarked if you have set a watermark. To save space in your builds you should disable publishing the original image files for every section in `content/photos`:

`content/photos/_index.md`:
```yaml
---
title: "Photos"
build:
  publishResources: false
---
```