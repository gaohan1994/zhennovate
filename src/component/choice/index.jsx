import React, { useState, useEffect } from 'react';
import './index.less';

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

            <div className={`${prefix}-icon`} />
          </div>
        );
      })}
    </div>
  );
}

export default Choice;

export { Choice };
