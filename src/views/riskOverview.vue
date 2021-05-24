<template>
  <div id="riskOverview">
    <!-- 风险概览 --><div id="mapContainer"></div>
    <!-- <div :id="id" style="width:100%" /> -->
  </div>
</template>

<script>
export default {
  name: 'Overview',
  data () {
    return {
      key: '',
      map: null,
      activeMarker: null,
      detail: {},
      entList: [
        {
          id: null,
          userId: null,
          entName: '杭州有数金融信息服务有限公司',
          gsName: null,
          eid: 'qd941681b0697ea04382cdd92c1ec0467',
          creditCode: null,
          frName: null,
          idType: null,
          idNumber: null,
          mobile: null,
          agentName: null,
          agentId: null,
          agentMobile: null,
          agentPosition: null,
          status: null,
          authIdentity: null,
          authType: null,
          failTimes: null,
          failReason: null,
          industryCode: null,
          industryName: null,
          dictAreaId: 2,
          dictTownId: null,
          dictCommitteeId: null,
          sourcePort: null,
          recommendInst: null,
          recommendPerson: null,
          esDate: null,
          address: null,
          lngGd: '122.32355900',
          latGd: '29.97060100',
          createTime: null,
          changeTime: null,
          riskCount: null,
          monitorTime: null,
          riskScore: null,
          institutionId: null,
          branchId: null,
          areaId: null
        },
        {
          id: null,
          userId: null,
          entName: '杭州有好数据科技有限公司北京分公司',
          gsName: null,
          eid: 'qbfc4ec4f0394a3f015d56ec720f9e2a1',
          creditCode: null,
          frName: null,
          idType: null,
          idNumber: null,
          mobile: null,
          agentName: null,
          agentId: null,
          agentMobile: null,
          agentPosition: null,
          status: null,
          authIdentity: null,
          authType: null,
          failTimes: null,
          failReason: null,
          industryCode: null,
          industryName: null,
          dictAreaId: 1,
          dictTownId: null,
          dictCommitteeId: null,
          sourcePort: null,
          recommendInst: null,
          recommendPerson: null,
          esDate: null,
          address: '北京市海淀区大钟寺13号院1号楼地下一层A03-96',
          lngGd: '122.10684400',
          latGd: '30.01979500',
          createTime: null,
          changeTime: null,
          riskCount: null,
          monitorTime: null,
          riskScore: null,
          institutionId: null,
          branchId: null,
          areaId: null
        },
        {
          id: null,
          userId: null,
          entName: '浙江海昊建设有限公司',
          gsName: null,
          eid: 'q2847f3d0d38e8e437871ac2cce75075c',
          creditCode: null,
          frName: null,
          idType: null,
          idNumber: null,
          mobile: null,
          agentName: null,
          agentId: null,
          agentMobile: null,
          agentPosition: null,
          status: null,
          authIdentity: null,
          authType: null,
          failTimes: null,
          failReason: null,
          industryCode: null,
          industryName: null,
          dictAreaId: 1,
          dictTownId: null,
          dictCommitteeId: null,
          sourcePort: null,
          recommendInst: null,
          recommendPerson: null,
          esDate: null,
          address: '中国（浙江）自由贸易试验区舟山市普陀区东港街道麒麟街215号701室',
          lngGd: '122.32239000',
          latGd: '29.97431900',
          createTime: null,
          changeTime: null,
          riskCount: null,
          monitorTime: null,
          riskScore: null,
          institutionId: null,
          branchId: null,
          areaId: null
        },
        {
          id: null,
          userId: null,
          entName: '浙江有数数字科技有限公司',
          gsName: null,
          eid: 'qafcd8e49bc26b5aee89827339d219cc8',
          creditCode: null,
          frName: null,
          idType: null,
          idNumber: null,
          mobile: null,
          agentName: null,
          agentId: null,
          agentMobile: null,
          agentPosition: null,
          status: null,
          authIdentity: null,
          authType: null,
          failTimes: null,
          failReason: null,
          industryCode: null,
          industryName: null,
          dictAreaId: 2,
          dictTownId: null,
          dictCommitteeId: null,
          sourcePort: null,
          recommendInst: null,
          recommendPerson: null,
          esDate: null,
          address: '杭州市江干区九环路九号4号楼4楼436室',
          lngGd: '122.32355900',
          latGd: '29.97060100',
          createTime: null,
          changeTime: null,
          riskCount: null,
          monitorTime: null,
          riskScore: null,
          institutionId: null,
          branchId: null,
          areaId: null
        },
        {
          id: null,
          userId: null,
          entName: '浙江慧仁电子有限公司',
          gsName: null,
          eid: 'q8be5d0b8f778762847cca213c8eb6529',
          creditCode: null,
          frName: null,
          idType: null,
          idNumber: null,
          mobile: null,
          agentName: null,
          agentId: null,
          agentMobile: null,
          agentPosition: null,
          status: null,
          authIdentity: null,
          authType: null,
          failTimes: null,
          failReason: null,
          industryCode: null,
          industryName: null,
          dictAreaId: 2,
          dictTownId: null,
          dictCommitteeId: null,
          sourcePort: null,
          recommendInst: null,
          recommendPerson: null,
          esDate: null,
          address: '浙江省湖州市港南路1818号4幢',
          lngGd: '121.85539800',
          latGd: '30.06200100',
          createTime: null,
          changeTime: null,
          riskCount: null,
          monitorTime: null,
          riskScore: null,
          institutionId: null,
          branchId: null,
          areaId: null
        },
        {
          id: null,
          userId: null,
          entName: '有数科技（北京）有限公司',
          gsName: null,
          eid: 'q95611ddd86aab9246532203c7a8028fc',
          creditCode: null,
          frName: null,
          idType: null,
          idNumber: null,
          mobile: null,
          agentName: null,
          agentId: null,
          agentMobile: null,
          agentPosition: null,
          status: null,
          authIdentity: null,
          authType: null,
          failTimes: null,
          failReason: null,
          industryCode: null,
          industryName: null,
          dictAreaId: 2,
          dictTownId: null,
          dictCommitteeId: null,
          sourcePort: null,
          recommendInst: null,
          recommendPerson: null,
          esDate: null,
          address: '北京市石景山区实兴东街11号2层2409室',
          lngGd: '122.32355900',
          latGd: '29.97060100',
          createTime: null,
          changeTime: null,
          riskCount: null,
          monitorTime: null,
          riskScore: null,
          institutionId: null,
          branchId: null,
          areaId: null
        },
        {
          id: null,
          userId: null,
          entName: '舟山鲁益石化有限公司',
          gsName: null,
          eid: 'q7632a96b47c34d079eba0eb0d57ee47e',
          creditCode: null,
          frName: null,
          idType: null,
          idNumber: null,
          mobile: null,
          agentName: null,
          agentId: null,
          agentMobile: null,
          agentPosition: null,
          status: null,
          authIdentity: null,
          authType: null,
          failTimes: null,
          failReason: null,
          industryCode: null,
          industryName: null,
          dictAreaId: 1,
          dictTownId: null,
          dictCommitteeId: null,
          sourcePort: null,
          recommendInst: null,
          recommendPerson: null,
          esDate: null,
          address: '中国（浙江）自由贸易试验区舟山市定海区舟山港综合保税区企业服务中心301-13450室',
          lngGd: '122.19589000',
          latGd: '30.08044400',
          createTime: null,
          changeTime: null,
          riskCount: null,
          monitorTime: null,
          riskScore: null,
          institutionId: null,
          branchId: null,
          areaId: null
        },
        {
          id: null,
          userId: null,
          entName: '舟山市定海巨星体育用品有限公司',
          gsName: null,
          eid: 'q1bbcbcebbe3fa9e318f1c4249664edea',
          creditCode: null,
          frName: null,
          idType: null,
          idNumber: null,
          mobile: null,
          agentName: null,
          agentId: null,
          agentMobile: null,
          agentPosition: null,
          status: null,
          authIdentity: null,
          authType: null,
          failTimes: null,
          failReason: null,
          industryCode: null,
          industryName: null,
          dictAreaId: 1,
          dictTownId: null,
          dictCommitteeId: null,
          sourcePort: null,
          recommendInst: null,
          recommendPerson: null,
          esDate: null,
          address: '浙江省舟山市定海区解放西路42号2楼',
          lngGd: '122.10587300',
          latGd: '30.01539100',
          createTime: null,
          changeTime: null,
          riskCount: null,
          monitorTime: null,
          riskScore: null,
          institutionId: null,
          branchId: null,
          areaId: null
        },
        {
          id: null,
          userId: null,
          entName: '浙江欣亚磁电发展有限公司',
          gsName: null,
          eid: 'q478db4c98dad301c59a424e792954e1d',
          creditCode: null,
          frName: null,
          idType: null,
          idNumber: null,
          mobile: null,
          agentName: null,
          agentId: null,
          agentMobile: null,
          agentPosition: null,
          status: null,
          authIdentity: null,
          authType: null,
          failTimes: null,
          failReason: null,
          industryCode: null,
          industryName: null,
          dictAreaId: 2,
          dictTownId: null,
          dictCommitteeId: null,
          sourcePort: null,
          recommendInst: null,
          recommendPerson: null,
          esDate: null,
          address: '舟山市普陀区朱家尖街道欣远路2号',
          lngGd: '122.35286200',
          latGd: '29.92100700',
          createTime: null,
          changeTime: null,
          riskCount: null,
          monitorTime: null,
          riskScore: null,
          institutionId: null,
          branchId: null,
          areaId: null
        },
        {
          id: null,
          userId: null,
          entName: '浙江斯科能科技股份有限公司',
          gsName: null,
          eid: 'qfe890bfb004bfe27e7f57e93fd6d3928',
          creditCode: null,
          frName: null,
          idType: null,
          idNumber: null,
          mobile: null,
          agentName: null,
          agentId: null,
          agentMobile: null,
          agentPosition: null,
          status: null,
          authIdentity: null,
          authType: null,
          failTimes: null,
          failReason: null,
          industryCode: null,
          industryName: null,
          dictAreaId: 1,
          dictTownId: null,
          dictCommitteeId: null,
          sourcePort: null,
          recommendInst: null,
          recommendPerson: null,
          esDate: null,
          address: '浙江省湖州市南太湖大道2585号',
          lngGd: '120.15279100',
          latGd: '30.26744600',
          createTime: null,
          changeTime: null,
          riskCount: null,
          monitorTime: null,
          riskScore: null,
          institutionId: null,
          branchId: null,
          areaId: null
        },
        {
          id: null,
          userId: null,
          entName: '舟山有容网络科技有限公司',
          gsName: null,
          eid: 'qefb9acd3e4c5490d8716bac65ce209aa',
          creditCode: null,
          frName: null,
          idType: null,
          idNumber: null,
          mobile: null,
          agentName: null,
          agentId: null,
          agentMobile: null,
          agentPosition: null,
          status: null,
          authIdentity: null,
          authType: null,
          failTimes: null,
          failReason: null,
          industryCode: null,
          industryName: null,
          dictAreaId: 1,
          dictTownId: null,
          dictCommitteeId: null,
          sourcePort: null,
          recommendInst: null,
          recommendPerson: null,
          esDate: null,
          address: '中国（浙江）自由贸易试验区舟山市定海区舟山港综合保税区企业服务中心303-8884室',
          lngGd: '122.19589000',
          latGd: '30.08044400',
          createTime: null,
          changeTime: null,
          riskCount: null,
          monitorTime: null,
          riskScore: null,
          institutionId: null,
          branchId: null,
          areaId: null
        },
        {
          id: null,
          userId: null,
          entName: '湖州震远同食品销售有限公司',
          gsName: null,
          eid: 'qf79cbf7d7ff107cd252147a47d877369',
          creditCode: null,
          frName: null,
          idType: null,
          idNumber: null,
          mobile: null,
          agentName: null,
          agentId: null,
          agentMobile: null,
          agentPosition: null,
          status: null,
          authIdentity: null,
          authType: null,
          failTimes: null,
          failReason: null,
          industryCode: null,
          industryName: null,
          dictAreaId: 1,
          dictTownId: null,
          dictCommitteeId: null,
          sourcePort: null,
          recommendInst: null,
          recommendPerson: null,
          esDate: null,
          address: '浙江省湖州市经济开发区梦溪路188号1号楼',
          lngGd: '120.15279100',
          latGd: '30.26744600',
          createTime: null,
          changeTime: null,
          riskCount: null,
          monitorTime: null,
          riskScore: null,
          institutionId: null,
          branchId: null,
          areaId: null
        },
        {
          id: null,
          userId: null,
          entName: '浙江政务网蒋利强测试用企业',
          gsName: null,
          eid: 'qdb667f77d6c80a503827de8f302bcfb1',
          creditCode: null,
          frName: null,
          idType: null,
          idNumber: null,
          mobile: null,
          agentName: null,
          agentId: null,
          agentMobile: null,
          agentPosition: null,
          status: null,
          authIdentity: null,
          authType: null,
          failTimes: null,
          failReason: null,
          industryCode: null,
          industryName: null,
          dictAreaId: 1,
          dictTownId: null,
          dictCommitteeId: null,
          sourcePort: null,
          recommendInst: null,
          recommendPerson: null,
          esDate: null,
          address: '浙江省湖州市南浔镇浔练公路3998号',
          lngGd: '120.15279100',
          latGd: '30.26744600',
          createTime: null,
          changeTime: null,
          riskCount: null,
          monitorTime: null,
          riskScore: null,
          institutionId: null,
          branchId: null,
          areaId: null
        },
        {
          id: null,
          userId: null,
          entName: '小米科技有限责任公司',
          gsName: null,
          eid: 'q20a22b453196756629588f0d6df2df98',
          creditCode: null,
          frName: null,
          idType: null,
          idNumber: null,
          mobile: null,
          agentName: null,
          agentId: null,
          agentMobile: null,
          agentPosition: null,
          status: null,
          authIdentity: null,
          authType: null,
          failTimes: null,
          failReason: null,
          industryCode: null,
          industryName: null,
          dictAreaId: 1,
          dictTownId: null,
          dictCommitteeId: null,
          sourcePort: null,
          recommendInst: null,
          recommendPerson: null,
          esDate: null,
          address: '虚假的测试地址',
          lngGd: '122.20739500',
          latGd: '29.98557800',
          createTime: null,
          changeTime: null,
          riskCount: null,
          monitorTime: null,
          riskScore: null,
          institutionId: null,
          branchId: null,
          areaId: null
        }] // 所有企业信息
    }
  },
  created () {},
  mounted () {
    this.creditMap() // 地图初始化
    if (this.entList) {
      console.log('有进来吗，不知道啊')
      this.addScatterPlot()
    }
  },
  methods: {
    // 地图初始化
    creditMap () {
      const that = this
      const center = [122.119751, 30.009931] // 中心点坐标
      that.map = new AMap.Map('mapContainer', {
        center,
        mapStyle: 'amap://styles/b2d2548abb9f324a52263f6d05b9c5d0', // 设置地图的显示样样式
        zoom: 10, // 级别
        showIndoorMap: false, // 是否在有矢量底图的时候自动展示室内地图,PC端默认是true，移动端默认是false
        resizeEnable: true, // 是否监控地图容器尺寸变化，默认值为false
        dragEnable: true, // 地图是否可通过鼠标拖拽平移，默认为true。
        keyboardEnable: false, // 地图是否可通过键盘控制,默认为true
        doubleClickZoom: true, // 地图是否可通过双击鼠标放大地图
        zoomEnable: true, // 地图是否可缩放，默认值为true
        rotateEnable: false, // 地图是否可旋转，3D视图默认为true，2D视图默认false
        pitch: 30, // 地图俯仰角度，有效范围 0 度- 83 度
        viewMode: '3D' // 地图模式
      })
      that.map.setDefaultCursor('default')

      // let mapName = ['定海区', '普陀区', '岱山县', '嵊泗县'];
      const adcode = ['330902', '330903', '330921', '330922']

      /*
             * let fillColor = ['#02FBFC', '#FFEE72', '#1563EF', '#FCB750'];
             *
             * var centerlnglat = [
             * 	[122.108496, 30.016423],
             * 	[122.301953, 29.945614],
             * 	[122.201132, 30.242865],
             * 	[122.457809, 30.727166]
             * ];
             * 行政区查询服务，提供了根据名称关键字、citycode、adcode 来查询行政区信息的功能
             */
      AMap.plugin('AMap.DistrictSearch', () => {
        const district = new AMap.DistrictSearch({
          subdistrict: 2, // 不返回下一级行政区 0：不返回下级行政区 1：返回下一级行政区 2：返回下两级行政区 3：返回下三级行政区
          extensions: 'all', // 返回行政区边界坐标组等具体信息
          level: 'district' // 查询行政级别
        })

        for (let index = 0; index < adcode.length; index++) {
          district.search(adcode[index], (status, result) => {
            if (status == 'complete') {
              const bounds = result.districtList[0].boundaries
              if (bounds) {
                for (let i = 0, l = bounds.length; i < l; i++) {
                  const polygon = new AMap.Polygon({
                    map: that.map,
                    strokeWeight: 0,
                    strokeColor: '#72F6FA',
                    strokeStyle: 'solid',
                    fillColor: '#72F6FA',
                    fillOpacity: 0.3,
                    path: bounds[i]
                  })
                }
              }
            }
          })
        }
      })
    },
    // 海量散点标记
    addScatterPlot () {
      const that = this
      that.entList.forEach((item, index) => {
        item.lnglat = [item.lngGd, item.latGd]
      })
      // 创建一个 Marker 实例：
      const massMarks = new AMap.MassMarks(that.entList, {
        zIndex: 999,
        cursor: 'pointer',
        // zooms: [3, 19],
        style: {

          /* radius: 3, // 半径
          strokeColor: '#FFCCB9', // 边框线条颜色
          fillColor: '#FF6B34' // 填充颜色 */

          url: '//vdata.amap.com/icons/b18/1/2.png', // 图标地址
          size: new AMap.Size(9, 9), // 图标大小
          anchor: new AMap.Pixel(5, 5) // 图标显示位置偏移量，基准点为图标左上角

          /* url: '../assets/images/circle.png', */
        }
      })

      /* // 为标记点添加点击事件
      function clickHandler (e) {
        that.isShowCount = true
        if (that.activeMarker) {
          that.map.remove(that.activeMarker)
        }
        that.entList.map(entItem => {
          if (entItem.lngGd == e.data.lnglat.lng && entItem.latGd == e.data.lnglat.lat) {
            that.addMarker(entItem)
          }
        })
      } */
      // massMarks.on('click', clickHandler)

      // 将 massMarks 添加到地图实例
      massMarks.setMap(that.map)
    }
  }
}
</script>

<style lang="less" scoped>
#riskOverview,
#mapContainer {
  position: relative;
  width: 100%;
  height: 100%;
  -moz-transform: none;
  -webkit-transform: none;
  -o-transform: none;
  -ms-transform: none;
  transform: none;
  min-width: 1500px;
  min-height: 820px;
}
</style>
