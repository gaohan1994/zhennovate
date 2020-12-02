import React from 'react';
import '@/pages/index/program/index.less';
import Filter from '@/component/fliter';
import Sort from '@/component/sort';
import Markdown from '@/component/markdown';
import '../index.less';
import imgaction from '../../../../assets/Icon-Action@2x.png';
import imgreflection from '../../../../assets/Icon-Reflection@2x.png';

const prefix = 'page-program';

function RenderHeader(props) {
  const { icon, title, subTitle } = props;
  console.log('icon', icon);
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
  return (
    <div
      className={`${prefix}-container-box`}
      style={{ marginLeft: 24, paddingBottom: 100 }}
    >
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
    </div>
  );
};
