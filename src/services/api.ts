import { request } from 'alita';

export async function queryList(params: any): Promise<any> {
  return request('/api/list', { params });
}
