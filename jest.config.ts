/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
// alita-test is @umijs/test@4
import { createJestConfig } from 'alita-test'

const config = createJestConfig({
  collectCoverageFrom(memo = []) {
    return memo.concat(['src/**','!src/.umi/**','!**/assets/*', '!**/demo/*', '!**/tests/demos/*'])
  },
}, { useEsbuild: false });
// useEsbuild: true 会快3倍左右，但是不完全检测类型，所以在类型全部正确的情况下，可默认开启
// console.log(config)
export default config;