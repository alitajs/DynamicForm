import * as React from 'react';
import { render, testA11y, sleep } from '@alita/test';
import Form from 'rc-field-form';
import NomarCustom from '../index';

interface IDemoPage {
  name: string;
  age: number;
  onChange?: (currentActiveLink: string) => void;
  value?: string;
}

const demoPage: React.FC<IDemoPage> = (props) => {
  const { name, onChange, value } = props;
  return (
    <div style={{ textAlign: 'left' }}>
      <p>name: {name}</p>
      <p>
        age:
        <input
          aria-label="input"
          value={value}
          type="text"
          onChange={(e) => {
            if (onChange) onChange(e.target.value);
          }}
        />
      </p>
    </div>
  );
};
const myProps = {
  title: '自定义组件(受控)',
  required: true,
  fieldProps: 'age',
  CustomDom: demoPage,
  customDomProps: {
    name: 'owen',
  },
  defaultValue: "17",
};

it('passes picker a11y test', async () => {
  const { container, getByLabelText } = render(
    <div>
      <Form>
        <NomarCustom {...myProps} />
      </Form>
    </div>,
  );
  await sleep(500)
  expect(getByLabelText('input')).toBeDefined()
  await testA11y(container);
});