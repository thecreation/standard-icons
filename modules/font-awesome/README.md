# @icon/font-awesome

[![npm version](https://img.shields.io/npm/v/@icon/font-awesome.svg)](https://www.npmjs.org/package/@icon/font-awesome)
[![Build Status](https://travis-ci.org/icon/icon.svg?branch=master)](https://travis-ci.org/icon/icon)

> TODO: fill in this description later

This repository is a module of the full [icon][icon] repository.

## Install

This repository is distributed with [npm]. After [installing npm][install-npm], you can install `@icon/font-awesome` with this command.

```bash
npm install --save @icon/font-awesome
```

## Usage

There are many ways/formats of how to use font-awesome. The fastest and recommended way is via SVG directly. Or use the webfont version if you want to include all icons at once:

### SVG icons – when you need just a few icons in your project

  1. If you want to use just a few icons. Find the icons you need in "icons" folder. Then use them as regular images:

```
  <img height="32" width="32" src="@icon/font-awesome/icons/address-book.svg" />
```

  2. Icons can be served from a CDN such as [Unpkg][Unpkg]. Simply use the `@icon/font-awesome` npm package in the URL like the following:

```
  <img height="32" width="32" src="https://unpkg.com/@icon/font-awesome/icons/address-book.svg" />
```

### Icons font – ideal when you want to include all icons at once

  1. Install `@icon/font-awesome` with this command. In the `<head>` of your html, reference the location to your `font-awesome.css`.

```
  <head>
  ...
  <link rel="stylesheet" href="@icon/font-awesome/font-awesome.css">
  ...
  </head>
```

  2. Use [unpkg.com][Unpkg] to load directly font-awesome without installing anything:

```
  <head>
  ...
  <link rel="stylesheet" href="https://unpkg.com/@icon/font-awesome/font-awesome.css">
  ...
  </head>
```

> Place font-awesome with `<i>` tag in your html like this. Icon class names are to be used with the `fa` class prefix.

```
  <i class="fa fa-address-book"></i>
```


## Bugs, Ideas, Pull Requests

If you have any ideas or found bugs, please send me Pull Requests or let me know with [GitHub Issues][github issues].

## License

Font-awesome is copyright by Dave Gandy.

[MIT](./LICENSE) &copy; [Creation Studio Limited](https://creationstudio.com/)

[icon]: https://github.com/icon/icon
[docs]: http://icon.github.io/
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[sass]: http://sass-lang.com/
[github issues]: https://github.com/thecreation/icons/issues
[Unpkg]: https://unpkg.com