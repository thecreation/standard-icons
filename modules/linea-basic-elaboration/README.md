# @icon/linea-basic-elaboration

[![npm version](https://img.shields.io/npm/v/@icon/linea-basic-elaboration.svg)](https://www.npmjs.org/package/@icon/linea-basic-elaboration)

This repository is a module of the full [standard-icons][standard-icons] repository.

## Install

This repository is distributed with [npm]. After [installing npm][install-npm], you can install `@icon/linea-basic-elaboration` with this command.

```bash
npm install --save @icon/linea-basic-elaboration
```

## Usage

There are many ways/formats of how to use linea-basic-elaboration. The fastest and recommended way is via SVG directly. Or use the webfont version if you want to include all icons at once:

### SVG icons -- when you need just a few icons in your project

1 . If you want to use just a few icons. Find the icons you need in "icons" folder. Then use them as regular images:

```
<img height="32" width="32" src="@icon/linea-basic-elaboration/icons/basic-elaboration-bookmark-plus.svg" />
```

2 . Icons can be served from a CDN such as [Unpkg][Unpkg]. Simply use the `@icon/linea-basic-elaboration` npm package in the URL like the following:

```
<img height="32" width="32" src="https://unpkg.com/@icon/linea-basic-elaboration/icons/basic-elaboration-bookmark-plus.svg" />
```

### Icons font -- ideal when you want to include all icons at once

1 . Install `@icon/linea-basic-elaboration` with this command. In the `<head>` of your html, reference the location to your `linea-basic-elaboration.css`.

```
<head>
...
<link rel="stylesheet" href="@icon/linea-basic-elaboration/linea-basic-elaboration.css">
...
</head>
```

2 . Use [unpkg.com][Unpkg] to load directly linea-basic-elaboration without installing anything:

```
<head>
...
<link rel="stylesheet" href="https://unpkg.com/@icon/linea-basic-elaboration/linea-basic-elaboration.css">
...
</head>
```

> Place linea-basic-elaboration with `<i>` tag in your html like this. Icon class names are to be used with the `lbae` class prefix.

```
<i class="lbae lbae-basic-elaboration-bookmark-plus"></i>
```


## Bugs, Ideas, Pull Requests

If you have any ideas or found bugs, please send me Pull Requests or let me know with [GitHub Issues][github issues].

## License

Linea-basic-elaboration is copyright by Dario Ferrando, licensed under the [CC0-1.0][license].

[license]: https://github.com/thecreation/icons/blob/master/modules/linea-basic-elaboration/LICENSE
[standard-icons]: https://github.com/thecreation/standard-icons
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[sass]: http://sass-lang.com/
[github issues]: https://github.com/thecreation/standard-icons/issues
[Unpkg]: https://unpkg.com