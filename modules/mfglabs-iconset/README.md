# @icon/mfglabs-iconset

[![npm version](https://img.shields.io/npm/v/@icon/mfglabs-iconset.svg)](https://www.npmjs.org/package/@icon/mfglabs-iconset)
[![Build Status](https://travis-ci.org/icon/icon.svg?branch=master)](https://travis-ci.org/icon/icon)

This repository is a module of the full [icon][icon] repository.

## Install

This repository is distributed with [npm]. After [installing npm][install-npm], you can install `@icon/mfglabs-iconset` with this command.

```bash
npm install --save @icon/mfglabs-iconset
```

## Usage

There are many ways/formats of how to use mfglabs-iconset. The fastest and recommended way is via SVG directly. Or use the webfont version if you want to include all icons at once:

### SVG icons – when you need just a few icons in your project

  1. If you want to use just a few icons. Find the icons you need in "icons" folder. Then use them as regular images:

```
  <img height="32" width="32" src="@icon/mfglabs-iconset/icons/cloud.svg" />
```

  2. Icons can be served from a CDN such as [Unpkg][Unpkg]. Simply use the `@icon/mfglabs-iconset` npm package in the URL like the following:

```
  <img height="32" width="32" src="https://unpkg.com/@icon/mfglabs-iconset/icons/cloud.svg" />
```

### Icons font – ideal when you want to include all icons at once

  1. Install `@icon/mfglabs-iconset` with this command. In the `<head>` of your html, reference the location to your `mfglabs-iconset.css`.

```
  <head>
  ...
  <link rel="stylesheet" href="@icon/mfglabs-iconset/mfglabs-iconset.css">
  ...
  </head>
```

  2. Use [unpkg.com][Unpkg] to load directly mfglabs-iconset without installing anything:

```
  <head>
  ...
  <link rel="stylesheet" href="https://unpkg.com/@icon/mfglabs-iconset/mfglabs-iconset.css">
  ...
  </head>
```

> Place mfglabs-iconset with `<i>` tag in your html like this. Icon class names are to be used with the `mli` class prefix.

```
  <i class="mli mli-cloud"></i>
```


## Bugs, Ideas, Pull Requests

If you have any ideas or found bugs, please send me Pull Requests or let me know with [GitHub Issues][github issues].

## License

Mfglabs-iconset is copyright by MfgLabs.

[MIT](./LICENSE) &copy; [Creation Studio Limited](https://creationstudio.com/)

[icon]: https://github.com/icon/icon
[docs]: http://icon.github.io/
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[sass]: http://sass-lang.com/
[github issues]: https://github.com/thecreation/icons/issues
[Unpkg]: https://unpkg.com