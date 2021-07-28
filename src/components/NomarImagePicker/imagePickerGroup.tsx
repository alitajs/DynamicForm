import React, { FC } from 'react';
import { ImagePicker, Toast } from 'antd-mobile';
import { ImageFile, ImagePickerGroupProps } from './interface';
import { transformFile } from '../../utils';

const ImagePickerGroup: FC<ImagePickerGroupProps> = (props) => {
  const {
    onChange,
    initValue = [],
    limitSize,
    compressRatio,
    ...otherProps
  } = props;

  const checkFileLimit = (file: ImageFile) => {
    if (limitSize && file && file.size && file.size > limitSize) {
      Toast.fail('图片过大', 1);
      return false;
    }
    return true;
  };

  const imageChange = (
    files: ImageFile[] | any,
    operationType: string,
    index: number | undefined,
  ) => {
    if (files && files.length > initValue.length) {
      const lastFile = files[files.length - 1];
      const { file = {} } = lastFile;
      if (compressRatio && lastFile.url.indexOf('base64,') !== -1) {
        transformFile(lastFile.file, compressRatio).then((newFile: any) => {
          const reader = new FileReader();
          reader.readAsDataURL(newFile);
          reader.onload = function ({ target }) {
            if (!checkFileLimit(newFile)) return;
            files[files.length - 1] = {
              ...files[files.length - 1],
              file: newFile,
              url: target?.result || '',
            };
          };
        });
      } else if (!checkFileLimit(file)) return;
    }
    onChange(files, operationType, index);
  };
  return (
    <ImagePicker {...otherProps} onChange={imageChange} files={initValue} />
  );
};

export default ImagePickerGroup;
