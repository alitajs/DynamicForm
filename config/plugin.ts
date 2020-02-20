import assert from 'assert';
import { isPlainObject } from 'lodash';
import { IApi } from 'umi-types';

function docConfigPlugin() {
  return (api: IApi) => ({
    name: 'doc',
    validate(val: any) {
      assert(isPlainObject(val), `Configure item doc should be Plain Object, but got ${val}.`);
    },
    onChange() {
      api.service.restart('Configure item doc Changed.');
    },
  });
}
/**
 * 兼容插件，为了使运行 umi dev 时不报错
 * @param api
 */
export default function(api: IApi) {
  // register doc config on umi system config
  api._registerConfig(docConfigPlugin);
}
