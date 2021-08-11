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
};
