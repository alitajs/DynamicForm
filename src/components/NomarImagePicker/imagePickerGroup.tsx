import React, { FC, useState, useEffect } from 'react';
import { ImageViewer, Toast } from 'antd-mobile/2x';
import { Upload, Modal } from 'antd';
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
    disabled = false,
    children,
  } = props;

  const isVertical = positionType === 'vertical';

  const [height, setHeight] = useState<number>(0);
  const [addable, setAddable] = useState<boolean>(true);
  const [imgViewList, setImgViewList] = useState<string[]>([]);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewTitle, setPreviewTitle] = useState<string>('');

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
    if (
      (maxLength && value && value.length && value.length >= maxLength) ||
      disabled
    ) {
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
      Toast.show({
        icon: 'fail',
        content: '图片过大',
        maskClickable: false,
      });
      return false;
    }
    return true;
  };

  const addImageChange = (file: any) => {
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

  const handlePreview = (file: any) => {
    setPreviewVisible(true);
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    );
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
                      {deletable && !disabled && (
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e?.target?.files && !!e?.target?.files.length) {
                          addImageChange(e?.target?.files[0]);
                        }
                      }}
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
                <>
                  <Upload
                    action={addImageChange}
                    listType="picture-card"
                    fileList={value}
                    multiple={multiple}
                    onPreview={handlePreview}
                    disabled={disabled}
                    onChange={({ file }: any) => {
                      if (!!file?.id) {
                        const ind = value.findIndex(
                          (it) => it?.id === file?.id,
                        );
                        onDelete(file, ind);
                      }
                    }}
                  >
                    {addable ? <AddOutline /> : null}
                  </Upload>
                  <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={() => {
                      setPreviewVisible(false);
                    }}
                    style={{
                      width: '80%',
                    }}
                  >
                    <img
                      alt="example"
                      style={{
                        width: '100%',
                      }}
                      src={previewImage}
                    />
                  </Modal>
                </>
              }
            />
          );
        }
      }}
    </DformContext.Consumer>
  );
};

export default ImagePickerGroup;
