import React from 'react';
import './index.less';
import { ProgramTabKeys } from '@/pages/index/program/constants';
import imgcomplete from '../../assets/Icon-CompletedProgram-Empty@2x.png';

const prefix = 'component-empty';

function Empty(props) {
  const { tab } = props;
  return (
    <div className={`${prefix}`}>
      <div
        className={`${prefix}-icon`}
        style={{ backgroundImage: `url(${imgcomplete})` }}
      />
      <span className={`${prefix}-title`}>
        {tab.key === ProgramTabKeys.available
          ? 'No Available Programs here'
          : tab.key === ProgramTabKeys.progress
          ? 'No Programs here'
          : tab.key === ProgramTabKeys.complete
          ? 'No completed programs here'
          : tab.key === ProgramTabKeys.save
          ? 'Nothing Saved here'
          : ''}
      </span>
      <span>{tab.empty || 'Programs you’ve started will appear here.'}</span>
    </div>
  );
}

export default Empty;
