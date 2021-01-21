import React, { useState, useEffect } from 'react';
import '../index.less';
import Sort from '@/component/sort';
import InsightChart from '../component/chart';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { emotion } from '../constants';
import useSignSdk from '@/pages/sign/store/sign-sdk';
import { ResponseCode } from '@/common/config';

const prefix = 'page-insights';

function Emotion() {
  /**
   * charts的表头
   */
  const [summary, setSummary] = useState([]);

  /**
   * 选中的表头
   */
  const [selectedSummary, setSelectedSummary] = useState({});

  /**
   * charts的表单数据
   */
  const [emotionData, setEmotionData] = useState({});

  const { isSign, userId } = useSignSdk();

  const onClickTab = (item) => {
    setSelectedSummary(item);
  };

  /**
   * 请求数据
   * 初始化表头数据 summary
   * 初始化选中表头
   */
  useEffect(() => {
    if (isSign) {
      const payload = {
        userId,
        duration: 4,
      };
      emotion(payload).then((result) => {
        console.log('[表单数据]:', result);
        if (result.error_code === ResponseCode.success) {
          const { summary } = result.data;
          let summaryData = [];
          for (let key in summary) {
            if (key) {
              summaryData.push({ title: key, value: summary[key] });
            }
          }
          setSummary(summaryData);
          setSelectedSummary(summaryData[0]);
        }
        setEmotionData(result.data);
      });
    }
  }, []);

  const isDecrease =
    emotionData.ratio &&
    selectedSummary &&
    selectedSummary.title &&
    emotionData.ratio[selectedSummary.title] &&
    emotionData.ratio[selectedSummary.title].indexOf('-') >= 0;

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
            {summary.map((item) => {
              const active = item.title === selectedSummary.title;
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
            <div
              style={{
                backgroundColor: isDecrease ? '#15c3b1' : '#e86452',
              }}
            >
              {isDecrease ? (
                <ArrowDownOutlined style={{ color: '#fff', fontSize: 12 }} />
              ) : (
                <ArrowUpOutlined style={{ color: '#fff', fontSize: 12 }} />
              )}
            </div>
            {selectedSummary.title || ''} emotions
            {isDecrease ? ' decrease ' : ' increased '}
            by {emotionData.ratio && emotionData.ratio[selectedSummary.title]}%
            in the last 14 days.
          </div>
        </section>
        <InsightChart
          data={emotionData.line || []}
          selectedSummary={selectedSummary}
          summary={summary}
        />
      </div>
    </div>
  );
}

export default Emotion;
export { Emotion };
