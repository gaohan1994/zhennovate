import React, { useEffect } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/axis';

function InsightChart(props) {
  const { data = {} } = props;

  /**
   * 针对传入的数据给出echarts的option
   */
  const setEchartsOptions = (data) => {
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
          data: [0, 20, 20, 40, 60, 0, 0, 0, 60, 50, 0, 10, 20, 40, 50],
        },
        {
          name: 'Angry',
          type: 'line',
          symbol: 'circle',
          symbolSize: 8,
          data: [60, 40, 0, 0, 0, 0, 0, 20, 40, 40, 20, 0, 0, 10, 10],
        },
        {
          name: 'Stressed',
          type: 'line',
          symbol: 'circle',
          symbolSize: 8,
          data: [90, 80, 40, 60, 70, 60, 80, 60, 80, 90, 60, 50, 40, 30, 0],
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

  /**
   * 初始化echarts
   */
  useEffect(() => {
    let myChart = echarts.getInstanceByDom(
      document.getElementById('insight-charts'),
    );
    if (myChart === undefined) {
      myChart = echarts.init(document.getElementById('insight-charts'));
    }
    myChart.setOption(setEchartsOptions(data));

    window.addEventListener('resize', function () {
      myChart.resize();
    });
    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return <div id="insight-charts" style={{ width: '100%', height: 420 }} />;
}

export { InsightChart };
export default InsightChart;
