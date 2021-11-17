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

### cross-env 使用
1. 什么是cross-env？ 通过js在平台设置不同的环境变量的工具
2. 安装   npm install --save-dev cross-env
3. 


```
  # feat 新增功能（feature）
  # fix 修补bug
  # docs 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE等等
  # style 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
  # refactor 重构（即不是新增功能，也不是修改bug的代码变动）
  # perf 优化相关，比如提升性能、体验
  # test 增加测试，包括单元测试、集成测试等
  # build
  # ci 自动化流程配置修改
  # chore 构建过程或辅助工具的变动
  # revert 回滚到上一个版本

  # scope.required 用于定义是否所有提交消息都需要一个作用域
  # scope.allowed 允许任何作用域名称
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

目录结构

```
src
  |-assets 静态资源
    |-fontcss iconfont图标
```

### 使用element-ui（全局注册elementui：https://element.eleme.cn/#/zh-CN）
1.通过 npm i element-ui -S (安装)
2.在 main.js 中引入 element-ui 的 js 文件和 css
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css'
3.让 vue 引用 Element ui
    Vue.use(ElementUI)
4.这样就可以在全局使用了’

```
el-scrollbar 组件使用
props: {
 native: Boolean, // 是否使用本地，设为true则不会启用element-ui自定义的滚动条
 wrapStyle: {}, // 包裹层自定义样式
 wrapClass: {}, // 包裹层自定义样式类
 viewClass: {}, // 可滚动部分自定义样式类
 viewStyle: {}, // 可滚动部分自定义样式
 noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
 tag: { // 生成的标签类型，默认使用 `div`标签包裹
  type: String,
  default: 'div'
 }
}
```

### 使用 sreenfull 插件，执行命令安装 （实现全屏功能）
1. npm install --save screenfull
2. 使用页面引入 import screenfull from 'screenful'
3. 调用 screenfull.togger() 方法

### 使用 nprogress 插件 (加载进度条)
1. npm install --save nprogess
2. 页面引入 import NProgress from 'nprogress';
3. NProgress.start();  // 开始
4. NProgress.done();  // 结束

### 使用 vue-count-to 插件 （数字滚动）
1. npm install --save vue-count-to
2. 页面引入 import countTo from 'vue-count-to'
3. 常用属性
  
| Property   | Description    | type |  default |
| ------ | --------------- |---------------|---------------- |
| Property | Description |	type|	default |
| startVal |	开始值                 |		Number |		0 |
| endVal	 |  结束值                 |		Number |		2017 |
| duration |	持续时间，以毫秒为单位   |		Number	3000 |
| autoplay |	自动播放               |		Boolean  |		true |
| decimals |	要显示的小数位数        |		Number |		0 |
| decimal	 |  十进制分割              |		String |		. |
| separator| 	分隔符                  |		String |		, |
| prefix	 |  前缀                   |		String	 |	'' |
| suffix	 |  后缀                   |		String |		'' |
| useEasing|	使用缓和功能           |		Boolean |		true |
| easingFn |	缓和回调               |		Function |		— |

### 使用 vue-seamless-scroll 插件（实现循环滚动列表）
1. cnpm install vue-seamless-scroll --save
2. 页面引入 import vueSeamlessScroll from 'vue-seamless-scroll'
  

### PostCSS 相关插件使用（autoprefixer，postcss-pxtorem）
  根目录下新建 postcss.config.js 文件
  
#### px转rem    
// 这里 postcss-pxtorem 版本需要注意，5.1.1 版本有用，刚开始安装的 6.0.0 的启动报错
1. npm run postcss-loader postcss-pxtorem --save-dev
2. 配置相关需要的 postcss-pxtorem 参数
 #### autoprefixer （自动添加浏览器厂商前缀）
1. 下载  cnpm install autoprefixer --save-dev
2. 在配置文件（postcss.config.js）中 配置 autoprefixer
    (1).引入autoprefixer
    ```
      const autoprefixer = require('autoprefixer');
    ```
    (2). 文件导出改应用插件
    ```
    需要在根目录下新建 browserslistrc 文件( Browsers that we support ),同时将 package.json 中的 browserslist 去掉，避免冲突
    module.exports = {
      plugins: [
        // 根据 .browserslistrc 自动添加浏览器厂商前缀（webkit、moz、ms）
        autoprefixer 
      ]
    }
    ```

<!-- 配置eslintrc.js 报错提示 stylelint: Could not find "stylelint-config-standard". Do you need a `configBasedir`? 解决 -->
npm i stylelint stylelint-webpack-plugin stylelint-config-standard --save-dev


#### 风格指南
##### 组件名为多个单词
组件名应该始终由多个单词组成，除了根组件 App，以及 <transition>、<component> 之类的 Vue 内置组件。

这样做可以避免与现有以及未来的 HTML 元素产生冲突，因为所有的 HTML 元素名称都是单个单词的。
```
export default {
  name: 'TodoItem',
  // ...
}
```
##### Prop 定义应尽量详细
在提交的代码中，prop 的定义应该尽量详细，至少指定其类型。
```
// 更好的例子
props: {
  status: {
    type: String,
    required: true,

    validator: value => {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].includes(value)
    }
  }
}
```
##### 单文件组件文件的大小写
单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)。
单词大写开头对于代码编辑器的自动补全最为友好，因为这使得我们在 JS(X) 和模板中引用组件的方式尽可能地一致。然而，混用大小写的文件命名方式，有时候会导致其在大小写不敏感的文件系统中出现问题，这也是横线连接命名同样完全可取的原因。
```
components/
|- MyComponent.vue
```

##### 基础组件名称
应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以一个特定的前缀开头，比如 Base、App 或 V。
```
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```


##### 模板中的组件名称大小写
对于绝大多数项目来说，在单文件组件和字符串模板中，组件名称应该始终是 PascalCase 的——但是在 DOM 模板中是 kebab-case 的。

PascalCase 相比 kebab-case 有一些优势：

编辑器可以在模板里自动补全组件名称，因为 PascalCase 同样适用于 JavaScript。
<MyComponent> 视觉上比 <my-component> 更能够和单个单词的 HTML 元素区别开来，因为前者的不同之处有两个大写字母，后者只有一个横线。
如果你在模板中使用任何非 Vue 的自定义元素，比如一个 Web Component，PascalCase 确保了你的 Vue 组件在视觉上仍然是易识别的。
不幸的是，由于 HTML 是大小写不敏感的，在 DOM 模板中必须仍使用 kebab-case。

还请注意，如果你已经是 kebab-case 的重度用户，那么与 HTML 保持一致的命名约定，且在多个项目中保持相同的大小写规则，就可能比上述优势更为重要了。在这些情况下，在所有的地方都使用 kebab-case 同样是可以接受的。
```
<!-- 在单文件组件和字符串模板中 -->
<MyComponent/>
<!-- 在 DOM 模板中            -->
<my-component></my-component

<!-- 在所有地方 -->
<my-component></my-component>
```