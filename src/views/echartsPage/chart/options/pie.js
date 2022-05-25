const colors = [
  '#528CFF',
  '#21CED5',
  '#FDB620',
  '#21ce9b',
  '#34bbf1',
  '#5bd0ff',
  '#ffe36e',
  '#ffc76e',
  '#ff863b',
  '#ff5858',
  'rgb(91, 143, 249)',
  'rgb(90, 216, 166)',
  'rgb(246, 189, 22)',
  'rgb(232, 100, 82)',
  'rgb(109, 200, 236)',
  'rgb(148, 95, 185)',
  'rgb(255, 152, 69)',
  'rgb(30, 148, 147)',
  'rgb(255, 153, 195)'
];

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
  var sum = 0;
  const dataList = data.map(item => ({
    name: item.name,
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

/**
 * @description: 多饼图
 * @param {array} series
 */
export const doublePieOption = (series = []) => {
  return {
    title: {
      textAlign: 'center',
      // text: '总数\n\n' + sum + unit,
      textStyle: {
        color: '#fff',
        fontWeight: 600,
        fontSize: 14
      },
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
    series: series.map(item => {
      console.log('item: ', item);
      return {
        type: 'pie',
        data: item.data,
        name: item.name,
        radius: item.radius,
        center: item.center,
        label: {
          show: true,
          position: 'outside',
          formatter: '{a|{b}：{d}%}\n{hr|}',
          rich: {
            hr: {
              backgroundColor: 't',
              borderRadius: 3,
              width: 3,
              height: 3,
              padding: [3, 3, 0, -12]
            },
            a: {
              padding: [-30, 15, -20, 15]
            }
          }
        },
        labelLine: {
          normal: {
            length: 20,
            length2: 30,
            lineStyle: {
              width: 1
            }
          }
        },
        emphasis: {
          label: {
            show: true
          }
        },
        formatter: params => {
          return params.data.name + '(' + params.data.value + '%)';
        },
        itemStyle: _get(item, 'itemStyle', {})
      };
    })
  };
};

/* 玫瑰图 */
export const rosePieOption = (
  data = [],
  outOptions = {
    unit: '分',
    fullUnit: '分数',
    name: '综合评价'
  }
) => {
  return {
    backgroundColor: 'transparent',
    calculable: true,
    tooltip: {
      trigger: 'item',
      formatter: `{a}<br/>{b}:{c}${outOptions.unit}`
    },
    title: {
      text: `单位：${outOptions.fullUnit}`,
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
        name: outOptions.name,
        type: 'pie',
        radius: [50, 185], // 饼图的半径
        avoidLabelOverlap: false, // 是否启用防止标签重叠策略，默认开启,在标签拥挤重叠的情况下会挪动各个标签的位置，防止标签间的重叠
        startAngle: 180, // 开始角度
        center: ['50%', '75%'],
        roseType: 'area', // 是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
        selectedMode: 'single', // 单选
        label: {
          show: true
        },
        itemStyle: {
          normal: {
            label: {
              formatter: function (item) {
                return item.value
                  ? item.name + '(' + item.value + `${outOptions.unit})`
                  : null;
              },
              padding: [0, 0, 10, -55], // 文字快内边距
              textStyle: {
                color: '#666',
                fontSize: 14
              }
            }
          }
        },
        labelLine: {
          normal: {
            show: false,
            smooth: false,
            length: 8,
            length2: 0
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

// 特色全饼图
export const allPieOptions = (data = {}) => {
  return {
    color: ['#3AFDF7', '#3271FF', '#F3921F', '#F6BD16', '#A8FFFC'],
    tooltip: {
      trigger: 'item',
      formatter: params => {
        const domHtml =
          '<span style="display:inline-block;margin-right:9px;border-radius:8px;width:8px;height:8px;background-color:' +
          params.color +
          '"></span>';
        return domHtml + params.name + ' : ' + params.value + '%';
      }
    },
    legend: {
      orient: 'vertical',
      left: '6%',
      top: 'middle',
      itemGap: 12, // 每项之间的间隔
      itemWidth: 10,
      itemHeight: 10,
      formatter: name => {
        let res = data.filter(v => v.name === name);
        res = res[0] || {};
        return '{name|' + name + '}{value|' + res.value + '}%';
      },
      textStyle: {
        color: '#000',
        lineHeight: 8,
        padding: [8, 0, 4, 8],
        fontSize: 15,
        rich: {
          name: {
            width: 100
          }
        }
      }
    },
    series: [
      {
        type: 'pie',
        radius: [20, 130],
        center: ['60%', '50%'],
        roseType: 'radius',
        itemStyle: {
          borderRadius: 5
        },
        label: {
          show: false
        },
        data: data
      },
      {
        type: 'pie',
        center: ['60%', '50%'],
        radius: ['58%', '58%'],
        silent: true, // 图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
        label: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: 0,
            name: '',
            itemStyle: {
              normal: {
                borderWidth: 1,
                borderColor: 'rgba(0,10,0,0.1)'
              }
            }
          }
        ]
      },
      {
        type: 'pie',
        center: ['60%', '50%'],
        radius: ['0%', '15%'],
        silent: true, // 图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
        label: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: 0,
            name: '',
            itemStyle: {
              normal: {
                color: '#D1E6FF'
              }
            }
          }
        ]
      },
      {
        type: 'pie',
        center: ['60%', '50%'],
        radius: ['0%', '8%'],
        silent: true, // 图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
        label: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: 0,
            name: '',
            itemStyle: {
              normal: {
                color: '#6F90B4'
              }
            }
          }
        ]
      }
    ]
  };
};
