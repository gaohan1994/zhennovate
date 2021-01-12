import React, { useState } from 'react';
import '../index.less';
import Sort from '@/component/sort';
import InsightChart from '../component/chart';
import { ArrowUpOutlined } from '@ant-design/icons';

const prefix = 'page-insights';

const data = [
  { title: 'Mad', value: 36, data: 1 },
  { title: 'Calm', value: 39, data: 10 },
  { title: 'Brave', value: 13, data: 20 },
  { title: 'Sad', value: 42, data: 30 },
];

function Emotion() {
  const [activeTitle, setActiveTitle] = useState(data[0]);

  const onClickTab = (item) => {
    setActiveTitle(item);
  };

  return (
    <div>
      <Sort title="Understanding your emotions" showSort={false} />
      <div className={`${prefix}-card`}>
        <Sort
          title="Emotions you’ve felt"
          value="1"
          options={[{ label: 'Last 14 days', value: '1' }]}
        />

        <section className={`${prefix}-emotion`}>
          <section>
            {data.map((item) => {
              const active = item.title === activeTitle.title;
              return (
                <div
                  className={`${prefix}-emotion-item`}
                  key={item.title}
                  onClick={() => onClickTab(item)}
                >
                  <span title-active={active ? 'active' : ''}>
                    {item.title}
                  </span>
                  <h1 title-active={active ? 'active' : ''}>{item.value}</h1>
                  <div
                    className={`${prefix}-emotion-item-border`}
                    title-active={active ? 'active' : ''}
                  />
                </div>
              );
            })}
            <div className={`${prefix}-emotion-border`} />
          </section>

          <div className={`${prefix}-emotion-tip`}>
            <div>
              <ArrowUpOutlined style={{ color: '#fff', fontSize: 12 }} />
            </div>
            Mad emotions increased by 20% in the last 14 days.
          </div>
        </section>
        <InsightChart data={activeTitle.data} />
      </div>
    </div>
  );
}

export default Emotion;
export { Emotion };
