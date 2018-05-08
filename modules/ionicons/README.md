# @icon/ionicons

[![npm version](https://img.shields.io/npm/v/@icon/ionicons.svg)](https://www.npmjs.org/package/@icon/ionicons)

This repository is a module of the full [icon][icon] repository.

## Install

This repository is distributed with [npm]. After [installing npm][install-npm], you can install `@icon/ionicons` with this command.

```bash
npm install --save @icon/ionicons
```

## Usage

There are many ways/formats of how to use ionicons. The fastest and recommended way is via SVG directly. Or use the webfont version if you want to include all icons at once:

### SVG icons -- when you need just a few icons in your project

  1. If you want to use just a few icons. Find the icons you need in "icons" folder. Then use them as regular images:

```
  <img height="32" width="32" src="@icon/ionicons/icons/ios-add.svg" />
```

  2. Icons can be served from a CDN such as [Unpkg][Unpkg]. Simply use the `@icon/ionicons` npm package in the URL like the following:

```
  <img height="32" width="32" src="https://unpkg.com/@icon/ionicons/icons/ios-add.svg" />
```

### Icons font -- ideal when you want to include all icons at once

  1. Install `@icon/ionicons` with this command. In the `<head>` of your html, reference the location to your `ionicons.css`.

```
  <head>
  ...
  <link rel="stylesheet" href="@icon/ionicons/ionicons.css">
  ...
  </head>
```

  2. Use [unpkg.com][Unpkg] to load directly ionicons without installing anything:

```
  <head>
  ...
  <link rel="stylesheet" href="https://unpkg.com/@icon/ionicons/ionicons.css">
  ...
  </head>
```

> Place ionicons with `<i>` tag in your html like this. Icon class names are to be used with the `ion` class prefix.

```
  <i class="ion ion-ios-add"></i>
```


## Bugs, Ideas, Pull Requests

If you have any ideas or found bugs, please send me Pull Requests or let me know with [GitHub Issues][github issues].

## License

Ionicons is copyright by Ben Sperry, licensed under the [MIT][license].

[license]: https://opensource.org/licenses/MIT
[icon]: https://github.com/thecreation/icons
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[sass]: http://sass-lang.com/
[github issues]: https://github.com/thecreation/icons/issues
[Unpkg]: https://unpkg.com