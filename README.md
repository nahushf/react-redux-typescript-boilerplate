# React-Redux-Typescript Boilerplate
A simple Boilerplate to get started with building a react-redux-typescript project.

## Important files
  - _tsconfig.json_
  Typescript configuration. The Root directory is set to `src` while the output directory is `public`. 
  - _webpack.config.js_
  Webpack configuration. Source Maps have been enabled. The `html-webpack-plugin` is configured to accept the `index.ejs` template and generate the `index.html` with `bundle.js` in the output folder i.e. `dist` folder.
  The loaders that have been configured include
     * `tslint-loader` for linting.
     * `react-hot-loader/webpack` and `ts-loader` for `.tsx` files.
     * `style-loader`and `css-loader` for `.css` files.
     * `url-loader` for font and image files.
     * `json-loader` for json files.
  The configuration also includes the configuration for the `webpack-dev-server`.
  - _package.json_
  Contains a `start` script which runs the dev server.

## How to run
 - Clone the repository. 
 - Inside the repository run `npm install` and `typings install`.
 - Run `npm start`.