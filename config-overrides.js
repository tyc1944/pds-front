const {
  override,
  fixBabelImports,
  addLessLoader,
  addBabelPresets,
  addBabelPlugins
} = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#104EC1' },
  }),
  addBabelPresets(
    "mobx",
    "@babel/preset-env",
    "@babel/preset-react"
  ),
  addBabelPlugins(["@babel/plugin-proposal-function-bind"],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }])
);
