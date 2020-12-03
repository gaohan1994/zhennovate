import React, { useState, useEffect } from 'react';
import './index.less';
import imgunchoice from '@/assets/3.数据录入-2.Radio单选框-亮色-Icon-未选@2x.png';
import imgchoice from '@/assets/3.数据录入-2.Radio单选框-亮色-Icon-选中@2x.png';

const prefix = 'component-choice';

function Choice(props) {
  const { options, defaultValue, onChoice } = props;

  const [selectValue, setSelectedValue] = useState('');

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div style={{ width: '100%' }}>
      {options.map((item) => {
        const selected = selectValue === item.value;
        return (
          <div
            key={item.value}
            className={`${prefix}-item`}
            style={{ backgroundColor: selected ? '#1790ff' : '#f9f9f9' }}
            onClick={() => {
              setSelectedValue(item.value);
              onChoice && onChoice(item.value);
            }}
          >
            <span style={{ color: selected ? '#fff' : '#1b2631' }}>
              {item.label}
            </span>
            {item.subTitle && (
              <span style={{ color: selected ? '#fff' : '#8c9297' }}>
                {item.subTitle}
              </span>
            )}

            <div
              style={{
                backgroundImage: `url(${selected ? imgchoice : imgunchoice})`,
              }}
              className={`${prefix}-icon`}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Choice;

export { Choice };
