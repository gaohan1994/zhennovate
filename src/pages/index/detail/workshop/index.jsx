import React, { useEffect, useState } from 'react';
import Workshop from '@/component/workshop';
import '@/pages/index/program/index.less';
import Sort from '@/component/sort';
import Empty from '@/component/empty';
import imgwork from '@/assets/Icon-Workshop-Empty@2x.png';
import { programWorkshop } from '../constants';
import { ResponseCode } from '@/common/config';
import useSignSdk from '@/pages/sign/store/sign-sdk';

const prefix = 'page-program';

export default (props) => {
  const { programData } = props;

  const [workshops, setWorkshops] = useState([]);

  const { isSign, userId } = useSignSdk();

  useEffect(() => {
    if (programData._id && isSign) {
      programWorkshop({ userId, programId: programData._id }).then((result) => {
        console.log('[program的workshop：] ', result);
        if (result.error_code === ResponseCode.success) {
          setWorkshops(result.data);
        }
      });
    }
  }, [programData, isSign]);

  return (
    <div
      className={`${prefix}-container-box`}
      style={{ marginLeft: 24, paddingBottom: 100 }}
    >
      <div className={`${prefix}-container-left`} style={{}}>
        <div style={{ width: '100%', height: 32 }} />
        <Sort
          title="Workshop"
          subTitle="Register for events and workshops"
          showSort={false}
        />

        {workshops && workshops.length > 0 ? (
          <div>
            {workshops.map((item) => {
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
