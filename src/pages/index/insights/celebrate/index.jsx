import React from 'react';
import Sort from '@/component/sort';
import moment from 'moment';
import '../index.less';
import imgcele1 from '@/assets/insight-page-icon/Icon_speak_up_128x128.svg';
import imgcele2 from '@/assets/insight-page-icon/Icon_ask_fkor-help_128x128.svg';
import imgcele3 from '@/assets/insight-page-icon/Icon_self_care_128x128.svg';
import imgcele4 from '@/assets/insight-page-icon/Icon_small_win_128x128.svg';
const prefix = 'page-insights';

function Celebrate() {
  const lastUpdateDate = moment().format('MMM DD, YYYY');
  return (
    <div className={`${prefix}-card`}>
      <Sort
        title="What to celebrate"
        subTitle={`Last Updated ${lastUpdateDate}`}
        value="1"
        options={[{ label: 'Last 14 days', value: '1' }]}
      />

      <div className={`${prefix}-container`}>
        <div className={`${prefix}-topic-card ${prefix}-topic-card-center`}>
          <img src={imgcele1} />
          <div className={`${prefix}-cele-number`}>
            5<em>X</em>
          </div>
          <span style={{ marginTop: 8 }}>You practiced</span>
          <div style={{ marginTop: 8 }}>
            <strong>speaking up in meetings.</strong>
          </div>
          <span style={{ marginTop: 12 }}>Last 14 days</span>
        </div>
        <div className={`${prefix}-topic-card ${prefix}-topic-card-center`}>
          <img src={imgcele2} />
          <div className={`${prefix}-cele-number`}>
            5<em>X</em>
          </div>
          <span style={{ marginTop: 8 }}>You practiced</span>
          <div style={{ marginTop: 8 }}>
            <strong>speaking up in meetings.</strong>
          </div>
          <span style={{ marginTop: 12 }}>Last 14 days</span>
        </div>
        <div className={`${prefix}-topic-card ${prefix}-topic-card-center`}>
          <img src={imgcele3} />
          <div className={`${prefix}-cele-number`}>
            5<em>X</em>
          </div>
          <span style={{ marginTop: 8 }}>You practiced</span>
          <div style={{ marginTop: 8 }}>
            <strong>speaking up in meetings.</strong>
          </div>
          <span style={{ marginTop: 12 }}>Last 14 days</span>
        </div>

        <div className={`${prefix}-topic-card ${prefix}-topic-card-center`}>
          <img src={imgcele4} />
          <div className={`${prefix}-cele-number`}>
            5<em>X</em>
          </div>
          <span style={{ marginTop: 8 }}>You practiced</span>
          <div style={{ marginTop: 8 }}>
            <strong>speaking up in meetings.</strong>
          </div>
          <span style={{ marginTop: 12 }}>Last 14 days</span>
        </div>
      </div>
      <div className={`${prefix}-cele-tip`}>
        Consistent reinforcement leads to mastery. Keep up your efforts!
      </div>
    </div>
  );
}

export default Celebrate;
export { Celebrate };
