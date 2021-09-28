const webpack = require('webpack');
module.exports = {
  runtimeCompiler: true,
  /* 注意sass，scss，less的配置 */
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/assets/name.scss";
        `
      },
      scss: {
        prependData: '@import "~@/variables.scss";'
      },
      less: {
        globalVars: {
          primary: '#fff'
        }
      }
    } // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.
  },
  devServer: {
    port: 8888, // 端口号
    host: 'localhost',
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    proxy: {
      '/api': {
        target: '<url>',
        ws: true,
        changeOrigin: true
      },
      '/foo': {
        target: '<other_url>'
      }
    } // 配置多个代理
  },
  lintOnSave: true, // 开启保存自动校验eslinst
  configureWebpack: {
    // 全局 支持jquery 配置
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
  }
};
