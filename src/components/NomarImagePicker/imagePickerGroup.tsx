import React, { FC, useState, useEffect, Children } from 'react';
import { Toast } from 'antd-mobile-v2';
import { ImageViewer } from 'antd-mobile/2x';
import { Upload } from 'antd';
import { AddOutline, CloseOutline } from 'antd-mobile-icons';
import { DformContext } from '../../baseComponents/DynamicForm';
import PcLayout from '../../baseComponents/PcLayout';
import { Image, Grid } from '../../baseComponents';
import { allPrefixCls, allPcPrefixCls } from '../../const';
import { ImageFile, ImagePickerGroupProps } from './interface';
import { transformFile, getRandom } from '../../utils';

const { Item } = Grid;

const prefixCls = `${allPrefixCls}-image`;

const ImagePickerGroup: FC<ImagePickerGroupProps> = (props) => {
  const {
    onChange,
    limitSize,
    compressRatio,
    value = [],
    maxLength,
    multiple = false,
    accept = 'image/*',
    capture = false,
    deletable = true,
    selectable,
    onImageClick,
    showView = true,
    positionType = 'vertical',
    children,
  } = props;

  const isVertical = positionType === 'vertical';

  const [height, setHeight] = useState<number>(0);
  const [addable, setAddable] = useState<boolean>(true);
  const [imgViewList, setImgViewList] = useState<string[]>([]);

  useEffect(() => {
    // 将图片渲染到图片加载器上
    if (value && Array.isArray(value)) {
      const list = value.map((item) => {
        return item?.url;
      });
      setImgViewList(list);
    }

    if (selectable !== undefined) {
      setAddable(selectable);
      return;
    }
    if (maxLength && value && value.length && value.length >= maxLength) {
      setAddable(false);
    } else {
      setAddable(true);
    }
  }, [JSON.stringify(value || [])]);

  useEffect(() => {
    if (addable) {
      const width =
        document.getElementById(`${prefixCls}-upload`)?.clientWidth || 0;
      setHeight(width);
    }
  }, [addable]);

  const checkFileLimit = (file: ImageFile) => {
    if (limitSize && file && file.size && file.size > limitSize) {
      Toast.fail('图片过大', 1);
      return false;
    }
    return true;
  };

  const addImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e, e?.target?.files);
    if (e?.target?.files && !!e?.target?.files.length) {
      const file = e?.target?.files[0];
      transformFile(file, compressRatio).then((newFile: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(newFile);
        reader.onload = function ({ target }) {
          if (!checkFileLimit(newFile)) return;
          const newValue = [...value];
          newValue.push({
            file,
            url: target?.result || '',
            id: getRandom(),
          });
          onChange(newValue, 'add', undefined);
        };
      });
    }
  };

  const onDelete = (item: any, index: number) => {
    const newFiles = [...value];
    newFiles.splice(index, 1);
    onChange(newFiles, 'delete', index);
  };

  const imageClick = (item: any, index: number) => {
    if (showView)
      ImageViewer.Multi.show({ images: imgViewList, defaultIndex: index });
    if (onImageClick) onImageClick(index, item);
  };

  const uploadAction = (file: any) => {
    console.log(file);
  };
  return (
    <DformContext.Consumer>
      {({ isPc }: any) => {
        if (!isPc) {
          return (
            <Grid columns={4} gap={`0.22rem`}>
              {value.map((item, index: number) => {
                const { url, id } = item;
                return (
                  <Item key={id}>
                    <div className={`${prefixCls}-content`}>
                      <Image
                        id={id}
                        src={url}
                        onClick={() => imageClick(item, index)}
                      />
                      {deletable && (
                        <span
                          className={`${prefixCls}-cell-delete`}
                          onClick={() => onDelete(item, index)}
                        >
                          <CloseOutline
                            className={`${prefixCls}-cell-delete-icon`}
                          />
                        </span>
                      )}
                    </div>
                  </Item>
                );
              })}
              {addable && (
                <Item>
                  <div
                    className={`${prefixCls}-upload`}
                    id={`${prefixCls}-upload`}
                    style={{ height }}
                  >
                    <span className={`${prefixCls}-upload-button-icon`}>
                      <AddOutline />
                    </span>
                    <input
                      capture={capture}
                      accept={accept}
                      multiple={multiple}
                      type="file"
                      className={`${prefixCls}-upload-input`}
                      onChange={addImageChange}
                    />
                  </div>
                </Item>
              )}
            </Grid>
          );
        } else {
          return (
            <PcLayout
              isVertical={isVertical}
              left={children}
              className={`${allPcPrefixCls}-image`}
              right={
                <Upload
                  action={addImageChange}
                  listType="picture-card"
                  fileList={value}
                  multiple={multiple}
                  // onPreview={this.handlePreview}
                  onChange={addImageChange}
                >
                  {addable ? <AddOutline /> : null}
                </Upload>
              }
            />
          );
        }
      }}
    </DformContext.Consumer>
  );
};

export default ImagePickerGroup;
