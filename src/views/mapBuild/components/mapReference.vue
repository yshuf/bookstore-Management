<template>
  <div class="map-container">
    <div class="top-title">区域风险信号热力图</div>
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
  mapInit,
  getZheJBounds,
  rendPolygon,
  renderPolyline,
  regionLevel
} from '@assets/amap/amap';
import { getCityRiskInfo } from '@api/controller/riskWarning/riskBoard';

export default {
  name: 'MAPContainer',
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
      cityRiskCountList: [],
      colors: {}, // 区域颜色
      infoWindow: null
    };
  },
  mounted () {
    this.map = mapInit('mapBox', {
      zoom: 7.8,
      center: [119.412427 + 1.0, 29.303573 - 0.9],
      pitch: 45
    });
    this.getCityRiskData();
    this.initMapBounds({ name: '浙江省' });
  },
  methods: {
    // 初始化地图
    initMapBounds (para, fn) {
      this.curProvince = para.name;
      getZheJBounds(para).then((res) => {
        // 显示区域级别
        this.currentLevel = this.regionLevel[this.setRegionLevel];
        // 避难边界
        const originalBounds = res.boundaries;
        const adCode = res.districtList.map((item) => item.adcode);
        // 根据省获取地区
        const citys = res.districtList.map((item) => item.name);
        const bounds = originalBounds.filter((v) => v.length > 300);
        const opts = {
          level: 'city',
          subdistrict: 1
        };

        rendPolygon({
          citys: citys, // this.citys,
          opts,
          usePolyline: true,
          polygonOpts: {
            fillColor: 'rgba(195,241,255,0.86)',
            strokeOpacity: 0.5,
            strokeColor: '#11E7F9'
          },
          mapClearFlag: true
        }).then((res) => {
          fn && fn();
        });

        if (bounds) {
          renderPolyline(bounds, {
            strokeColor: 'rgba(162,232,255,0.5)',
            strokeWeight: 1
          });
        }

        this.map.add(
          res.districtList.map((city, i) => {
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
        const that = this;
        AMap.plugin('AMap.DistrictSearch', () => {
          const district = new AMap.DistrictSearch({
            subdistrict: 1, // 不返回下一级行政区 0：不返回下级行政区 1：返回下一级行政区 2：返回下两级行政区 3：返回下三级行政区
            extensions: 'all', // 返回行政区边界坐标组等具体信息
            level: 'city' // 查询行政级别
          });

          for (let index = 0; index < adCode.length; index++) {
            district.search(adCode[index], (status, result) => {
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
    },
    // 获取区域风险情况
    getCityRiskData () {
      getCityRiskInfo().then((res) => {
        const { code, data, msg } = res;
        if (code === '0000') {
          this.cityRiskCountList = data.sort(this.compare('count'));
        } else {
          this.$message.error(msg);
        }
      });
    },
    compare (property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
      };
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
    padding: 15px 20px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
  }
  .map-bottom {
    padding: 20px;
    box-sizing: border-box;
    height: calc(100% - 47px);
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
        left: 0%;
        margin-left: -0.12rem;
        border-color: transparent #ffffff transparent transparent;
        border-style: solid;
        border-width: 0.03rem 0.05rem;
      }
    }
    .more {
      top: -5%;
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
    bottom: -0.15rem;
    margin-left: -0.09rem;
    border-color: rgba(23, 42, 62, 0.57) transparent transparent transparent;
    border-style: solid;
    border-width: 0.08rem 0.05rem;
  }
}
</style>
