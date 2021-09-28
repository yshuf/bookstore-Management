/* @description: 雷达图
@param {array} data [{ value: [], name: '利润总额' },{ value: [], name: '营业收入' },]
@param {string} title 标题
@param {array} indicator 各项的名字和最大值
@return {object} option */

const colors = ['#3271FF', '#20DBEE', '#F3921F'];
export const baseRadarOption = ({ data = [], title = '', indicator = [] }) => {
  return {
    color: colors,
    title: {
      text: title
    },
    legend: {
      show: true,
      itemGap: 10,
      itemWidth: 20,
      itemHeight: 8,
      bottom: 16,
      data: data.map(v => v.name)
    },
    tooltip: {
      // trigger: 'item'
      show: true, // 是否显示提示框组件
      transitionDuration: 0, // 防止tooltip的抖动
      trigger: 'item'
    },
    radar: {
      // shape: 'circle',
      indicator: indicator,
      splitArea: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#E9E9E9'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#E9E9E9'
        }
      },
      // axisLabel: {
      //   show: true
      // },
      name: {
        // formatter: value => {
        //   return value.length > 5
        //     ? value.slice(0, 4) + '\n' + value.slice(4, value.length - 1)
        //     : value;
        // },
        textStyle: {
          color: 'rgba(51, 51, 51, 1)' // 文字颜色
        }
      }
    },
    series: [
      {
        type: 'radar',
        symbolSize: 5,
        // itemStyle: {
        //   color: '#fff',
        //   borderColor: 'rgba(90, 216, 166, 1)',
        //   borderWidth: 1
        // },
        data: data
      }
    ]
  };
};
