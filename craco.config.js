const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: require.resolve("babel-plugin-import"),
      options: {
        "libraryName": "antd",
        "style": true
      }
    }
  ],
};