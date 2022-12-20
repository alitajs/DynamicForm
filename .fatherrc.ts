import { defineConfig } from 'father';

export default defineConfig({
  esm: {
    output: 'es',
  },
  cjs: {
    output: 'lib',
    platform: 'browser',
  },
  umd: {
    name: 'DynamicForm',
    output: 'dist',
  },
  // extraBabelPlugins: [
  //   [
  //     'babel-plugin-import',
  //     {
  //       libraryName: 'antd-mobile-v2',
  //       libraryDirectory: 'es',
  //       style: true,
  //     },
  //   ],
  // ],
});
