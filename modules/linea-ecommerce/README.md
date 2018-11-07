# @icon/linea-ecommerce

[![npm version](https://img.shields.io/npm/v/@icon/linea-ecommerce.svg)](https://www.npmjs.org/package/@icon/linea-ecommerce)

This repository is a module of the full [icon][icon] repository.

## Install

This repository is distributed with [npm]. After [installing npm][install-npm], you can install `@icon/linea-ecommerce` with this command.

```bash
npm install --save @icon/linea-ecommerce
```

## Usage

There are many ways/formats of how to use linea-ecommerce. The fastest and recommended way is via SVG directly. Or use the webfont version if you want to include all icons at once:

### SVG icons -- when you need just a few icons in your project

1 . If you want to use just a few icons. Find the icons you need in "icons" folder. Then use them as regular images:

```
<img height="32" width="32" src="@icon/linea-ecommerce/icons/ecommerce-bag.svg" />
```

2 . Icons can be served from a CDN such as [Unpkg][Unpkg]. Simply use the `@icon/linea-ecommerce` npm package in the URL like the following:

```
<img height="32" width="32" src="https://unpkg.com/@icon/linea-ecommerce/icons/ecommerce-bag.svg" />
```

### Icons font -- ideal when you want to include all icons at once

1 . Install `@icon/linea-ecommerce` with this command. In the `<head>` of your html, reference the location to your `linea-ecommerce.css`.

```
<head>
...
<link rel="stylesheet" href="@icon/linea-ecommerce/linea-ecommerce.css">
...
</head>
```

2 . Use [unpkg.com][Unpkg] to load directly linea-ecommerce without installing anything:

```
<head>
...
<link rel="stylesheet" href="https://unpkg.com/@icon/linea-ecommerce/linea-ecommerce.css">
...
</head>
```

> Place linea-ecommerce with `<i>` tag in your html like this. Icon class names are to be used with the `lec` class prefix.

```
<i class="lec lec-ecommerce-bag"></i>
```


## Bugs, Ideas, Pull Requests

If you have any ideas or found bugs, please send me Pull Requests or let me know with [GitHub Issues][github issues].

## License

Linea-ecommerce is copyright by Dario Ferrando, licensed under the [CC0-1.0][license].

[license]: https://github.com/thecreation/icons/blob/master/modules/linea-ecommerce/LICENSE
[icon]: https://github.com/thecreation/icons
[npm]: https://www.npmjs.com/
[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[sass]: http://sass-lang.com/
[github issues]: https://github.com/thecreation/icons/issues
[Unpkg]: https://unpkg.com