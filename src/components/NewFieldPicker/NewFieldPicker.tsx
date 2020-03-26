import React, { FC, useState } from 'react';
import { Button, WingBlank, WhiteSpace, Modal, List } from 'antd-mobile';
import copy from 'copy-to-clipboard';
import Form from 'rc-field-form';
import { Store, ValidateErrorEntity } from 'rc-field-form/es/interface';
import { IFormItemProps, getFormItem } from '../../DynamicForm';
import EditForm from '../EditForm/EditForm';

interface NewFieldPickerProps {
  onChange?: (t: any) => void;
  value?: IFormItemProps[];
}

const radioList = [
  {
    label: '是',
    value: 'yes',
  },
  {
    label: '否',
    value: 'no',
  },
];

const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ],
];
const seasonsUti = [
  [
    {
      label: '元',
      value: '元',
    },
    {
      label: '亿元',
      value: '亿元',
    },
  ],
];

const InitFormData = [
  {
    type: 'input',
    fieldProps: 'username',
    required: true,
    placeholder: '请输入',
    title: '用户名',
    inputType: 'text',
    positionType: 'horizontal',
  },
  {
    type: 'select',
    fieldProps: 'userdata',
    required: true,
    placeholder: '请选择',
    title: '用户数据',
    data: seasons,
    positionType: 'horizontal',
  },
  {
    type: 'area',
    fieldProps: 'usertextarea',
    required: true,
    positionType: 'horizontal',
    placeholder: '多行输入',
    title: '多行输入',
  },
  {
    type: 'date',
    fieldProps: 'userDataPicker',
    required: true,
    placeholder: '请选择',
    title: '用户时间选择',
    modeType: 'datetime',
    positionType: 'horizontal',
  },
  {
    type: 'switch',
    fieldProps: 'userswitch1',
    required: true,
    placeholder: '请选择',
    title: '用户选择',
    positionType: 'horizontal',
  },
  {
    type: 'date',
    fieldProps: 'userDataPicker2',
    required: true,
    placeholder: '请选择',
    title: '用户时间选择',
    modeType: 'datetime',
    positionType: 'horizontal',
  },
  {
    type: 'radio',
    fieldProps: 'userRadio1',
    required: true,
    placeholder: '请选择',
    title: '用户选择1',
    data: radioList,
    positionType: 'horizontal',
  },
  {
    type: 'extraInput',
    fieldProps: 'extraInput5',
    fieldProps2: 'extraInput6',
    required: true,
    placeholder: '请输入',
    placeholder2: '请选择',
    title: '单位选择',
    data: seasonsUti,
    extraType: 'select',
    positionType: 'horizontal',
  },
  {
    type: 'rangeDatePicker',
    fieldProps: 'datePicker1',
    fieldProps2: 'datePicker2',
    required: true,
    placeholder: '请输入',
    placeholder2: '请选择',
    title: '时间(datetime)',
    modeType: 'datetime',
    positionType: 'horizontal',
  },
] as IFormItemProps[];

const InitFormValue = {
  username: '张三',
};

const NewFieldPicker: FC<NewFieldPickerProps> = ({ value }) => {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [selectFieldItem, setSelectFieldItem] = useState<IFormItemProps>();
  const [alitaDformExtraField, setAlitaDformExtraField] = useState<IFormItemProps[]>(value || []);
  const onSelectFieldItem = (formItem: IFormItemProps) => {
    alitaDformExtraField.push({ ...formItem });
    setAlitaDformExtraField(alitaDformExtraField);
    // onChange && onChange(alitaDformExtraField);
    setModal2(false);
  };

  const onFinish = (values: Store) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const defaultFailed = (errorInfo: ValidateErrorEntity) => {
    if (
      !errorInfo ||
      !errorInfo.errorFields ||
      errorInfo.errorFields.length === 0 ||
      onFinishFailed
    ) {
      onFinishFailed(errorInfo);

      return;
    }
    const scrollToField = (fieldKey: any) => {
      const labelNode = document.getElementById(`aliat-dform-${fieldKey}`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    scrollToField(errorInfo.errorFields[0].name[0]);
    if (onFinishFailed) {
      onFinishFailed(errorInfo);
    }
  };

  return (
    <>
      <Form>
        <List
          renderHeader={() => (
            <div
              style={{
                textAlign: 'center',
                display: alitaDformExtraField.length > 0 ? 'block' : 'none',
              }}
            >
              以下表单为编辑生成，请手动保存到代码中
            </div>
          )}
        >
          {alitaDformExtraField.map(item => getFormItem(item, false))}
        </List>
      </Form>

      <WingBlank size="lg">
        <Button
          inline
          type="primary"
          onClick={() => setModal(true)}
          style={{
            width: '50%',
          }}
        >
          新增表单
        </Button>
        <Button
          inline
          type="primary"
          onClick={() => copy(JSON.stringify(alitaDformExtraField))}
          style={{
            width: '50%',
          }}
        >
          拷贝配置
        </Button>
      </WingBlank>
      <WhiteSpace />
      <Modal
        popup
        visible={modal}
        onClose={() => setModal(false)}
        animationType="slide-up"
        style={{
          height: '12rem',
        }}
      >
        <Form
          initialValues={InitFormValue}
          onFinish={onFinish}
          onFinishFailed={(errorInfo: ValidateErrorEntity) => defaultFailed(errorInfo)}
        >
          <List
            renderHeader={() => (
              <div
                style={{
                  textAlign: 'center',
                }}
              >
                选择表单类型
              </div>
            )}
            style={{
              textAlign: 'left',
            }}
          >
            {InitFormData.map(item => (
              <div style={{ position: 'relative' }} key={item.fieldProps}>
                {getFormItem(item, false)}
                <div
                  style={{
                    width: '100%',
                    // height: '1.32rem',
                    height: '100%',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    zIndex: 99,
                  }}
                  onClick={e => {
                    e.stopPropagation();
                    setSelectFieldItem({ ...item });
                    setModal(false);
                    setModal2(true);
                  }}
                ></div>
              </div>
            ))}
            <Button type="primary" onClick={() => setModal(false)}>
              取消
            </Button>
          </List>
        </Form>
      </Modal>
      <Modal popup visible={modal2} onClose={() => setModal2(false)} animationType="slide-up">
        <List
          renderHeader={() => (
            <div
              style={{
                textAlign: 'center',
              }}
            >
              编辑表单数据
            </div>
          )}
        >
          <EditForm data={selectFieldItem} onChange={onSelectFieldItem} />
        </List>
      </Modal>
    </>
  );
};

export default NewFieldPicker;
