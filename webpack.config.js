const getWebpackConfig = require('antd-tools/lib/getWebpackConfig');
const pkg = require('./package.json');
const path = require('path');

const webpackConfig = getWebpackConfig(false);

webpackConfig.forEach((config, index) => {
  if (!config.externals) {
    config.externals = {};
  }
  config.externals['antd-mobile'] = 'antd-mobile-v2';
  config.output.library = 'DynamicForm';
  config.output.path = path.join(__dirname, 'umd');
  config.entry = {
    [index === 0 ? `${pkg.name}.min` : pkg.name]: './src/index.ts',
  };
});

module.exports = webpackConfig;
