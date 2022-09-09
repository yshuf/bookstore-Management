const colors = ['#528CFF', '#21CED5', '#FDB620'];

/**
 * @description: 环形-饼图
 * @param {array} data [{ value: 335, name: '直接访问' },{ value: 310, name: '邮件营销' },]
 * @param {string} name 三地规上工业企业数情况
 * @param {string} unit 家
 * @param {array} radius ['35%', '55%']
 * @param {array} center ['65%', '50%']
 * @param {array} legendPos ['10%', 'center']
 * @return {object} option
 */
export const basePieOption = (
  data = [],
  name = '',
  unit = '',
  radius = ['35%', '55%'],
  center = ['65%', '50%'],
  legendPos = ['10%', 'center']
) => {
  const position = parseInt(center[0].replace('%', '') - 1) + '%';
  let sum = 0;
  const dataList = data.map(item => ({
    name: `${item.name}  ${item.value}${unit}`,
    value: item.value
  }));
  dataList.forEach(v => {
    sum += v.value;
  });
  return {
    title: {
      textAlign: 'center',
      text: '总数\n\n' + sum + unit,
      textStyle: {
        color: '#fff',
        fontWeight: 600,
        fontSize: 14
      },
      left: position,
      y: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}({d}%)',
      backgroundColor: 'rgba(0, 71, 78, 0.64)',
      borderColor: 'rgba(32, 219, 238, 0.5)',
      borderWidth: 1,
      textStyle: {
        color: '#fff',
        fontSize: 14
      }
    },
    legend: {
      show: false
    },
    color: colors,
    grid: {
      top: '15%',
      bottom: '15%',
      left: '15%',
      right: '15%'
    },
    series: [
      {
        name: name,
        type: 'pie',
        radius,
        center,
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false,
            fontSize: '30',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: dataList
      }
    ]
  };
};

/* 玫瑰图 */
export const rosePieOption = (data = []) => {
  return {
    backgroundColor: 'transparent',
    calculable: true,
    tooltip: {
      trigger: 'item',
      formatter: '{a}<br/>{b}:{c}分'
    },
    title: {
      text: '单位：分数',
      left: 0,
      top: 20,
      textStyle: {
        color: '#999',
        fontSize: '14px'
      }
    },
    grid: {
      bottom: '50%'
    },
    series: [
      {
        name: '综合评价',
        type: 'pie',
        radius: [50, 155], // 饼图的半径
        avoidLabelOverlap: false, // 是否启用防止标签重叠策略，默认开启,在标签拥挤重叠的情况下会挪动各个标签的位置，防止标签间的重叠
        startAngle: 180, // 开始角度
        center: ['50.1%', '70%'],
        roseType: 'area', // 是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
        selectedMode: 'single', // 单选
        label: {
          show: true
        },
        itemStyle: {
          normal: {
            label: {
              textStyle: {
                color: '#666',
                fontSize: 12
              }
            }
          }
        },
        labelLine: {
          normal: {
            show: true,
            smooth: false,
            length: 6,
            length2: 2
          },
          emphasis: {
            show: true
          }
        },
        data: data
      }
    ]
  };
};
