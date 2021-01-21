import React, { useEffect, useState } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/axis';
import { concat } from 'lodash';
import moment from 'moment';

/**
 * 针对传入的数据给出echarts的option
 */
const setEchartsOptions = (data, selectedSummary = {}) => {
  // console.log('[传入的data]:', data);
  // console.log('[选中的表头selectedSummary]：', selectedSummary);
  /**
   * @param getPublicSeriesData
   * common线性数据
   */
  const getPublicSeriesData = {
    type: 'line',
    symbol: 'circle',
    symbolSize: 8,
  };
  /**
   * @param timeArray 横轴坐标日期
   * @param legendArray
   */
  const timeArray = [];
  const seriesData = [];

  for (let i = 0; i < data.length; i++) {
    const currentItem = data[i];
    timeArray.push(moment(currentItem.Date).format('MMM d'));

    /**
     * 当前类别的数据
     */
    const selectItem = currentItem[selectedSummary?.title];
    if (selectItem) {
      selectItem.forEach((selectedEmotion) => {
        // eslint-disable-next-line guard-for-in
        for (let emotionKey in selectedEmotion) {
          if (emotionKey) {
            const seriesDataIndex = seriesData.findIndex(
              (sd) => sd.name === emotionKey,
            );
            if (seriesDataIndex === -1) {
              seriesData.push({
                ...getPublicSeriesData,
                name: emotionKey,
                data: selectedEmotion[emotionKey],
              });
            } else {
              seriesData[seriesDataIndex] = {
                ...seriesData[seriesDataIndex],
                data: concat(
                  seriesData[seriesDataIndex].data,
                  selectedEmotion[emotionKey],
                ),
              };
            }
          }
        }
      });
    }
  }

  // console.log('[线性数据]：', seriesData);
  // console.log('[日期横坐标]：', timeArray);

  // const getDataNumber = (length) => {
  //   const array = new Array(length);
  //   for (let i = 0; i < array.length; i++) {
  //     const value = random(0, 50);
  //     array[i] = value;
  //   }
  //   return array;
  // };

  return {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      icon: 'rect',
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 16,
      bottom: 0,
    },
    grid: {
      top: '3%',
      left: '0%',
      right: '2%',
      bottom: '14%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: timeArray,
    },
    yAxis: {
      type: 'value',
      show: true,
      axisLine: {
        show: true,
      },
    },
    series: seriesData,
  };
};

function InsightChart(props) {
  const { data = [], selectedSummary = {} } = props;

  const [myCharts, setMyCharts] = useState({});
  /**
   * 初始化echarts
   */
  useEffect(() => {
    let mc = echarts.getInstanceByDom(
      document.getElementById('insight-charts'),
    );
    if (mc === undefined) {
      mc = echarts.init(document.getElementById('insight-charts'));
    }
    setMyCharts(mc);

    window.addEventListener('resize', function () {
      mc.resize();
    });
    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);

  useEffect(() => {
    if (myCharts.setOption) {
      myCharts.setOption(setEchartsOptions(data, selectedSummary));
    }
  }, [data, selectedSummary, myCharts]);

  return <div id="insight-charts" style={{ width: '100%', height: 420 }} />;
}

export { InsightChart };
export default InsightChart;
