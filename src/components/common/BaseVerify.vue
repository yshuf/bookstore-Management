<!-- 公共顶部组件页面 -->
<template>
  <div id="slide_verify">
		<div id="slide_box">
			<div id="slide_btn">
				<i class="iconfont" :class="slideVerify ? 'icon-sure' : 'icon-caidan'" :style="{color: slideVerify ? '#7BBB55' : ''}"></i>
			</div>
			<span v-if="slideVerify">通过验证</span>
		</div>
		<div>按住滑块，拖动到最右边</div>
  </div>
</template>

<script>
export default {
  name: 'commonTop',
  props: {
    dataArry: {
      type: Array,
      default: []
    },
    hasBorder: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      slideVerify: false
    };
  },
  mounted() {
    this.verify();
  },
  methods: {
    // 滑块验证
    verify () {
      let that = this;
      var box = document.getElementById("slide_verify");
      var xbox = document.getElementById("slide_box");
      var btn = document.getElementById("slide_btn");
      var b = box.offsetWidth;
      var o = btn.offsetWidth;
      btn.ondragstart = function () {
          return false;
      };
      btn.onselectstart = function () {
          return false;
      };
      btn.onmousedown = function (e) {
          if (xbox.clientWidth >= box.clientWidth) {
              return;
          }
          var disX = e.clientX - btn.offsetLeft;
          document.onmousemove = function (e) {
              var l = e.clientX - disX + o;
              if (l < o) {
                  l = o;
              }
              if (l > b) {
                  l = b;
              }
              xbox.style.width = l + "px";
          };
          document.onmouseup = function (e) {
              var l = e.clientX - disX + o;
              if (l < b) {
                  l = o;
              } else {
                  l = b;
                  // $("#slide_box").append("验证通过");
                  // btn.innerHTML ="<i class=\"iconfont icon-sure\" style=\"font-size: 12px; color: #7BBB55\"></i>";
                  that.slideVerify = true;
              }
              xbox.style.width = l + "px";
              document.onmousemove = null;
              document.onmouseup = null;
          };
      };
    }
  }
};
</script>

<style scoped lang="less">
#slide_verify {
  height: 40px;
  margin-bottom: 15px;
  line-height: 40px;
  text-align: center;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  position: relative;
  background-color: #eeeeee;
  // -webkit-box-shadow: inset 0px 0px 2px 1px rgba(0, 0, 0, 0.2);
  // box-shadow: inset 0px 0px 2px 1px rgba(0, 0, 0, 0.2);
}
#slide_box {
	height: 40px;
	text-align: center;
	line-height: 40px;
	font-size: 12px;
	color: #fff;
	position: absolute;
	background: rgba(16, 142, 233, 1);
	span {
		position: absolute;
	}
}
#slide_btn {
	cursor: pointer;
	float: right;
	width: 40px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	font-size: 14px;
	color: #d8d8d8;
	background-color: rgba(255, 255, 255, 1);
	box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.3);
}
</style>
