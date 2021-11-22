/**
  * 判断是否是二维数组，用来兼容原先数据
  * @param v 数组值
  * @returns boolean
  */
 export const is2Dimensionals = (v: Array<any>) => {
  if (Array.isArray(v) && v.length > 0 && Array.isArray(v[0])) {
    return true;
  }
  return false;
 };
