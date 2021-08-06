import dayjs from 'dayjs';
import { FormInstance } from 'rc-field-form/es/interface';

export const getInitKeyValue = ({
  form,
  key,
  data,
}: {
  form: FormInstance;
  key: string | number;
  data: any[];
}) => {
  const filter = data.filter((item) => item?.initKey === key);
  const obj = {} as any;
  filter.forEach((item) => {
    obj[item.fieldProps] = form.getFieldValue(item.fieldProps);
  });
  return obj;
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

export const dateChange = (date: Date | string) => {
  const stringDate = dayjs(date).format('YYYY-MM-DD-HH-mm-ss');
  const dateList = stringDate.split('-');
  const numberDateList = dateList.map((item) => parseInt(item, 10));

  return new Date(
    numberDateList[0],
    numberDateList[1] - 1,
    numberDateList[2],
    numberDateList[3],
    numberDateList[4],
    numberDateList[5],
  );
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

export const resetLabel = (
  list: string[] = [],
  placeholderList: string[] = [],
) => {
  if (list.length === placeholderList.length) return list;
  list.push(placeholderList[list.length]);
  return list;
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

/**
 * 设置随机值
 */
export const getRandom = () => {
  const val = `${Math.random().toString(36).slice(2, 6)}`;
  return val;
};

/**
 * 压缩图片
 */
export const transformFile = (file: any, pictureQuality = 0.5) => {
  /**
   * 针对图片进行压缩,如果图片大小超过压缩阈值,则执行压缩,否则不压缩
   */
  //判断是否是图片类型
  // const pictureQuality = 0.5;
  if (typeof FileReader === 'undefined') {
    return file;
  } else {
    try {
      return new Promise((resolve) => {
        //声明FileReader文件读取对象
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          // 生成canvas画布
          const canvas = document.createElement('canvas');
          // 生成img
          const img = document.createElement('img') as any;
          img.src = reader.result;
          img.onload = () => {
            const ctx = canvas.getContext('2d') as any;
            //原始图片宽度、高度
            let originImageWidth = img.width,
              originImageHeight = img.height;
            //默认最大尺度的尺寸限制在（1920 * 1080）
            let maxWidth = 1920,
              maxHeight = 1080,
              ratio = maxWidth / maxHeight;
            //目标尺寸
            let targetWidth = originImageWidth,
              targetHeight = originImageHeight;
            //当图片的宽度或者高度大于指定的最大宽度或者最大高度时,进行缩放图片
            if (originImageWidth > maxWidth || originImageHeight > maxHeight) {
              //超过最大宽高比例
              if (originImageWidth / originImageHeight > ratio) {
                //宽度取最大宽度值maxWidth,缩放高度
                targetWidth = maxWidth;
                targetHeight = Math.round(
                  maxWidth * (originImageHeight / originImageWidth),
                );
              } else {
                //高度取最大高度值maxHeight,缩放宽度
                targetHeight = maxHeight;
                targetWidth = Math.round(
                  maxHeight * (originImageWidth / originImageHeight),
                );
              }
            }
            // canvas对图片进行缩放
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            // 清除画布
            ctx.clearRect(0, 0, targetWidth, targetHeight);
            // 绘制图片
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
            // quality值越小,图像越模糊,默认图片质量为0.92
            const imageDataURL = canvas.toDataURL(
              file.type || 'image/jpeg',
              pictureQuality,
            ) as any;
            // 去掉URL的头,并转换为byte
            const imageBytes = window.atob(imageDataURL.split(',')[1]);
            // 处理异常,将ascii码小于0的转换为大于0
            const arrayBuffer = new ArrayBuffer(imageBytes.length);
            const uint8Array = new Uint8Array(arrayBuffer);
            for (let i = 0; i < imageBytes.length; i++) {
              uint8Array[i] = imageBytes.charCodeAt(i);
            }
            let mimeType = imageDataURL.split(',')[0].match(/:(.*?);/)[1];
            let newFile = new File([uint8Array], file.name, {
              type: mimeType || 'image/jpeg',
            });
            // console.log('after compress, the file size is : ', (newFile.size / 1024 / 1024) + "M");
            resolve(newFile);
          };
        };
        reader.onerror = () => file;
      })
        .then((res) => res)
        .catch(() => file);
    } catch (e) {
      //压缩出错,直接返回原file对象
      return file;
    }
  }
};
