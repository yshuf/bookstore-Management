<!--
 * @Description:
 * @Author: mobai
 * @Date: 2023-05-06 10:03:00
 * @LastEditors: mobai
 * @LastEditTime: 2023-05-06 10:17:38
 * @FilePath: \bookstore-Management\src\views\mapBuild\components\gaoDe3DPage.vue
-->

<template>
  <div class="mapCenter">
    <div id="mapContent" class="mapContent"></div>
     <div class="map-back" v-if="isCurrentClick" @click="clearCurrentClick">
            <img src="~@/assets/images/datavScreen/back.png" alt />
            <div class="text">（{{currentName}}）返回上级</div>
        </div>
  </div>
</template>

<script>
let districtExplorer = null;
export default {
  name: 'GaoDe3DPage',
  data () {
    return {
      isCurrentClick: false,
      // 地图渲染颜色 颜色由深到浅，表示企业数量由多到少
      colorsList: [
        {
          color: 'rgb(255, 91, 21)',
          colorOpacity: 0.68
        },
        {
          color: 'rgb(255, 147, 21)',
          colorOpacity: 0.7
        },
        {
          color: 'rgb(255, 202, 99, 0.7)',
          colorOpacity: 0.7
        },
        {
          color: 'rgb(255, 233, 153)',
          colorOpacity: 0.5
        },
        {
          color: 'rgb(255, 202, 67)',
          colorOpacity: 0.3
        },
        {
          color: 'rgb(255, 233, 154)',
          colorOpacity: 0.4
        },
        {
          color: 'rgb(255, 202, 67)',
          colorOpacity: 0.1
        },
        {
          color: 'rgb(255, 202, 67)',
          colorOpacity: 0.05
        }
      ],
      currentMapCenter: [108.553939, 35.166611],
      testStyle: { color: '#fff', fontSize: '16px', border: 'none', background: 'transparent', 'pointer-events': 'none' },
      currentLevel: 'province',
      currentName: '陕西省',
      currentCenter: [],
      currentFeature: {}
    };
  },
  mounted () {
    this.initMap();
  },
  methods: {
    resizeMap () {
      // document.getElementById('mapContent').style.width = document.documentElement.clientWidth * 0.5 + 'px';
      // document.getElementById('mapContent').style.height = document.documentElement.clientHeight * 0.8 + 'px';
      // this.mapObj.refreshSize();
      this.mapObj &&
                this.mapObj.setStatus({
                  zoomEnable: true // 是否可缩放地图
                });
      const ratio = document.documentElement.clientWidth / 1920;
      const step = 1920 - document.documentElement.clientWidth;
      // let zoom = 6.7;

      if (ratio < 1) {
        this.zoom = 6.7 - ratio * 0.05 * step * 0.03;
      } else {
        this.zoom = 6.7;
      }
      if (this.currentLevel !== 'province') {
        if (['铜川市'].includes(this.currentName)) {
          this.zoom = this.zoom + 2.5;
        } else if (['咸阳市', '渭南市', '西安市'].includes(this.currentName)) {
          this.zoom = this.zoom + 2;
        } else if (['宝鸡市'].includes(this.currentName)) {
          this.zoom = this.zoom + 1.5;
        } else if (['榆林市'].includes(this.currentName)) {
          this.zoom = this.zoom + 0.6;
        } else {
          this.zoom = this.zoom + 1;
        }
      }
      // console.log('zoom:', this.zoom);
      this.mapObj && this.mapObj.setZoom(this.zoom);
      this.mapObj &&
                this.mapObj.setStatus({
                  zoomEnable: false // 是否可缩放地图
                });
    },
    // 获取地图统计数据
    getMapCountData () {
      return new Promise((resolve, reject) => {
        this.cityList = [
          {
            key: '西安市',
            value: '723178',
            arrays: null,
            extension: null
          },
          {
            key: '铜川市',
            value: '25110',
            arrays: null,
            extension: null
          },
          {
            key: '宝鸡市',
            value: '76736',
            arrays: null,
            extension: null
          },
          {
            key: '咸阳市',
            value: '78466',
            arrays: null,
            extension: null
          },
          {
            key: '渭南市',
            value: '272461',
            arrays: null,
            extension: null
          },
          {
            key: '延安市',
            value: '207169',
            arrays: null,
            extension: null
          },
          {
            key: '汉中市',
            value: '350644',
            arrays: null,
            extension: null
          },
          {
            key: '榆林市',
            value: '317247',
            arrays: null,
            extension: null
          },
          {
            key: '安康市',
            value: '250817',
            arrays: null,
            extension: null
          },
          {
            key: '商洛市',
            value: '115821',
            arrays: null,
            extension: null
          }
        ];
        resolve();
      });
    },
    // 创建信息窗体弹框以及添加标记点位
    showInfoWindowAndMarker (item) {
      if (!item) return;

      this.infoWindow.setContent(
        this.createInfoWindow({
          name: item.name,
          value: item.value
        })
      );
      this.infoWindow.setPosition(item.center);
      // console.log('9999999999:', this.mapObj, item);
      this.infoWindow.open(this.mapObj, item.center);
      this.addMarker(item);
    },
    // 根据Hover状态设置相关样式
    toggleHoverFeature (feature, isHover) {
      if (!feature) {
        return;
      }
      // console.log('当前在' + feature.name + '上');
      var props = feature;
      if (isHover) {
        clearInterval(this.timer);
        this.timer = null;
        const item = this.cityList.filter(v => v.name === props.name)[0];
        // console.log(this.cityList);
        // console.log(item);
        if (this.currentName !== '陕西省' && item) {
          item.name = item.key;
          item.center = this.currentCenter;
        }
        this.showInfoWindowAndMarker(item);
      } else {
        this.timer = setInterval(() => {
          if (this.count <= this.cityList.length - 1) {
            this.showInfoWindowAndMarker(this.cityList[this.count]);
          } else {
            this.count = 0;
            this.showInfoWindowAndMarker(this.cityList[this.count]);
          }
          this.count++;
        }, 2000);
      }
      // 更新相关多边形的样式
      // if (districtExplorer) {
      //     this.resetPolysStyle((props && props.adcode) || Number(this.cityList[this.count].adcode), isHover);
      // }
    },
    createInfoWindow ({ name, value }) {
      // 弹窗内容
      return `<div class="ent_infowindow">
                <div class="name">${name}</div>
                <div class="content">
                    <div class="left-title">主体数量</div>
                    <div class="right-content">
                        <span class="value">${Number(value).toLocaleString()}</span>
                        <span class="unit">户</span>
                    </div>
                </div>
            </div>`;
    },
    // 添加点标记位
    addMarker (props) {
      const resetCenter = this.getRestCityPosition(props);
      this.marker && this.mapObj.remove(this.marker);
      var icon = new AMap.Icon({
        size: new AMap.Size(40, 80), // 图标尺寸
        image: require('../../../assets/images/datavScreen/pointer.png'), // Icon的图像
        imageSize: new AMap.Size(40, 80) // 根据所设置的大小拉伸或压缩图片
      });

      // 点位标记
      this.marker = new AMap.Marker({
        position: resetCenter || props.center,
        icon: icon,
        offset: new AMap.Pixel(-20, -50)
      });

      this.mapObj.add(this.marker);
    },
    mapClick (feature) {
      // console.log('feature:', feature);
      // 后端code数据，与高德返回来的不一致，这里需要使用后端要求code传参
      const { adcode, level, name, center } = feature;
      this.currentFeature = JSON.parse(JSON.stringify(feature));
      this.currentCenter = [center.lng, center.lat];
      clearInterval(this.timer);
      this.timer = null;
      const adcodeMap = {
        610100: '610100000000',
        610300: '610300',
        610400: '610400',
        610200: '610200000000',
        610500: '610500',
        610600: '610600000000',
        610800: '610800',
        610700: '610700',
        610900: '610900',
        611000: '611000'
      };
      this.currentAdcode = adcodeMap[adcode];
      // this.getTopCountData();
      this.isCurrentClick = true;
      this.$emit('updateAdcode', this.currentAdcode);
      const item = this.cityList.filter(d => d.adcode == adcode)[0];
      this.showInfoWindowAndMarker(item);
      // this.resetPolysStyle(adcode, true);
      // 后续下钻，考虑重绘即可
      if (level === 'district') return;
      // 清除已有的绘制内容
      // districtExplorer.clearFeaturePolygons();
      this.polygons.map(item => {
        this.mapObj.remove(item);
      });
      const lnglat = [center.lng, center.lat];
      if (name === '咸阳市') {
        lnglat[0] -= 0.42;
        lnglat[1] += 0.4;
      } else if (name === '西安市') {
        lnglat[0] -= 0.2;
      } else if (name === '渭南市') {
        lnglat[0] += 0.2;
        lnglat[1] += 0.3;
      } else if (name === '铜川市') {
        lnglat[1] += 0.3;
      }
      this.switchMap(level, name, lnglat);
      // this.renderLoadAreaNode(adcode);
    },
    switchMap (level, name, center) {
      this.currentLevel = level;
      this.currentName = name;
      this.currentMapCenter = center;
      /* this.mapObj.destroy();
            this.mapObj = null;
            districtExplorer = null; */
      this.initMap();
    },
    initMap () {
      const district = new AMap.DistrictSearch({
        extensions: 'all',
        subdistrict: 1,
        level: this.currentLevel
      });
      district.search(this.currentName, async (status, result) => {
        var districtList = result.districtList[0].districtList;

        var bounds = result.districtList[0].boundaries;
        var mask = [];
        this.polygons = [];
        for (var i = 0; i < bounds.length; i++) {
          mask.push([bounds[i]]);
          // var polygon = new AMap.Polygon({
          //     strokeWeight: 1,
          //     path: bounds[i],
          //     fillOpacity: 0.4,
          //     fillColor: '#80d8ff',
          //     strokeColor: '#0091ea'
          // });
          // polygons.push(polygon);
        }
        // 添加纹理地图
        var imageLayer = new AMap.ImageLayer({
          url: require('../../../assets/images/datavScreen/texture.png'),
          // 3d模式下，不要轻易改动 bounds 的经纬度值哈，不然你会后悔的，很难调。2d 下通过获取西南方向，和东北方向的经纬度即可
          bounds: new AMap.Bounds([98.909999, 29.178891], [113.899999, 42.1]),
          zIndex: 2
        });

        // 信息窗体
        this.infoWindow = new AMap.InfoWindow({
          isCustom: true,
          offset: new AMap.Pixel(0, -50)
        });
        this.resizeMap();
        // let zoom = null;

        // 地图实例创建
        this.mapObj = new AMap.Map('mapContent', {
          mask: mask, // 遮盖其他区域
          viewMode: '3D', // 默认使用 2D 模式
          zoom: this.zoom, // 初始化地图层级
          zooms: [this.zoom - 1, this.zoom + 1],
          pitch: 15, // 地图俯仰角度，有效范围 0 度- 83 度
          center: this.currentMapCenter, // 初始化地图中心点
          doubleClickZoom: false, // 地图是否可通过双击鼠标放大地图，默认为true
          dragEnable: true, // 地图是否可通过鼠标拖拽平移，默认为true
          zoomEnable: true, // 地图是否可缩放，默认值为true
          rotateEnable: false, // 地图是否可旋转，3D视图默认为true，2D视图默认false
          layers: [imageLayer]
        });
        // this.mapObj.setStatus({
        //     zoomEnable: false // 是否可缩放地图
        // });
        this.mapObj.add(this.polygons);

        // 添加高度面(只有添加了这个，才会有立体的感觉，这里用2.0版本，Object3DLayer会报错，所以改用1.0版本)
        var object3Dlayer = new AMap.Object3DLayer({ zIndex: 1 });
        var height = -450000;
        var color = '#FFFFFF'; // 墙体颜色 rgba   384C4B — 242D2D  56,76,75  36,45,45    0.2,0.3,0.3   0.15,0.18,0.18
        var wall = new AMap.Object3D.Wall({
          path: bounds,
          height: height,
          color: color
        });
        wall.transparent = true;
        object3Dlayer.add(wall);
        this.mapObj.add(object3Dlayer);

        // 添加光照
        var rectangle = new AMap.Object3D.Mesh();
        var geometry = rectangle.geometry; // 创建之后获取geometry

        var lnglat1 = new AMap.LngLat(116.395, 39.9);
        var lnglat2 = new AMap.LngLat(116.4, 39.9);

        var v0xy = this.mapObj.lngLatToGeodeticCoord(lnglat1);
        var v1xy = this.mapObj.lngLatToGeodeticCoord(lnglat2);
        var z = -350000; // 3D地图Z方向朝下，所以负值

        geometry.vertices.push(v0xy.x, v0xy.y, 0); // V0
        geometry.vertices.push(v1xy.x, v1xy.y, 0); // V1

        geometry.vertices.push(v0xy.x, v0xy.y, z); // V2
        geometry.vertices.push(v1xy.x, v1xy.y, z); // V3

        // geometry.vertices.push(v0xy.x, v0xy.y, -6000); //V4
        // geometry.vertices.push(v1xy.x, v1xy.y, -6000); //V5

        geometry.faces.push(1, 0, 2, 2, 1, 3, 3, 2, 4, 4, 3, 5);

        // 颜色填充
        geometry.vertexColors.push(
          0.2,
          0.3,
          0.3,
          1,
          0.2,
          0.3,
          0.3,
          0.8,
          0.2,
          0.3,
          0.3,
          0.6,
          0.2,
          0.4,
          1,
          0.4,
          0.15,
          0.18,
          0.18,
          0.2,
          0.15,
          0.18,
          0.18,
          0
        );
        rectangle.transparent = true;
        rectangle.backOrFront = 'both';
        object3Dlayer.add(rectangle);

        // 修改当前光照
        this.mapObj.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.5);
        this.mapObj.DirectionLight = new AMap.Lights.DirectionLight([0, 2, -14], [1, 1, 1], 0.5);

        // 行政区域预览;
        AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer => {
          districtExplorer = new DistrictExplorer({
            map: this.mapObj,
            eventSupport: true
          });
          if (this.currentLevel === 'province') {
            // 事件添加
            // this.addEvent();
            // 韩城、杨凌 单独处理
            this.setSpecialCity('韩城市', [110.24243, 35.47669]);
            this.setSpecialCity('杨凌', [108.08455, 34.27221]);
          }
          // 区域浏览
          // this.renderLoadAreaNode(this.areaCode);
        });
        // 描边
        this.getPolyline(bounds);
        await this.getMapCountData();

        districtList.map((city, i) => {
          // 数据处理
          this.cityList.map((v, index) => {
            if (city.name === v.key) {
              this.$set(this.cityList, index, {
                ...v,
                name: v.key,
                adcode: city.adcode,
                center: city.center && [city.center.lng, city.center.lat]
              });
            }
          });
        });

        for (let index = 0; index < districtList.length; index++) {
          // console.log(districtList[index].name);
          district.search(districtList[index].adcode, (status, result) => {
            if (status === 'complete') {
              this.polygons = [];
              const name = result.districtList[0].name;
              const position = result.districtList[0].center;
              const bounds = result.districtList[0].boundaries;
              if (this.currentName === '陕西省') {
                this.setSpecialCity(name, this.getRestCityPosition(result.districtList[0]) || position);
              } else {
                const center = JSON.parse(JSON.stringify(this.currentCenter));
                // debugger;
                if (this.currentName === '渭南市') {
                  center[0] += 0.4;
                  center[1] += 0.4;
                } else if (this.currentName === '咸阳市') {
                  center[0] -= 0.2;
                  center[1] += 0.4;
                }
                this.setSpecialCity(this.currentName, center);
              }

              if (bounds) {
                for (let i = 0, l = bounds.length; i < l; i++) {
                  const j = this.cityList.findIndex(item => item.name == name);
                  var fillColor = this.colorsList[j] ? this.colorsList[j].color : '';
                  var fillOpacity = this.colorsList[j] ? this.colorsList[j].colorOpacity : '';

                  const polygon = new AMap.Polygon({
                    map: this.mapObj,
                    strokeColor: '#fff',
                    strokeStyle: 'solid',
                    strokeOpacity: 0.5, // 线透明度
                    strokeWeight: 0.5, // 线宽
                    fillColor: fillColor,
                    fillOpacity: fillOpacity,
                    path: bounds[i]
                  });
                  polygon.name = name;
                  if (this.currentLevel === 'province') {
                    polygon.on('mouseover', e => {
                      this.toggleHoverFeature(result.districtList[0], true);
                    });

                    polygon.on('click', e => {
                      this.mapClick(result.districtList[0]);
                    });
                  } else {
                    // 下钻显示窗体
                    // polygon.on('mouseover', e => {
                    //     // if (infoWindow.getIsOpen()) return
                    //     this.showInfoWindowAndMarker({
                    //         name: this.currentName,
                    //         value: this.cityList.find(v => (v.name || v.key) === this.currentName).value,
                    //         center: this.currentCenter
                    //     });
                    // });
                  }
                  polygon.on('mouseout', e => {
                    this.marker && this.mapObj.remove(this.marker);
                    if (this.infoWindow) {
                      this.infoWindow.close();
                    }
                  });

                  this.polygons.push(polygon);
                }
              }
            }
          });
        }

        // 默认从数据返回第一项开始轮播
        // this.toggleHoverFeature(this.cityList[0], false);
      });
    },
    // 特殊城市位置处理
    setSpecialCity (name, center) {
      // debugger;
      const cityText = new AMap.Text({
        text: name,
        bubble: true,
        anchor: 'center', // 设置文本标记锚点
        position: center,
        offset: new AMap.Pixel(-10, 10)
      });
      cityText.setStyle(this.testStyle);
      cityText.setMap(this.mapObj);
    },
    // 添加外围描边
    getPolyline (bounds) {
      for (var i = 0; i < bounds.length; i++) {
        new AMap.Polyline({
          path: bounds[i],
          isOutline: true,
          outlineColor: '#CAECF9',
          borderWeight: 4,
          strokeColor: '#63FFFF',
          strokeWeight: 2,
          strokeOpacity: 1,
          map: this.mapObj
        });
      }
    },
    // 对个别城市中心点位置进行调整
    getRestCityPosition (city) {
      return city.name === '西安市'
        ? [109.199999, 34.243207]
        : city.name === '渭南市'
          ? [109.890962, 34.820632]
          : city.name === '咸阳市'
            ? [108.708837, 34.829896]
            : city.name === '铜川市'
              ? [109.215116, 35.297133]
              : null;
    },
    clearCurrentClick () {
      this.isCurrentClick = false;
      this.currentAdcode = '';
      // this.toggleHoverFeature(this.cityList[this.count], false);
      // this.getTopCountData();
      this.$emit('updateAdcode', this.currentAdcode);
      this.switchMap('province', '陕西省', [108.553939, 35.166611]);
    }
  }
};
</script>

<style lang="less" scoped>
.mapCenter {
  width: 100%;
  height: 100%;
      background-color: #09141d;
      .mapContent {
        width: 100%;
        height: 100%;
    }
    .mapContent {
    // 设置地图背景透明
    background-color: transparent !important;
    background-image: none;
    z-index: 1;
    /deep/.amap-logo,
    /deep/.amap-copyright {
        opacity: 0;
    }
    /deep/ .amap-marker {
        pointer-events: none;
    }
    /deep/.ent_infowindow {
        width: 340px;
        height: 97px;
        box-sizing: border-box;
        padding: 24px 30px;
        background: linear-gradient(255.73deg, rgba(0, 53, 92, 0.69) 3.52%, rgba(1, 78, 134, 0.78) 52.37%, rgba(0, 119, 76, 0.73) 102.84%);
        box-shadow: 0px 6px 5px rgba(0, 0, 0, 0.48);
        color: white;
        font-size: 16px;
        div:nth-child(2) {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .name {
            margin-bottom: 16px;
        }
        .left-title {
            font-weight: 600;
            font-size: 16px;
        }
        .value {
            font-weight: 700;
            font-size: 24px;
            letter-spacing: 1px;
            color: #00ffbc;
            background-image: linear-gradient(to right, #ff7d05, #ffd422);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-right: 6px;
        }
        .unit {
            font-size: 14px;
            font-weight: 600;
        }
    }
}
.map-back {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    right: 10%;
    cursor: pointer;
    z-index: 2;
    // width: 100px;
    height: 38px;
    padding: 0 10px;
    background: rgba(6, 17, 48, 0.3);
    border-radius: 2px;
    &:hover {
        box-shadow: 0 0 3px rgba(255, 255, 255, 0.18);
    }

    img {
        width: 16px;
        height: 16px;
        display: inline-block;
        margin-right: 4px;
    }
    .text {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: white;
    }
}
}

</style>
