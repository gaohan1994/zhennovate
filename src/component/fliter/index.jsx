import React from 'react';
import '@/pages/index/program/child/index.less';
import { Card, Checkbox } from 'antd';
const prefix = 'program-child';

function Filter(props) {
  const { style = {}, onChange, category, list } = props;
  return (
    <div className={`${prefix}-filter`} style={style}>
      <Card bodyStyle={{ paddingTop: 16 }}>
        <div className={`${prefix}-filter-card`}>
          <div className={`${prefix}-filter-title`}>Filter by</div>

          <Checkbox.Group onChange={onChange} style={{ width: '100%' }}>
            <div className={`${prefix}-filter-checkbox`}>
              {category.length > 0 &&
                category.map((item) => {
                  const currentCategory = list[item];
                  return (
                    <div
                      key={item}
                      className={`${prefix}-filter-checkbox-item`}
                    >
                      <Checkbox style={{ marginLeft: 0 }} value={item}>
                        <span>{item}</span>
                      </Checkbox>
                      <span>{currentCategory && currentCategory.length}</span>
                    </div>
                  );
                })}
            </div>
          </Checkbox.Group>
        </div>
      </Card>
    </div>
  );
}

export default Filter;

export { Filter };
