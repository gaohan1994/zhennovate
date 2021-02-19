import React from 'react';
import './index.less';
import { ProgramTabKeys } from '@/pages/index/program/constants';
import imgcomplete from '../../assets/Icon-CompletedProgram-Empty@2x.png';
import imgbook from '../../assets/SVG/Icon-Bookmark-Empty.svg';
import imgprogress from '../../assets/empty/Icon-Inprogress-Empty.svg';

const prefix = 'component-empty';

function Empty(props) {
  const { tab = {}, title, subTitle, icon } = props;

  const renderIcon = icon
    ? icon
    : tab.key === ProgramTabKeys.available
    ? imgcomplete
    : tab.key === ProgramTabKeys.progress
    ? imgprogress
    : tab.key === ProgramTabKeys.complete
    ? imgcomplete
    : tab.key === ProgramTabKeys.save
    ? imgbook
    : '';

  return (
    <div className={`${prefix}`}>
      <div
        className={`${prefix}-icon`}
        style={{ backgroundImage: `url(${renderIcon})` }}
      />
      <span className={`${prefix}-title`}>
        {title
          ? title
          : tab.key === ProgramTabKeys.available
          ? 'No available Programs here'
          : tab.key === ProgramTabKeys.progress
          ? 'No in-progress Programs'
          : tab.key === ProgramTabKeys.complete
          ? 'No completed Programs'
          : tab.key === ProgramTabKeys.save
          ? 'No saved Programs'
          : ''}
      </span>
      <span>
        {tab.empty || subTitle || 'Programs you’ve started will appear here.'}
      </span>
    </div>
  );
}

export default Empty;
