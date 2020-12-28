import React, { useEffect, useState } from 'react';
import '@/pages/index/program/index.less';
import Filter from '@/component/fliter';
import Sort from '@/component/sort';
import Markdown from '@/component/markdown';
import '../index.less';
import imgaction from '../../../../assets/Icon-Action@2x.png';
import imgreflection from '../../../../assets/Icon-Reflection@2x.png';
import { programEntry } from '../../program/constants';
import useSignSdk from '@/pages/sign/store/sign-sdk';
import { ResponseCode } from '@/common/config';
import DemoEmpty from '@/component/demo/empty';
import imgempty from '@/assets/Demo-icon/journal.jpg';

const prefix = 'page-program';

function RenderHeader(props) {
  const { icon, title, subTitle } = props;
  const prefix = 'page-detail';
  return (
    <div className={`${prefix}-custom-header ${prefix}-custom`}>
      {icon && (
        <div
          className={`${prefix}-custom-icon`}
          style={{ backgroundImage: `url(${icon})` }}
        />
      )}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 className={`${prefix}-custom-title`}>{title}</h1>
        <span>{subTitle}</span>
      </div>
    </div>
  );
}

export default (props) => {
  const { programData } = props;
  const [entryData, setEntryData] = useState({});
  const [isDemo] = useState(true);

  const { userId } = useSignSdk();

  useEffect(() => {
    programEntry({
      userId,
      programId: programData._id,
    }).then((result) => {
      console.log('entry', result);
      if (result.error_code === ResponseCode.success) {
        setEntryData(result.data);
      }
    });
  }, []);

  console.log('entryData', entryData);

  return (
    <div
      className={`${prefix}-container-box`}
      style={{ marginLeft: 24, paddingBottom: 100 }}
    >
      {isDemo ? (
        <DemoEmpty
          img={imgempty}
          detail="Here, you can revisit your reflections and input in the learning process."
        />
      ) : (
        <>
          <div className={`${prefix}-container-left`}>
            <div style={{ width: '100%', height: 32 }} />
            <Sort
              title="Entries"
              subTitle="Micro copy for entries"
              value="1"
              onChange={() => {}}
              options={[{ label: 'Sort by: Newest to oldest', value: '1' }]}
            />

            <Markdown
              renderHeader={() => (
                <RenderHeader
                  title="Action Name Written Here"
                  subTitle="Mon, Sept 20, 2020"
                  icon={imgaction}
                />
              )}
              data={programData.Detail}
              title="Action Name Written Here"
            />
            <div style={{ width: '100%', height: 32 }} />

            <Markdown
              renderHeader={() => (
                <RenderHeader
                  title="Action Name Written Here"
                  subTitle="Mon, Sept 20, 2020"
                  icon={imgreflection}
                />
              )}
              data={programData.Detail}
              title="Action Name Written Here"
            />
            <div style={{ width: '100%', height: 32 }} />
          </div>
          <div className={`${prefix}-container-right`}>
            <div style={{ width: '100%', height: 32 }} />
            <Filter category={[]} list={{}} />
          </div>
        </>
      )}
    </div>
  );
};
