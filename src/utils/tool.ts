import { ValidateErrorEntity } from 'rc-field-form/es/interface';
import { ErrorValueProps, IFormItemProps } from '../PropsType';

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

export const getByteLen = (val: string) => {
  let len = 0;
  `${val}`.split('').forEach((item) => {
    // eslint-disable-next-line no-control-regex
    if (item.match(/[^\x00-\xff]/gi) != null) {
      len += 2;
    } else {
      len += 1;
    }
  });
  return len;
};

export const changeData = (oldData: IFormItemProps[], autoLineFeed: boolean) =>
  oldData.map((item) => {
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
  });
