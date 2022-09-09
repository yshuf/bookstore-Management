<!--
 * @Description: 前端技术总结
 * @Author: mobai
 * @Date: 2022-09-02 09:55:19
 * @LastEditors: mobai
 * @LastEditTime: 2022-09-06 10:13:27
 * @FilePath: \bookstore-Management\interview.md
-->
[toc]
### CSS
### js
### vue
#### 1、提升用户体验：v-cloak
&emsp;&emsp;渲染普通文本的两种方式：{{}} 和 v-text 中，在使用 {{}} 展示或更新页面数据时：当网速比较慢时，会出现一个不好的过度现象，会让用户先看到我们的表达式（比如:{{msg}}）,然后才看到 data 的值，就是闪烁问题！
* 解决这个问题的办法:
  * 使用 v-cloak 指令，然后为其设置 css 样式 display:none;
    ```javaScript
    [v-cloak]{
      display: none !important;
    }
    ```
* {{}} 和 v-text 的区别
  * 默认 v-text 是没有闪烁问题的，{{}} 存在闪烁的问题
  * v-text 会覆盖掉元素中原本的内容，但是 {{}} 只会替换自己的这个占位符
#### 2、keep-alive
&emsp;&emsp; 概念和作用：keep-alive 是 Vue 内置的一个组件，可以使包含的组件保留状态，避免重新渲染
&emsp;&emsp;原理：在 created 函数调用时将需要缓存的 VNode 节点保存在 this.cache 中／在 render（页面渲染） 时，如果 VNode 的 name 符合缓存条件（可以用 include 以及 exclude 控制），则会从 this.cache 中取出之前缓存的 VNode 实例进行渲染
* Props
  * include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
  * exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
  * max - 数字。最多可以缓存多少组件实例。
#### 3、vue 组件中的 data 为什么是函数而不是对象
&emsp;&emsp;在 new Vue() 中，data 是可以作为一个对象进行作的（引用同一个内存地址），然而在 component 中，data 只能以函数的形式存在（每次引用的时候返回一个新的地址），不能直接将对象赋值给它。
&emsp;&emsp;当 data 选项是一个函数的时候，每个实例可以拷贝一份对象数据并单独维护，各个子组件实例中的 data 不会相互影响。
#### 4、$router、$route、导航守卫
##### $router
&emsp;&emsp; $router 是 VueRouter 实例对象，主要实现路由跳转，是全局对象。
  ```javaScript
  1. this.$router.push('/home')
  ```
##### $route
&emsp;&emsp;$route 是一个路由信息对象，是局部对象，包含路由信息

&emsp;&emsp;this.$route.path 字符串，当前绝对路径

&emsp;&emsp;this.$route.query 对象，路由查询参数键值对

&emsp;&emsp;this.$route.params 对象，路由中的动态片段和全匹配全段的键值对

&emsp;&emsp;this.$route.name 路由名称
##### 导航守卫
&emsp;&emsp;控制导航跳转，beforeEach，afterEach 等。一般用于页面 title 的修改，一些需要登录才能调整页面重定向功能。
&emsp;&emsp;to: route 即将进入的目标路对象。
&emsp;&emsp;from: route 当前导航正要离开的路由。
&emsp;&emsp;next: function 一定要调用该方法 resolve 这个钩子，执行效果依赖 next 方法的调用参数。可以控制网页的跳转。

#### 5、vue 数组修改、添加属性、渲染失败原因及解决方案
&emsp;&emsp;原因：Observe 阶段 Vue 跳过了对数组每个键设置响应事的过程，而是直接对值进行递归设置响应式。
&emsp;&emsp;如下是 Vue 监听数组变更的方法（7个）
   + push()  
   + pop()  
   + shift()  
   + unshift()  
   + splice()
   + sort()
   + reverse()

&emsp;&emsp;变更方法，就是会对调用它们的原数组进行变更。
&emsp;&emsp;在计算属性中使用 reverse() 和 sort() 的时候务必小心！这两个方法将变更原始的数组，计算函数中不应该这么做。在调用这些方法之前创建一个原数组的副本：

  ```javaScript
  - return numbers.reverse()
  + return [...numbers].reverse()
  ```
&emsp;&emsp;由于 javaScript 的限制，Vue 不能监测以下数组的变动:
1. 当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem]=newValue
   ```javaScript
    var vm = new Vue({
      data:{
        items: ['a','b','c']
      }
    })

    // 解决方法
    // Vue.set
    Vue.set(vm.items,indexOfItem,newValue)
    vm.$set(vm.items,indexOfItem,newValue)

    // Array.prototype.splice
    vm.items.splice(indexOfItem,1,newValue)

   ```
2. 当你修改数组的长度时，例如：vm.items.length = newLength
   ```javaScript
   vm.items.splice(newLength)
   ```
#### 6、vue 对象添加属性，渲染失败原因及解决方案
&emsp;&emsp;还是由于 JavaScript 的限制，Vue 不能监测对象属性的添加或删除：
```javaScript
var vm= new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 现在是响应式的

vm.b = 2 
// `vm.b` 不是响应式的
```
&emsp;&emsp;解决方法
```javaScript
// set 
Vue.set(vm.userProfile,'age',27)
vm.$set(vm.userProfile,'age',27)

// watch 深度监听
var vm = new Vue({
  el: '#app',
  data:{
    children:{
      name: '小鱼',
      age: 20,
      sex: '男'
    }
  },
  watch:{
    children:{
      handle:function(val,oldVal){
        console.log(val.name)
      },
      deep: true // 对象内部的属性监听，也叫深度监听
    }
  }
})
```
#### 7、vm.$nextTick(callback) 使用场景 
##### 作用描速
&emsp;&emsp;$nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick,则可以在回调中获取更新后的 DOM
```JavaScript
new Vue({
  methods:{
    example:function(){
      // 修改数据
      this.message = "changed"
      // DOM 还没更新
      this.$nextTick(function(){
        // DOM 现在更新了
        // "this" 绑定到当前实例
        this.doSomethingElse()
      })
    }
  }
})
```
##### 应用场景
* created() 钩子函数中操作 DOM
在created() 钩子函数执行的时候 DOM 其实并未进行任何渲染，而此时进行 DOM 操作无异于徒劳，所以此处一定要将 DOM 操作的 js 代码放进 Vue.nextTick() 的回调函数中。与之对应的就是 mounted() 钩子函数，因为该钩子函数执行时所有的 DOM 挂载和渲染都已完成，此时在该钩子函数中进行任何 DOM 操作都不会有问题。












































### Node
#### Node 和 ES6 模块异同
##### Node 使用 common.js 规范模块化
1. exports 导出变量，module.exports 导出对象，require 加载模块
2. 同一模块导入后存在模块缓存，后续多次导入从缓存中加载
##### es6 规范
1. export 和 import 导出导入模块。
2. export 支持导出多个变量，export default 是 export 的语法糖，表示导出 default 接口。
3. 导出单个变量建议使用 export default，导出多个变量使用 export。
4. 多个模块导入多次，只会执行一次；



