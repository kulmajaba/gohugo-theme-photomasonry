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

### As a Hugo Module (recommended)

> ⚠️ If you installed a [Hugo binary](https://gohugo.io/getting-started/installing/#binary-cross-platform), you may not have Go installed on your machine. To check if Go is installed:
> ```
> $ go version
> ```
>  Go modules were considered production ready in v1.14. [Download Go](https://golang.org/dl/).

1. From your project's root directory, initiate the hugo module system if you haven't already:

   ```
   $ hugo mod init github.com/<your_user>/<your_project>
   ```

2. Add the theme's repo to your `config.toml`:

   ```toml
   theme = 'github.com/kulmajaba/gohugo-theme-photomasonry'
   ```

### As Git Submodule

Inside the folder of your Hugo site run:

```
$ git submodule add https://github.com/kulmajaba/gohugo-theme-photomasonry.git themes/photomasonry
```
For more information read the official [setup guide](//gohugo.io/getting-started/quick-start/) of Hugo.

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

### Favicon

Add your favicon assets to `my-website/static/` and add a `my-website/layouts/partials/head-custom.html` file where you can paste your favicon code.

Files:
```
my-website/
├── layouts/
|   └── partials/
|       └── head-custom.html
└── static/
    ├── favicon-192.png
    ├── favicon-512.png
    ├── apple-touch-icon.png
    ├── favicon.ico
    ├── favicon.svg
    └── manifest.webmanifest
```

`my-website/static/manifest.webmanifest`:
```json
{
  "icons": [
    { "src": "/favicon_192.png", "type": "image/png", "sizes": "192x192" },
    { "src": "/favicon_512.png", "type": "image/png", "sizes": "512x512" }
  ]
}
```

`my-website/layouts/partials/head-custom.html`:
```html
<link rel="icon" href="/favicon.ico" sizes="64x64">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/favicon_apple.png"> <!-- 180x180 -->
<link rel="manifest" href="/manifest.webmanifest">
```

## Usage

### Photos

#### Gallery structure

The theme is set up with the assumption that `content/photos` will be your photo gallery folder.
You can nest more sections inside it which will become their own sub-galleries.

```
my-website/
└── content/
    ├── photos/
    │   ├── _index.md
    │   ├── photo-1.jpg
    │   ├── photo-1.md
    |   ├── photo-2.jpg
    │   ├── photo-2.md
    │   └── sub-gallery/
    |       ├── _index.jpg
    │       ├── photo-3.jpg
    │       └── photo-3.md
    └── posts/
        └── hello-world.md
```

The gallery consists of the `_index.md` file that defines it as a section for Hugo, and pairs of an image file and a markdown file with the same filename:

```
photos/
  ├── _index.md
  ├── photo-1.jpg
  └── photo-1.md
```

#### Cover images

By default, the cover image of a gallery will be the first image by date (defined in the front matter of the related page or section).
You can set a cover image from any images inside the gallery or its sub-galleries in the front matter:

`content/photos/sub-gallery/_index.md`:
```yaml
---
title: "My gallery"
params:
  cover: "photo-1.jpg"
---
```

#### Image processing

For pages in `content/photos` the images are automatically resized to max. 3840x2160 and watermarked if you have set a watermark.

To save space in your builds you should disable publishing the original image files for every section in `content/photos`.
This is done by setting `publishResources: false` in all of your `_index.md` file front matters inside the photos folder:

`content/photos/_index.md`:
```yaml
---
title: "Photos"
build:
  publishResources: false
---
```

### Posts

#### Pinned posts

You can pin posts to the home page carousel by setting `pinned: true` in the front matter of a post:

```yaml
---
title: "Post title"
date: 2024-08-18
summary: "Short summary."
params:
  pinned: true
---
```

You can optionally set `pinnedUntil` to a date. The post will be pinned in Hugo builds until that date, but not after. If you set `pinnedUntil` as date without hours and minutes, the post will be unpinned starting from that date.

```yaml
params:
  pinned: true
  pinnedUntil: 2024-09-18
```

#### Photos

You can embed images to normal pages either with the markdown syntax or a more flexible shortcode:

##### 1. Markdown syntax

```md
![Alt text](screenshot-1.png "A title")
```

If the title exists, the image will be rendered inside a `<figure>` element and the title will be turned into a caption.

##### 2. Shortcode

```md
{{< image src="profile.jpg" alt="Picture of the author" title="Credit: John Doe" figure=true maxWidth="50%" />}}
```

Note the closing `/` at the end.

The logic is more flexible:
- If `figure=true` is present, the image will be rendered inside a `<figure>` element and the title will be turned into a caption.
- If `maxWidth` is set, the image width will be constrained. CSS length units work.

You can also create a block with text content and an image side by side (on large screens) by inserting the content between the shortcode tags:

```md
{{< image src="profile.jpg" alt="Picture of the author" title="Credit: John Doe" figure=true alignEnd=true />}}
## Heading

This content will appear next to the image.
{{< /image >}}
```

- The image will be rendered at the start of the block (left for ltr direction) by default, setting `alignEnd=true` will switch the order
- On small screens the block will flow vertically with the image always at the start.
- Setting `maxWidth` in this situation will lead to unexpected results.