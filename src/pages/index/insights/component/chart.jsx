import React, { useEffect, useState } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/axis';
import { random } from 'lodash';

/**
 * 针对传入的数据给出echarts的option
 */
const setEchartsOptions = (data) => {
  const getDataNumber = (length) => {
    const array = new Array(length);
    for (let i = 0; i < array.length; i++) {
      const value = random(0, 50);
      array[i] = value;
    }
    return array;
  };

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
      data: ['Concerned', 'Angry', 'Stressed', 'Anxious'],
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
      data: [
        'Nov 1',
        'Nov 2',
        'Nov 3',
        'Nov 4',
        'Nov 5',
        'Nov 6',
        'Nov 7',
        'Nov 8',
        'Nov 9',
        'Nov 10',
        'Nov 11',
        'Nov 12',
        'Nov 13',
        'Nov 14',
        'Nov 15',
      ],
    },
    yAxis: {
      type: 'value',
      show: true,
      axisLine: {
        show: true,
      },
    },
    series: [
      {
        name: 'Concerned',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        data: getDataNumber(15),
      },
      {
        name: 'Angry',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        data: getDataNumber(15),
      },
      {
        name: 'Stressed',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        data: getDataNumber(15),
      },
      // {
      //   name: 'Anxious',
      //   type: 'line',
      //   stack: '总量',
      //   symbol: 'circle',
      //   symbolSize: 8,
      //   data: [320, 332, 301, 334, 390, 330, 320],
      // },
    ],
  };
};

function InsightChart(props) {
  const { data = {} } = props;

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
    mc.setOption(setEchartsOptions(data));
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
      myCharts.setOption(setEchartsOptions(data));
    }
  }, [data, myCharts]);

  return <div id="insight-charts" style={{ width: '100%', height: 420 }} />;
}

export { InsightChart };
export default InsightChart;
