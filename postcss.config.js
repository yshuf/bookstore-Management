
const path = require('path');
const _isEmpty = require('lodash/isEmpty');
const _findIndex = require('lodash/findIndex');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const px2rem = require('postcss-pxtorem');
const frameConfig = require('./frame.config.js');

const isProd = process.env.NODE_ENV === 'production';
function resolve (dir) {
  return path.join(__dirname, '.', dir);
}

// 大屏布局用百分比，间距用px, 字体和小块用px转rem
const px2remConfig = {
  // 设计图为750px，一份 root 对应着 rootWidth/10=75px（设计稿宽度的十分之一）
  // width: 16px;->width: 1rem; 1rem=html.font-size
  rootValue: 1920 / 100, // 结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
  // 这里是基本单位，前面设置了1vw
  unitPrecision: 1,
  propList: [
    '*',
    '!font-size',
    '!border',
    '!border-bottom',
    '!border-left',
    '!border-right',
    '!border-top'
  ], // 可以从 px 更改为 rem 的属性 （排除'!font-size'）
  replace: !!isProd, // 开发环境 .t{width: 621pr; width: 82.8rem;} 显示替换前的值，前面的值无效只是显示
  selectorBlackList: [
    'ignore',
    'van-calendar',
    'van-picker',
    'van-uploader',
    'van-tabbar'
  ], // 要忽略的选择器，保留为px，自定义的选择器可以添加 ignore 来表示 比如：['body'] 将匹配 .body-class
  minPixelValue: 0, // 设置要替换的最小像素值
  mediaQuery: false, // 允许在媒体查询中转换px
  // 默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/
  // 如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
  exclude: function (file) {
    if (_isEmpty(frameConfig.px2RemModule)) {
      return true; // 未配置转换的模块，则直接忽略
    }
    const ignoreIndex = _findIndex(frameConfig.px2RemModule, o => {
      const resolvePath = resolve(o);
      return file.indexOf(resolvePath) !== -1;
    });
    if (ignoreIndex !== -1) {
      // console.log('\npx2rem：', file);
      return false; // 返回 false 进行 px2rem 的转换
    }
    return true; // 如果exclude是function，则可以使用exclude function返回true，该文件将被忽略 https://www.npmjs.com/package/postcss-pxtorem
  }
  // exclude: /node_modules/i
};

module.exports = {
  plugins: [
    // 根据 .browserslistrc 自动添加浏览器厂商前缀（webkit、moz、ms）
    autoprefixer,
    // 去除空格、注释、智能压缩代码（注意：postcssSprites 会把 css 代码中已经注释的背景图也进行雪碧图合成，所以要提前把 css 去除注释）
    cssnano,
    // px2rem
    px2rem(px2remConfig)
  ]
};
