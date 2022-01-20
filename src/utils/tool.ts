import dayjs from 'dayjs';
import { ValidateErrorEntity } from 'rc-field-form/es/interface';
import { ErrorValueProps, IFormItemProps } from '../PropsType';
import { getByteLen } from '.';

/**
 * 重置错误信息提示
 */
export const resetErrorField = (
  errorValue: ErrorValueProps,
  values: { [key: string]: any },
) => {
  const errorObj = { ...errorValue };
  const key = Object.keys(values)[0];
  if (errorObj[key]) {
    errorObj[key] = undefined;
    return { success: true, errorObj };
  } else {
    return { success: false };
  }
};

/**
 * 通过 onFinishFailed 的方法
 */
export const getAllError = (errorInfo: ValidateErrorEntity) => {
  const { errorFields = [] } = errorInfo;
  const errorObj = {} as any;
  errorFields.forEach((item: any) => {
    errorObj[item[`name`][0]] = item[`errors`][0];
  });
  return errorObj;
};

/**
 * 滚动到错误的位置
 * @param errorInfo
 * @param onFinishFailed
 * @param failScroll
 * @returns
 */
export const defaultFailed = (
  errorInfo: ValidateErrorEntity,
  onFinishFailed?: (errorInfo: ValidateErrorEntity) => void,
  failScroll?: boolean,
) => {
  if (
    !errorInfo ||
    !errorInfo.errorFields ||
    errorInfo.errorFields.length === 0
  ) {
    if (onFinishFailed) onFinishFailed(errorInfo);
    return;
  }
  const scrollToField = (fieldKey: any) => {
    const labelNode = document.getElementById(`alita-dform-${fieldKey}`);
    if (labelNode && labelNode.scrollIntoView) {
      labelNode.scrollIntoView?.({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  };
  if (failScroll) scrollToField(errorInfo.errorFields[0].name[0]);
  if (onFinishFailed) onFinishFailed(errorInfo);
};

export const changeData = (item: IFormItemProps, autoLineFeed: boolean) => {
  if (item?.hidden) {
    item.required = false;
  }
  if (item.positionType === 'vertical' || !autoLineFeed) return item;
  if (item.title) {
    const titleSize = getByteLen(item.title);
    if (titleSize >= 16) {
      item.positionType = 'vertical';
    } else if (item.type === 'input' || item.type === 'extraInput') {
      if (titleSize > 8) {
        item.labelNumber = titleSize / 2 + 1;
      } else {
        item.labelNumber = 5;
      }
    }
  }
  return item;
};

export const filterObjList = (
  label: string = '',
  data: any = [],
  value: string | number = '',
) => {
  if (data && data.length) {
    let filList = [];
    filList = data.filter((it: { [x: string]: string | number }) => {
      return it[label] === value;
    });
    return filList;
  }
  return [];
};

export const resetLabel = (
  list: string[] = [],
  placeholderList: string[] = [],
) => {
  if (list.length === placeholderList.length) return list;
  list.push(placeholderList[list.length]);
  return list;
};

/**
 * 时间展示类型改变事件
 * @param val
 */
export const changeDateFormat = (
  val: Date,
  modeType: string,
  format?: string | undefined | ((value: Date) => string),
) => {
  let dateFormat = '';
  switch (modeType) {
    case 'datetime':
      dateFormat = dayjs(val).format('YYYY-MM-DD HH:mm');
      break;
    case 'month':
      dateFormat = dayjs(val).format('YYYY-MM');
      break;
    case 'time':
      dateFormat = dayjs(val).format('HH:mm');
      break;
    case 'year':
      dateFormat = dayjs(val).format('YYYY');
      break;
    default:
      dateFormat = dayjs(val).format('YYYY-MM-DD');
      break;
  }
  if (format && typeof format === 'string') {
    dateFormat = dayjs(val).format(format);
  }
  if (format && typeof format === 'function') {
    dateFormat = format(val);
  }
  return dateFormat;
};

export const toCSSLength = (val: number | string) => {
  return typeof val === 'number' ? `${val}` : val;
};

export function attachPropertiesToComponent<C, P extends Record<string, any>>(
  component: C,
  properties: P,
): C & P {
  const ret = component as any;
  for (const key in properties) {
    if (properties.hasOwnProperty(key)) {
      ret[key] = properties[key];
    }
  }
  return ret;
}
