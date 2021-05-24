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

```
  # Node >= 10 and Git >= 2.13.0
  # [Husky](https://github.com/typicode/husky#readme)
  # [validate-commit-msg](https://github.com/conventional-changelog-archived-repos/validate-commit-msg)
  # [Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
  # [Change log 示例1](https://github.com/karma-runner/karma/blob/master/CHANGELOG.md)
  # [Change log 示例2](https://github.com/btford/grunt-conventional-changelog/blob/master/CHANGELOG.md)

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