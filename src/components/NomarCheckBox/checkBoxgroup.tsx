import React, { FC, useState, useEffect } from 'react';
import classnames from 'classnames';
import { Grid } from '../../baseComponents';
import { DformContext } from '@/baseComponents/Context';
import PcLayout from '@/baseComponents/PcLayout';

const { Item } = Grid;

export interface IDataItem {
  label: string | number;
  value: string | number;
}

interface ICheckBoxGroup {
  data: IDataItem[];
  onChange: (currentActiveLink: (string | number)[] | undefined) => void;
  value?: (string | number)[] | undefined;
  disabled?: boolean;
  disableItem?: (items: IDataItem) => boolean;
  coverStyle?: React.CSSProperties;
  chunk?: number;
  className?: string;
  positionType?: 'horizontal' | 'vertical';
}

const CheckBoxGroup: FC<ICheckBoxGroup> = (props) => {
  const {
    data = [],
    onChange,
    value,
    coverStyle,
    className = '',
    disabled = false,
    chunk = 1,
    positionType = 'horizontal',
    children,
  } = props;

  const [val, setVal] = useState<(string | number)[] | undefined>([]);
  useEffect(() => {
    setVal(value);
  }, [value]);

  let isVertical = positionType === 'vertical';

  const boxClick = (dataItem: IDataItem) => {
    const newInitValue = [...(val || [])];
    if (newInitValue.indexOf(dataItem.value) !== -1) {
      newInitValue.splice(newInitValue.indexOf(dataItem.value), 1);
    } else {
      newInitValue.push(dataItem.value);
    }
    setVal(newInitValue);
    onChange(newInitValue && newInitValue.length ? newInitValue : undefined);
  };

  const renderDefault = () => {
    return (
      <div className="alitajs-dform-box-content">
        <Grid columns={chunk}>
          {data.map((item: IDataItem) => {
            const _disabled = disabled || props?.disableItem?.(item);
            return (
              <Item key={item.value}>
                <div
                  className={classnames({
                    'alitajs-dform-box-wrapper': true,
                    'alitajs-dform-box-wrapper-disabled': _disabled,
                  })}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (_disabled) return;
                    boxClick(item);
                  }}
                >
                  <div
                    className={classnames({
                      'alitajs-dform-box-botton': true,
                      'alitajs-dform-box-botton-checked': val?.includes(
                        item.value,
                      ),
                      // (value || []).indexOf(item.value) !== -1,
                    })}
                  >
                    {val?.includes(item.value) && (
                      <div className="alitajs-dform-box-tick"></div>
                    )}
                  </div>
                  <div
                    className={classnames({
                      'alitajs-dform-box-label': true,
                      [className]: className,
                    })}
                    style={coverStyle}
                  >
                    {item.label}
                  </div>
                </div>
              </Item>
            );
          })}
        </Grid>
      </div>
    );
  };

  const renderPcContent = () => {
    return (
      <PcLayout isVertical={isVertical} left={children} right={<div></div>} />
    );
  };

  return (
    <DformContext.Consumer>
      {({ isPc }: any) => {
        if (!isPc) return renderDefault();
        return renderPcContent();
      }}
    </DformContext.Consumer>
  );
};

export default CheckBoxGroup;
