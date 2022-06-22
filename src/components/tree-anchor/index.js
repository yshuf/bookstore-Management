/**
 * @desc tree 锚点组件
 */
import _cloneDeep from 'lodash/cloneDeep';
import { getTreeMap } from './tree.js';
const BaseTreeAnchor = {
  name: 'BaseTreeAnchor',
  props: {
    // tree数据
    list: {
      type: Array,
      require: true,
      default: () => []
    },
    // 自定义的样式
    ctCls: {
      type: String
    },
    // 锚点的标题
    title: {
      type: String,
      default: ''
    },
    /**
      * @description 数据的格式
      */
    props: {
      type: Object,
      default () {
        return {
          id: 'id',
          name: 'name',
          children: 'children',
          label: 'label'
        };
      }
    },
    /**
      * @description 展示侧边列表
      */
    showList: {
      type: Boolean,
      default: true
    },
    /**
      * @description 容器id（必须id）
      */
    containerId: {
      type: String,
      default: ''
    },
    // 每个子项的class名称
    treeItemClass: {
      type: String,
      default: ''
    },
    // 锚点触发位置
    anchorPostion: {
      type: String,
      default: 'start'
    },
    // 锚点跳转行为
    anchorBehavior: {
      type: String,
      default: 'smooth'
    }
  },
  watch: {
    list: {
      handler (newVal, oldVal) {
        if (newVal) {
          // eslint-disable-next-line no-undef
          this.treeData = _cloneDeep(this.list);
        }
      },
      deep: true,
      immediate: true
    },
    activeAnchor: {
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$emit('activeAnchor', newVal);
        }
      },
      immediate: true
    }
  },
  computed: {
    planHeight: function () {
      const height = this.treeMap.length * 30;

      return `height:${height}px`;
    },
    activeTop: function () {
      const height = this.activeIndex * 30 + 4;

      return `${height}px`;
    },
    treeMap: function () {
      return getTreeMap(this.list, this.props.children);
    }
  },
  data () {
    return {
      treeData: [],
      activeIndex: 0, // 当前可视区域的下标
      activeAnchor: '' // 获取当前的锚点
    };
  },
  created () {
    // if (this.treeData[0]) {
    //   this.treeData[0].active = true
    //   this.activeAnchor = this.treeData[0][this.props.id]
    // }

    window.addEventListener('scroll', this.onScroll, true);
  },
  destroyed () {
    window.removeEventListener('scroll', this.onScroll, true);
  },
  methods: {
    /**
      * @description 监听页面滚动
      */
    onScroll (e) {
      const scrollItems = document.querySelectorAll(`.${this.treeItemClass}`);

      const containerHeight = document.querySelector('#' + this.containerId)
        .offsetTop;
      // console.log(height, e.target.scrollingElement.scrollTop, 8888888);

      // 判断当前滚动条滚动的距离小于第一个待响应的盒子离正文顶部高度，直接初始化默认不选中
      if (e.target.scrollingElement.scrollTop <= (scrollItems[0].offsetTop - 32)) {
        this.activeAnchor = '';
        return;
      }
      const actualHeight =
         e.target.scrollingElement.scrollTop - containerHeight;
      for (let i = scrollItems.length - 1; i >= 0; i--) {
        // 判断滚动条滚动距离是否大于当前滚动项可滚动距离

        const judge =
           actualHeight >= scrollItems[i].offsetTop - scrollItems[0].offsetTop;

        if (judge || judge === 0) {
          this.activeAnchor = this.judgeScrollBottom()
            ? this.treeMap[this.treeMap.length - 1][this.props.id]
            : this.treeMap[i][this.props.id];

          this.getCurrentIndex(this.activeAnchor);
          this.setCurrentNode(this.activeAnchor, this.treeData);
          break;
        }
      }
    },
    /**
      * @description 判断是否滚动到底部
      */
    judgeScrollBottom () {
      // // 这里有个坑、想要判断是否到底部 需要给容器定一个高度然后再去判断 不然无法监听
      // const container = document.querySelector("#" + this.containerId);
      // if (container) {
      const scrollTop = this.getScrollTop();
      const clientHeight = this.getWindowHeight();
      const scrollHeight = this.getScrollHeight();

      return Math.ceil(scrollTop) + clientHeight >= scrollHeight;
    },
    /**
      * @description 获取当前的滚动条在y轴上的高度
      * @returns
      */
    getScrollTop () {
      let scrollTop = 0;
      let bodyScrollTop = 0;
      let documentScrollTop = 0;

      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }

      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }

      scrollTop =
         bodyScrollTop - documentScrollTop > 0
           ? bodyScrollTop
           : documentScrollTop;

      return scrollTop;
    },
    /**
      * @description 获取当前文档的总高度
      * @returns
      */
    getScrollHeight () {
      let scrollHeight = 0;
      let bodyScrollHeight = 0;
      let documentScrollHeight = 0;

      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
      }

      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
      }

      scrollHeight =
         bodyScrollHeight - documentScrollHeight > 0
           ? bodyScrollHeight
           : documentScrollHeight;

      return scrollHeight;
    },
    /**
      * @description 获取浏览器视口的高度
      * @returns
      */
    getWindowHeight () {
      let windowHeight = 0;

      if (document.compatMode == 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight;
      } else {
        windowHeight = document.body.clientHeight;
      }

      return windowHeight;
    },
    /**
      * @description 滚动到相对应的区域
      */
    goAnchor (id, anchor) {
      window.removeEventListener('scroll', this.onScroll, true);
      this.getCurrentIndex(anchor);

      this.$nextTick(() => {
        document.querySelector(`#${anchor}`).scrollIntoView({
          behavior: this.anchorBehavior, // 平滑过渡
          block: this.anchorPostion
        });
        window.addEventListener('scroll', this.onScroll, true);
      });

      this.setCurrentNode(id, this.treeData);
      this.activeAnchor = id;
    },
    /**
      * @description 修改相对用可是节点的状态
      * @param { number } id 节点id
      * @param { Array } data 树节点列表
      */
    setCurrentNode (id, data) {
      if (!this.showList) return false;

      for (const item of data) {
        item.active = false;

        if (id === item.id) {
          item.active = true;
        }

        if (!item.children || !item.children.length) continue;

        this.setCurrentNode(id, item.children);
      }
    },
    /**
      * @description  获取当前所在的区域
      * @param { number } id 节点id
      */
    getCurrentIndex (name) {
      if (!this.showList) return false;

      this.treeMap.map((item, index) => {
        if (item.name === name) {
          this.activeIndex = index;
        }
      });
    },
    /**
      * @description 渲染树的子节点
      * @param { Array} data 节点数据
      * @returns dom
      */
    renderChildrenItem (data) {
      if (!data || !data.length) return false;

      const h = this.$createElement;

      return h(
        'ul',
        {
          class: {
            'tree-List-sub': true
          },
          style: {
            display: this.showList ? 'block' : 'none'
          }
        },
        [
          data.map(item => {
            return h('li', {}, [
              h(
                'p',
                {
                  class: {
                    'section-link': true,
                    'section-link-active': item.active
                  },
                  on: {
                    click: event => {
                      this.goAnchor(
                        item[this.props.id],
                        item[this.props.name],
                        item
                      );
                      event.stopPropagation();
                    }
                  }
                },
                [
                  item[this.props.label],
                  item[this.props.children]
                    ? this.renderChildrenItem(item[this.props.children])
                    : ''
                ]
              )
            ]);
          })
        ]
      );
    }
  },
  render (h) {
    return h(
      'div',
      {
        class: {
          [this.ctCls]: this.ctCls,
          'tree-anchor': true
        }
      },
      [this.$slots.default]
    );
  }
};

export default BaseTreeAnchor;
