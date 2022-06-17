export default {
  esm: 'babel',
  cjs: 'babel',
  umd: {
    name: 'DynamicForm',
    globals: {
      react: 'React',
    },
  },
  disableTypeCheck: true,
  cssModules: false,
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
};
