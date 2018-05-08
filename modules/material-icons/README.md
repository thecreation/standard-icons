# @icon/material-icons

[![npm version](https://img.shields.io/npm/v/@icon/material-icons.svg)](https://www.npmjs.org/package/@icon/material-icons)

This repository is a module of the full [icon][icon] repository.

## Install

This repository is distributed with [npm]. After [installing npm][install-npm], you can install `@icon/material-icons` with this command.

```bash
npm install --save @icon/material-icons
```

## Usage

There are many ways/formats of how to use material-icons. The fastest and recommended way is via SVG directly. Or use the webfont version if you want to include all icons at once:

### SVG icons -- when you need just a few icons in your project

  1. If you want to use just a few icons. Find the icons you need in "icons" folder. Then use them as regular images:

```
  <img height="32" width="32" src="@icon/material-icons/icons/airplane.svg" />
```

  2. Icons can be served from a CDN such as [Unpkg][Unpkg]. Simply use the `@icon/material-icons` npm package in the URL like the following:

```
  <img height="32" width="32" src="https://unpkg.com/@icon/material-icons/icons/airplane.svg" />
```

### Icons font -- ideal when you want to include all icons at once

  1. Install `@icon/material-icons` with this command. In the `<head>` of your html, reference the location to your `material-icons.css`.

```
  <head>
  ...
  <link rel="stylesheet" href="@icon/material-icons/material-icons.css">
  ...
  </head>
```

  2. Use [unpkg.com][Unpkg] to load directly material-icons without installing anything:

```
  <head>
  ...
  <link rel="stylesheet" href="https://unpkg.com/@icon/material-icons/material-icons.css">
  ...
  </head>
```

> Place material-icons with `<i>` tag in your html like this. Icon class names are to be used with the `zmdi` class prefix.

```
  <i class="zmdi zmdi-airplane"></i>
```


## Bugs, Ideas, Pull Requests

If you have any ideas or found bugs, please send me Pull Requests or let me know with [GitHub Issues][github issues].

## License

Material-icons is copyright by Sergey Kupletsky, font is licensed under the [SIL OFL 1.1][SIL], code is licensed under the [MIT License][MIT].

[MIT]: https://opensource.org/licenses/MIT
[SIL]: http://scripts.sil.org/OFL
[icon]: https://github.com/thecreation/icons
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[sass]: http://sass-lang.com/
[github issues]: https://github.com/thecreation/icons/issues
[Unpkg]: https://unpkg.com