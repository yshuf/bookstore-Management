<!--
 * @Description: 
 * @Author: mobai
 * @Date: 2022-09-02 09:55:19
 * @LastEditors: mobai
 * @LastEditTime: 2022-09-05 16:51:11
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
    ```
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


