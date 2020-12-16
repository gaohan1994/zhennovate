import React from 'react';
import Workshop from '@/component/workshop';
import '@/pages/index/program/index.less';
import Sort from '@/component/sort';
import Empty from '@/component/empty';
import imgwork from '@/assets/Icon-Workshop-Empty@2x.png';

const prefix = 'page-program';

export default (props) => {
  const { programData } = props;
  return (
    <div
      className={`${prefix}-container-box`}
      style={{ marginLeft: 24, paddingBottom: 100 }}
    >
      <div className={`${prefix}-container-left`} style={{}}>
        <div style={{ width: '100%', height: 32 }} />
        <Sort
          title="Workshop"
          subTitle="Sign up for Virtual and In Person Workshops here!"
          showSort={false}
        />

        {programData.Workshops && programData.Workshops.length > 0 ? (
          <div>
            {programData.Workshops.map((item) => {
              return <Workshop data={item} key={item._id} />;
            })}
          </div>
        ) : (
          <Empty
            icon={imgwork}
            title="No Workshops"
            tab={{
              empty: 'Workshops will be added shortly. Check back later.',
            }}
          />
        )}
      </div>
    </div>
  );
};
