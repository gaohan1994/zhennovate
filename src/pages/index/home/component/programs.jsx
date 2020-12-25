import React, { useEffect, useState } from 'react';
import Sort from '@/component/sort';
import Empty from '@/component/empty';
import { ProgramTabKeys, progressList } from '../../program/constants';
import useSignSdk from '@/pages/sign/store/sign-sdk';
import { ResponseCode } from '@/common/config';
import Program from '@/component/program';

function HomePrograms() {
  // 渲染的 programs
  const [programs, setPrograms] = useState([]);
  // sign sdk
  const { sign } = useSignSdk();

  useEffect(() => {
    if (sign.userinfo) {
      progressList(sign.userinfo).then((result) => {
        if (result.error_code === ResponseCode.success) {
          let progressArrayList = [];

          Object.keys(result.data).forEach((key) => {
            const currentList = result.data[key];
            progressArrayList = progressArrayList.concat(currentList);
          });

          setPrograms(progressArrayList);
        }
      });
    }
  }, [sign]);
  return (
    <div style={{ marginTop: 32 }}>
      <Sort
        title="Programs in Progress"
        subTitle="Continue where you left off"
        showSort={false}
      />
      {programs && programs.length > 0 ? (
        <>
          {programs.map((item) => {
            return <Program type="home" data={item} key={item._id} />;
          })}
        </>
      ) : (
        <Empty tab={{ key: ProgramTabKeys.progress }} />
      )}
    </div>
  );
}

export default HomePrograms;
