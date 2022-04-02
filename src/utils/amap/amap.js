import { zhejiang } from './lngLat/amap.zhejiang';
import { zhoushan } from './lngLat/amap.zhoushan';
import { jiaxing } from './lngLat/amap.jiaxing';
import { ningbo } from './lngLat/amap.ningbo';
import { taizhou } from './lngLat/amap.taizhou';
import { wenzhou } from './lngLat/amap.wenzhou';
import { lishui } from './lngLat/amap.lishui';
import { hangzhou } from './lngLat/amap.hangzhou';
import { shaoxing } from './lngLat/amap.shaoxing';
import { huzhou } from './lngLat/amap.huzhou';
import { jinhua } from './lngLat/amap.jinhua';
import { quzhou } from './lngLat/amap.quzhou';
const mapper = {
  浙江省: zhejiang,
  舟山市: zhoushan,
  嘉兴市: jiaxing,
  宁波市: ningbo,
  台州市: taizhou,
  温州市: wenzhou,
  丽水市: lishui,
  杭州市: hangzhou,
  绍兴市: shaoxing,
  湖州市: huzhou,
  金华市: jinhua,
  衢州市: quzhou
};
const processMapper = {};
const district = new AMap.DistrictSearch({
  level: 'province',
  showbiz: false,
  extensions: 'all',
  subdistrict: 3
});
export const regionLevel = ['district', 'city', 'province'];
let map = {};
// 初始化背景地图
export const mapInit = (id = 'index-overView', opts = {}) => {
  map = new AMap.Map(id, Object.assign(
    {
      mapStyle: 'amap://styles/f147564119361754e6372bfbef57548a',
      zoom: 8,
      center: [119.412427 + 0.8, 29.303573 + 0.2],
      pitch: 50,
      viewMode: '3D',
      features: ['bg', 'road', 'point']
    },
    opts
  ));
  return map;
};

function createLngLat (polyline) {
  let result = [];
  const arr = polyline.split('|').filter(v => v.length);
  const arr1 = arr.map(v => {
    return v.split(';').map(v1 => v1.split(',').map(v2 => v2 - 0));
  });
  result = arr1.filter(v => v.length > 300);

  return result;
}

function createAMapResponse (areaName) {
  // let {adcode,center,districts,name,level,polyline} = mapper[areaName].districts[0];

  //  let temp = {
  //     districtList:[{
  //         adcode:adcode,
  //         center:center.split(",").map(v=>(v-0)),
  //         districtList:districts,
  //         boundaries:createLngLat(polyline),
  //         name:name,
  //         level:level
  //     }]
  // }
  const districts = mapper[areaName].districts;
  const temp = {
    districtList: processLngLat(districts)
  };
  processMapper[areaName] = temp;
  return processMapper[areaName];
}

function processLngLat (districts) {
  return districts.map(v => {
    return {
      adcode: v.adcode,
      center: v.center.split(',').map(v => v - 0),
      districtList: processLngLat(v.districts),
      boundaries: v.polyline ? createLngLat(v.polyline) : [],
      name: v.name,
      level: v.level
    };
  });
}
export const getBounds = ({ searchName, opts }) => {
  if (opts) {
    opts.level && district.setLevel(opts.level);
    opts.subdistrict && district.setSubdistrict(opts.subdistrict);
  }

  return new Promise((resolve, reject) => {
    if (processMapper[searchName]) {
      resolve(processMapper[searchName]);
    } else if (mapper[searchName]) {
      resolve(createAMapResponse(searchName));
    } else {
      district.search(searchName, function (status, result) {
        if (status == 'complete') {
          resolve(result);
        } else {
          reject(result);
        }
      });
    }
  });
};
let zhejiangInfo = {};
async function initZhejInfo (para) {
  const rtn = await getBounds({
    searchName: para.name || '浙江省',
    level: 'province'
  }).then(res => res.districtList[0]);
  return rtn;
}
// 获取浙江边界以及下属行政信息
export const getZheJBounds = para => {
  if (Object.keys(zhejiangInfo).length === 0) {
    zhejiangInfo = initZhejInfo(para);
  }

  return zhejiangInfo;
};
// 渲染城市名
// 渲染边界线
export const renderPolyline = (
  bounds,
  { strokeColor, strokeWeight } = {
    strokeColor: '#FFFEC43B',
    strokeWeight: 4
  }
) => {
  if (!bounds || (bounds && bounds.length == 0)) {
    return;
  }
  const arr = [];
  for (var i = 0, l = bounds.length; i < l; i++) {
    const p = new AMap.Polyline({
      path: bounds[i]
    });
    arr.push(p);
  }
  var overlayGroup = new AMap.OverlayGroup(arr);
  overlayGroup.setOptions({
    strokeColor: strokeColor,
    strokeWeight: strokeWeight
  });
  map.add(overlayGroup);
  // 添加高度面
  // var object3Dlayer = new AMap.Object3DLayer({zIndex:1});
  // map.add(object3Dlayer)
  // var height = -20000;
  // var color = '#89FFFBff';//rgba
  // var wall = new AMap.Object3D.Wall({
  //     path:bounds,
  //     height:height,
  //     color:color
  // });
  // wall.transparent = true
  // object3Dlayer.add(wall)
};

/**
 * 渲染行政覆盖物
 * citys 城市名称数组：[]
 * opts
 * usePolyline : 是否使用边界线，默认true
 * polyLineOpts : 边界线配置项
 * polygonOpts : 覆盖物配置项
 * mapClearFlag:是否清空所有覆盖物标志，默认为空清空所有
 *  */
export const rendPolygon = (
  {
    citys,
    opts,
    usePolyline = true,
    polyLineOpts = {},
    polygonOpts = {},
    mapClearFlag = true
  } = {
    citys,
    opts,
    usePolyline,
    polyLineOpts,
    polygonOpts
  }
) => {
  // map.remove(preClearPolygons);
  // map.remove(preClearpolylines);
  // map.remove(removeMarker)
  // preClearPolygons = [];
  // preClearpolylines = [];
  if (mapClearFlag) {
    map.clearMap();
  }

  const polygons = [];
  return Promise.all(
    citys.map(v => {
      // 获取边界线经纬度
      return getBounds({
        searchName: v,
        opts
      });
    })
  )
    .then(res => {
      // 过滤边界线经纬度
      return res.map(v => {
        return filterBounds(v);
      });
    })
    .then(res => {
      // 绘制polygon和polyline

      res.map(({ bounds, name, adcode }) => {
        const v = bounds;
        for (let i = 0, l = v.length; i < l; i++) {
          const opts = {
            strokeWeight: 1,
            path: v[i],
            fillOpacity: 0.2,
            // fillColor: '#33FFFA',
            // strokeColor: '#FFFEC43B',
            // strokeOpacity: 0.3
            fillColor: 'rgba(195,241,255,86)',
            strokeOpacity: 0.5
          };
          Object.assign(opts, polygonOpts);
          opts.strokeOpacity = usePolyline ? 0.3 : 0;
          opts.extData = {
            areaName: name,
            adcode: adcode,
            ...opts.extData
          };
          // 生成行政区划polygon
          const polygon = new AMap.Polygon(opts);
          polygons.push(polygon);
        }
      });
      map.add(polygons);
      return polygons;
    });
};

const filterCode = ['330903', '330205', '330106']; // 普陀区 江北区 西湖区
export const filterBounds = res => {
  let districtList = null;
  const filterLen = 300;
  if (res.districtList.length > 1) {
    districtList = res.districtList.filter(
      v => filterCode.indexOf(v.adcode) > -1
    )[0];
  } else {
    districtList = res.districtList[0];
  }
  // if(districtList.name == "舟山市")filterLen=300;
  const arr = districtList.boundaries.filter(v => {
    return v.length > filterLen;
  });

  return {
    bounds: arr,
    name: districtList.name,
    adcode: districtList.adcode
  };
};
