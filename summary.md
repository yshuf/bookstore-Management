<!--
 * @Description: 前端技术总结
 * @Author: mobai
 * @Date: 2022-09-02 09:55:19
 * @LastEditors: mobai
 * @LastEditTime: 2022-09-23 16:18:46
 * @FilePath: \bookstore-Management\summary.md
-->
[toc]
### CSS
### js
### vue
#### 1、提升用户体验：v-cloak
&emsp;&emsp;渲染普通文本的两种方式：{{}} 和 v-text 中，在使用 {{}} 展示或更新页面数据时：当网速比较慢时，会出现一个不好的过度现象，会让用户先看到我们的表达式（比如:{{msg}}）,然后才看到 data 的值，就是闪烁问题！
* 解决这个问题的办法:
  * 使用 v-cloak 指令，然后为其设置 css 样式 display:none;
     ```html
     <div v-clock>{{msg}}</div>
     ```
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
* 在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的 DOM 结构的时候，这个操作都应该放进 Vue.nextTick() 的回调函数中。
#### 8、vue 等单页面应用及其优缺点
|      | 单页面应用  | 多页面应用  |
|----- | -----| --------|
|组成               | 一个外壳和多个页面片段 | 多个完整页面 |
|资源公用（css、js） | 共用，只需要在外壳部分加载 | 不共用，每个页面都需要加载 |
|刷新方式           | 页面局部刷新或更改 | 整夜刷新 |
|url模式            | 默认 hash 模式 | 默认 history 模式 |
|用户体验           |页面片段间的模块化，用户体验良好 | 页面切换缓慢，流畅度不够，用户体验较差 |
|跳转动画           |容易实现 | 无法实现 |
|数据传递           |容易 | 依赖 url 传参，或者 cookie、localStorage、sessionStorage |
|搜索引擎优化SEO     |需要单独方案，实现困难，不利于SEO检索，可利用服务端渲染SSR优化 | 实现方法简易 |
|适用范围     |高需求的体验度，追求页面流畅的应用 | 适用于追求高度支持搜索引擎的应用 |
|开发成本     |较高，常需要借助专业的框架 | 较低，但页面重复代码多 |
|维护成本     |相对容易 | 相对复杂 |
#### 9、watch 和 computed 和 methods
##### computed
1. 原理：监听若干个 data 属性数据，返回最终数据给 computed 计算属性，使用时与 data 中其他属性无异。默认只有 get 方法，set 方法需要手动添加。
2. 擅长方面：擅长监听多个数据改变一个数据。侧重简单的数据计算
3. 调用情况：有缓存值，是基于响应式依赖的。只在相关响应式依赖发生改变时才会重新求值。也就是说当被监听值发生变化时，触发函数，否则，直接返回之前的计算结果，而不是再执行一遍函数方法。
##### watch
1. 原理：监听 data 中的某个数据，数据变化时触发相应的函数，类似于事件监听。
2. 擅长方面：擅长监听一个数据变化改变多个数据。当需要在数据变化时执行异步操作或者开销比较大的操作时最为有效。
3. 调用情况：没有缓存，当数据变化时会重新执行函数。
##### methods
1. 方法，需要手动调用，每次调用都会再次执行函数。
#### 10、v-if和v-show的区别
##### 相同点：
  两者都是在判断 DOM 节点是否显示
##### 不同点：
1. 实现方式：v-if 是根据后面数据的真假值判断直接从 DOM 树上删除或重建元素节点。v-show 只是在修改元素的 css 样式，也就是display的属性值（none，原来属性），元素始终在 DOM树上；
2. 编译过程：v-if 切换有一个局部编译/卸载的过程，切换过程中合适的销毁和重建内部的事件监听和子组件；v-show 只是简单的基于css 切换；
3. 编译条件：v-if 是惰性的，如果初始条件为假，什么都不会做，只有当条件第一次变为真的时候，才会开始局部编译。v-show 在任何条件下（不管首次是否为真）都是会被编译，被缓存，而且 DOM 元素始终会被保留；
4. 性能消耗：v-if 有更高的切换消耗，不适合做频繁的切换；v-show 有更高的初始渲染消耗，适合做频繁的切换；
#### 11、 vuex
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。
&emsp;&emsp; **state** 
&emsp;&emsp; Vuex 使用单一状态树，即每个应用将仅仅包含一个store实例，但单一状态和模块化并不冲突。存放的数据状态，不可以直接修改里面的数据。
&emsp;&emsp; **getters** 
&emsp;&emsp; 类似 vue 的计算属性，主要用来过滤一些数据。
&emsp;&emsp; **mutations** 
&emsp;&emsp; mutations定义的方法动态修改 Vuex 的 store 中的状态或数据。
&emsp;&emsp;  **actions** 
&emsp;&emsp; 可以理解为通过将 mutations 里面处理数据的方法变成可异步的处理数据的方法，简单的说就是异步操作。view 层通过 store.dispath 来分发action。
#### 12、 Vue 的路由实现： hash 模式 和 history 模式

&emsp;&emsp; **hash模式：** 在浏览器中符号“#”，#以及#后面的字符称之为hash，用 window.location.hash 读取；特点：hash 虽然在 URL 中，单不被包括在 HTTP 请求中；用来指导浏览器动作，对服务端安全无用，hash 不会重加载页面。[详细解析参考→](https://blog.csdn.net/luanhaiyang/article/details/50731919)
&emsp;&emsp; **history模式：** history 采用HTML5的新特性；且提供了两个新方法：pushState(),replaceState()可以对浏览器历史记录栈进行修改，以及 popState 事件的监听到状态变更
#### 13、vue 组件传参
1. 父子组件传参
   + 父-子：父组件使用 `<组件名 属性名="xxx">` 发送数据，子组件使用 `props` 接收。
   + 子-父：子组件使用 `$emit(自定义方法名，子组件属性)` 自定义事件传递属性。父组件绑定事件，并在父组件事件方法中接收子组件属性。
2. 非父子组件传参
   + eventBus($on、$emit, 劣势：事件总线方式传递数据同时需要及时的移除事件监听$off)、vuex、sessionStorage、localStore、$attrs/$listeners(多级组件，保持一种“血脉联系”，爷孙)
#### 14、mvvm 理解
&emsp;&emsp; MVVM 分为 Model、View、ViewModel 三者。
&emsp;&emsp; Model 代表数据模型，数据和业务逻辑都在 Model 层中定义；
&emsp;&emsp; View 代表UI视图，负责数据的展示；
&emsp;&emsp; 通过双向数据绑定，将 `View` 层和 `Model` 层连接起来。是 `MVVM` 最核心的部分。
#### 15、vue 生命周期及注意点
&emsp;&emsp; **beforeCreate**（创建前）在数据观测和初始化时间还未开始
&emsp;&emsp; **created**（创建后）完成数据观测，属性和方法的运算，初始化事件，el属性还没有显示出来
&emsp;&emsp; **beforeMount**（载入前）在挂载开始之前被调用，相关的 render 函数首次被调用。实例已完成以下的配置：编译模板，把 data 里面的数据和模板生成html。==注意此时还没有挂载html到页面上。==
&emsp;&emsp; **mounted**（载入后）在el被新创建的vm.$el替换，并挂载到实例上去之后调用。实例已完成以下的配置：用上面编译好的 html 内容替换 el 属性指向的 DOM 对象。完成模板中的 html 渲染到 html页面中。此过程中进行 ajax 交互。
&emsp;&emsp; **beforeUpdate**（更新前）在数据更新之前调用，发生在虚拟 DOM 重新渲染和打补丁之前。可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程
&emsp;&emsp; **updated**（更新后）在由于数据更改导致的虚拟 DOM 重新渲染和打补丁之后调用。调用时，组件 DOM 已经更新，所以可以执行依赖于 DOM 的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。
&emsp;&emsp; **beforeDestroy**（销毁前）在实例销毁之前调用。实例仍然完全可用。
&emsp;&emsp; **destroyed** （销毁后）在实例销毁之后调用。调用后，所有的事件监听器会被移除，所有的自实例也会被销毁。该钩子在服务器端渲染期间不被调用。
|生命周期钩子|组件状态|最佳实践|
|----|----|----|
| beforeCreate | 实例初始化之后，this指向创建的实例，不能访问到data、computed、watch、methods上的方法和数据 | 常用于初始化非响应式变量 |
| created | 实例创建完成，可以访问data、computed、watch、methods上的方法和数据，未挂载到DOM，不能访问到el属性，ref属性内容为空数组 | 常用于简单的ajax属性，页面的初始 化|
| beforeMount | 在挂载开始之前被调用，beforeMount之前，会找到对应的 template，并编译成render函数 | - |
| mounted | 实例挂载到 DOM 上，此时可以通过 DOM API 获取到 DOM 节点，$ref 属性可以访问 | 常用于获取 VNode 信息和操作，ajax 请求|
| beforeUpdate | 响应式数据更新时调用，发生在虚拟 DOM 打补丁之前 | 适合在更新之前访问现有的 DOM ,比如手动移除已添加的事假监听器 |
| updated | 虚拟 DOM 重新渲染和打补丁之后调用，组件 DOM 已经更新，可执行依赖于 DOM 的操作 |避免在这个钩子函数中操作数据，可能陷入死循环|
| beforeDestroy | 实例销毁之前调用。这一步，实例仍然完全可用，this仍能获取到实例 | 常用于销毁定时器，解绑全局事件、销毁插件对象等操作 |
| destroy |实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁|-|
1. `created`阶段的`ajax`请求与`mounted`请求的区别：前者页面视图未出现，如果请求信息过多，页面会长时间处于白屏状态
2. `mounted`不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用`vm.$nextTick`

#### 16、vue 双向数据绑定
&emsp;&emsp; vue 使用数据劫持结合发布者/订阅者模式。
&emsp;&emsp; 当一个`Vue`实例创建时，`Observer`会遍历`data`选项的属性， 用`Object.defineProperty`将它们转为`getter/setter`并且在内部追踪相关依赖，在属性被访问和修改时通知变化。
&emsp;&emsp; 每个组件实例都有相应的`watcher`程序实例，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的`setter`被调用时，会通知`watcher`重新计算，从而致使它关联的组件得以更新。
**具体步骤**
**第一步：需要 observe 的数据对象进行递归遍历，** 包括子属性对象的属性，都加上`setter`和`getter`。这样的话，给这个对象的某个值赋值，就会触发`setter`,那么就能监听到了数据变化
**第二步：compile 解析模板指令，** 将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
**第三步：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，** 主要做的事情是：
1. 在自身实例化时往属性订阅器（dep） 里面添加自己
2. 自身必须有一个 update() 方法
3. 待属性变动 dep.notice() 通知时，能调用自身的 update() 方法，
 









































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



