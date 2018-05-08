# @icon/stroke-7

[![npm version](https://img.shields.io/npm/v/@icon/stroke-7.svg)](https://www.npmjs.org/package/@icon/stroke-7)

This repository is a module of the full [icon][icon] repository.

## Install

This repository is distributed with [npm]. After [installing npm][install-npm], you can install `@icon/stroke-7` with this command.

```bash
npm install --save @icon/stroke-7
```

## Usage

There are many ways/formats of how to use stroke-7. The fastest and recommended way is via SVG directly. Or use the webfont version if you want to include all icons at once:

### SVG icons -- when you need just a few icons in your project

  1. If you want to use just a few icons. Find the icons you need in "icons" folder. Then use them as regular images:

```
  <img height="32" width="32" src="@icon/stroke-7/icons/album.svg" />
```

  2. Icons can be served from a CDN such as [Unpkg][Unpkg]. Simply use the `@icon/stroke-7` npm package in the URL like the following:

```
  <img height="32" width="32" src="https://unpkg.com/@icon/stroke-7/icons/album.svg" />
```

### Icons font -- ideal when you want to include all icons at once

  1. Install `@icon/stroke-7` with this command. In the `<head>` of your html, reference the location to your `stroke-7.css`.

```
  <head>
  ...
  <link rel="stylesheet" href="@icon/stroke-7/stroke-7.css">
  ...
  </head>
```

  2. Use [unpkg.com][Unpkg] to load directly stroke-7 without installing anything:

```
  <head>
  ...
  <link rel="stylesheet" href="https://unpkg.com/@icon/stroke-7/stroke-7.css">
  ...
  </head>
```

> Place stroke-7 with `<i>` tag in your html like this. Icon class names are to be used with the `s7` class prefix.

```
  <i class="s7 s7-album"></i>
```


## Bugs, Ideas, Pull Requests

If you have any ideas or found bugs, please send me Pull Requests or let me know with [GitHub Issues][github issues].

## License

Stroke-7 is copyright by The Pixeden Team, licensed under the [PIXEDEN license][license].

[license]: https://github.com/thecreation/icons/blob/master/modules/stroke-7/LICENSE
[icon]: https://github.com/thecreation/icons
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[sass]: http://sass-lang.com/
[github issues]: https://github.com/thecreation/icons/issues
[Unpkg]: https://unpkg.com