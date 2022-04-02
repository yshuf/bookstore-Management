<!--
 * @Author: your name
 * @Date: 2022-01-21 10:30:12
 * @LastEditTime: 2022-04-02 09:29:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bookstore-Management\src\views\mapBuild\components\map.vue
-->

<template>
  <div class="map-container">
    <div class="map-bottom">
      <div class="label">
        <div class="label-tips more">多</div>
        <div class="label-tips less">少</div>
      </div>
      <div id="mapBox" class="map-box"></div>
    </div>
  </div>
</template>

<script>
import {
  mapInit, regionLevel, getZheJBounds,
  rendPolygon,
  renderPolyline
} from '@/utils/amap/amap';
export default {
  name: 'mapBuild',
  data () {
    return {
      map: null,
      regionLevel: [...regionLevel],
      colorList: [
        '#005BF6',
        '#007FF8',
        '#008DF9',
        '#0093F9',
        '#0098FA',
        '#00ACFB',
        '#00C1FC',
        '#00D1FD',
        '#00E0FD',
        '#00EFFE',
        '#00FCFF'
      ],
      cityRiskCountList: [
        {
          city: '杭州市',
          count: 9
        },
        {
          city: '宁波市',
          count: 0
        },
        {
          city: '温州市',
          count: 0
        },
        {
          city: '绍兴市',
          count: 0
        },
        {
          city: '台州市',
          count: 846
        },
        {
          city: '嘉兴市',
          count: 0
        },
        {
          city: '金华市',
          count: 1
        },
        {
          city: '湖州市',
          count: 0
        },
        {
          city: '衢州市',
          count: 0
        },
        {
          city: '丽水市',
          count: 1
        },
        {
          city: '舟山市',
          count: 3
        }
      ]
    };
  },
  mounted () {
    this.map = mapInit('mapBox', {
      zoom: 8,
      center: [119.412427 + 1.0, 29.303573 - 0.9],
      pitch: 45
    });
    this.initMap();
  },
  methods: {
    initMap () {
      AMap.plugin('AMap.DistrictSearch', () => {
        const district = new AMap.DistrictSearch({
          subdistrict: 1, // 不返回下一级行政区 0：不返回下级行政区 1：返回下一级行政区 2：返回下两级行政区 3：返回下三级行政区
          extensions: 'all', // 返回行政区边界坐标组等具体信息
          level: 'city' // 查询行政级别
        });
        const that = this;
        let districtList = [];
        district.search('浙江省', (status, result) => {
          districtList = result.districtList[0].districtList;
          this.map.add(
            districtList.map((city, i) => {
              const citys = new AMap.Text({
                text: city.name,
                cursor: 'default',
                position:
                city.name == '舟山市' ? [122.307268, 30.100099] : city.center,
                offset: new AMap.Pixel(-20, 10)
              });
              citys.setStyle({
                color: '#000',
                'font-size': '10px',
                border: 'none',
                background: 'transparent'
              });
              return citys;
            })
          );
          for (let index = 0; index < districtList.length; index++) {
            district.search(districtList[index].adcode, (status, result) => {
              if (status === 'complete') {
                var polygons = [];
                const name = result.districtList[0].name;
                const position = result.districtList[0].center;
                const bounds = result.districtList[0].boundaries;
                if (bounds) {
                  for (let i = 0, l = bounds.length; i < l; i++) {
                    const polygon = new AMap.Polygon({
                      map: that.map,
                      strokeColor: '#fff',
                      strokeStyle: 'solid',
                      strokeOpacity: 0.5, // 线透明度
                      strokeWeight: 0.5, // 线宽
                      fillColor: that.getColorByAdcode(name),
                      fillOpacity: 1,
                      path: bounds[i]
                    });
                    polygon.on('mouseover', (e) => {
                      that.createInfoWindow(name, position);
                    });
                    polygon.on('mouseout', (e) => {
                      if (this.infoWindow) {
                        this.infoWindow.close();
                      }
                    });
                    polygons.push(polygon);
                  }
                }
              }
            });
          }
        });
      });
    },
    // 获取风险颜色方法
    getColorByAdcode (name) {
      let countIndex = '';
      const data = this.sortClass(this.cityRiskCountList, 'count');
      // 分组，分在同一组的默认为同一风险等级
      data.map((item, index) => {
        item.forEach((v, i) => {
          if (v.city === name) {
            countIndex = index;
          }
        });
      });
      return this.colorList[data.length - 1 - countIndex];
    },
    // 根据数组中每项的value再次分组
    sortClass (sortData, name) {
      const groupBy = (array, f) => {
        const groups = {};
        array.forEach((o) => {
          const group = JSON.stringify(f(o));
          groups[group] = groups[group] || [];
          groups[group].push(o);
        });
        return Object.keys(groups).map((group) => {
          return groups[group];
        });
      };
      const sorted = groupBy(sortData, (item) => {
        return item[name]; // 返回需要分组的对象
      });
      return sorted;
    },
    // 创建信息弹框
    createInfoWindow (name, data) {
      let showItem = '';
      this.cityRiskCountList.map((v) => {
        if (name === v.city) {
          showItem = v;
        }
      });
      const infoWindowContent = `<div class="risk-infowindow"><div class="risk-area">${name}</div><div>风险个数： ${showItem.count}</div><div>项目个数： ${showItem.projectCount}</div></div>`;
      const lnglat = new AMap.LngLat(data.lng, data.lat);
      if (!this.infoWindow) {
        // 创建一个自定义内容的 infowindow 实例
        this.infoWindow = new AMap.InfoWindow({
          isCustom: true,
          closeWhenClickMap: true,
          position: lnglat,
          // offset: new AMap.Pixel(3, -30),
          offset: new AMap.Pixel(4, -4),
          content: infoWindowContent
        });
      } else {
        // 设置内容
        this.infoWindow.setContent(infoWindowContent);
        // 设置位置
        this.infoWindow.setPosition(lnglat);
      }
      // 打开信息窗
      this.infoWindow.open(this.map);
    }
  }
};
</script>

<style lang="less" scoped>
.map-container {
  height: 100%;
  flex: 1;
  position: relative;
  .top-title {
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
  }
  .map-bottom {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
  }
  .map-box {
    height: 100%;
    width: 100%;
    background-color: #033468;
  }
  .label {
    color: rgba(255, 255, 255, 100);
    position: absolute;
    bottom: 10%;
    right: 8%;
    z-index: 999999;
    width: 14px;
    height: 64px;
    background: linear-gradient(to bottom, #005bf6, #00fcff);
    .label-tips {
      position: absolute;
      left: 25px;
      font-size: 12px;
      &:before {
        content: '';
        position: absolute;
        top: 25%;
        left: 0%;
        margin-left: -0.7rem;
        border-color: transparent #ffffff transparent transparent;
        border-style: solid;
        border-width: 0.15rem 0.25rem;
      }
    }
    .more {
      top: -10%;
    }
    .less {
      bottom: -15%;
    }
  }
}
</style>

<style lang="less">
.risk-infowindow {
  position: relative;
  padding: 0.1rem 0.1rem 0.05rem;
  min-width: 1.22rem;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: rgba(0, 0, 0, 0.65);
  box-shadow: 0px 2px 30px 0px rgba(0, 0, 0, 0.5);
  color: rgba(255, 255, 255, 100);
  .risk-area {
    opacity: 0.65;
  }
  div {
    margin-bottom: 8px;
  }
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    // bottom: -0.15rem;
    margin-left: -0.09rem;
    border-color: rgba(23, 42, 62, 0.57) transparent transparent transparent;
    border-style: solid;
    border-width: 0.8rem 0.5rem;
  }
}
</style>
