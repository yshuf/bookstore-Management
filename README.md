# bookstore-management

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 使用element-ui（全局注册elementui：https://element.eleme.cn/#/zh-CN）
1.通过 npm i element-ui -S (安装)
2.在 main.js 中引入 element-ui 的 js 文件和 css
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css'
3.让 vue 引用 Element ui
    Vue.use(ElementUI)
4.这样就可以在全局使用了

## 使用 sreenfull 插件，执行命令安装
1. npm install --save screenfull
2. 使用页面引入 import screenfull from 'screenful'
3. 调用 screenfull.togger() 方法

## 使用 nprogress 插件
1. npm install --save nprogess
2. 页面引入 import NProgress from 'nprogress';
3. NProgress.start();  // 开始
4. NProgress.done();  // 结束