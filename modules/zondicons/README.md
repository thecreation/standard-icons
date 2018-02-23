# @icon/zondicons

[![npm version](https://img.shields.io/npm/v/@icon/zondicons.svg)](https://www.npmjs.org/package/@icon/zondicons)
[![Build Status](https://travis-ci.org/icon/icon.svg?branch=master)](https://travis-ci.org/icon/icon)

This repository is a module of the full [icon][icon] repository.

## Install

This repository is distributed with [npm]. After [installing npm][install-npm], you can install `@icon/zondicons` with this command.

```bash
npm install --save @icon/zondicons
```

## Usage

There are many ways/formats of how to use zondicons. The fastest and recommended way is via SVG directly. Or use the webfont version if you want to include all icons at once:

### SVG icons – when you need just a few icons in your project

  1. If you want to use just a few icons. Find the icons you need in "icons" folder. Then use them as regular images:

```
  <img height="32" width="32" src="@icon/zondicons/icons/adjust.svg" />
```

  2. Icons can be served from a CDN such as [Unpkg][Unpkg]. Simply use the `@icon/zondicons` npm package in the URL like the following:

```
  <img height="32" width="32" src="https://unpkg.com/@icon/zondicons/icons/adjust.svg" />
```

### Icons font – ideal when you want to include all icons at once

  1. Install `@icon/zondicons` with this command. In the `<head>` of your html, reference the location to your `zondicons.css`.

```
  <head>
  ...
  <link rel="stylesheet" href="@icon/zondicons/zondicons.css">
  ...
  </head>
```

  2. Use [unpkg.com][Unpkg] to load directly zondicons without installing anything:

```
  <head>
  ...
  <link rel="stylesheet" href="https://unpkg.com/@icon/zondicons/zondicons.css">
  ...
  </head>
```

> Place zondicons with `<i>` tag in your html like this. Icon class names are to be used with the `zondicons` class prefix.

```
  <i class="zondicons zondicons-adjust"></i>
```


## Bugs, Ideas, Pull Requests

If you have any ideas or found bugs, please send me Pull Requests or let me know with [GitHub Issues][github issues].

## License

Zondicons is copyright by Steve Schoger.

[MIT](./LICENSE) &copy; [Creation Studio Limited](https://creationstudio.com/)

[icon]: https://github.com/icon/icon
[docs]: http://icon.github.io/
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[sass]: http://sass-lang.com/
[github issues]: https://github.com/thecreation/icons/issues
[Unpkg]: https://unpkg.com