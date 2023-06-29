<!--
 * @Description:
 * @Author: mobai
 * @Date: 2022-06-22 10:59:45
 * @LastEditors: mobai
 * @LastEditTime: 2022-09-06 14:51:54
 * @FilePath: \bookstore-Management\src\views\book-management\sortParams.vue
-->
<template>
  <div class="page-content">
    分类参数 hhaha
    <RichText ></RichText>
    <!-- <iframe src="https://www.wjx.cn/handler/jqemed.ashx?activity=QZaNC3B&width=760&source=iframe" frameborder="0"></iframe> -->
  </div>
</template>

<script>
import RichText from '@/components/common/richText.vue';
export default {
  name: 'SortParams',
  components: { RichText },
  mounted () {
    var iswjxsafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (iswjxsafari && window.location.href.toLowerCase().indexOf('wjxsafari') == -1) {
      var loc = window.location.href;
      if (loc.indexOf('?') > -1) {
        loc += '&wjxsafari=1';
      } else { loc += '?wjxsafari=1'; }
      window.location.href = 'https://www.wjx.cn/wjx/join/sc.aspx?ref=' + encodeURIComponent(loc);
    }
    var scripts = document.getElementsByTagName('script');
    var target = null;
    var script;
    var matchedUrl = 'https://www.wjx.cn/vm/QZaNC3B.aspx?width=760&source=iframe';// domain pjq querystring
    var scriptURL = '/handler/jqemed.ashx?activity=QZaNC3B';
    for (var i = 0; i < scripts.length; i++) {
      script = scripts[i];
      if (script.src.indexOf(scriptURL) > -1) {
        target = script.parentNode;
        target.removeChild(script);
        break;
      }
    }
    if (target != null && matchedUrl != null) {
      var iframeId = 'wjxiframe_/vm/QZaNC3B.aspx';
      var hasHeight = 0;
      if (!hasHeight) {
        window.WjxData = {};
        WjxData.receiveSize = function (e) {
          if (!e.data) return; if (!e.data.split) return; var dataArray = e.data.split(',');
          if (dataArray[0] == 'heightChanged') {
            document.getElementById(iframeId).style.height = dataArray[1] + 'px';
            if (dataArray[2] == 1) { window.scrollTo(0, 0); }
            if (window.wjxHeightChanged) wjxHeightChanged(dataArray[1]);
          }
        };
        if (window.addEventListener) {
          window.addEventListener('message', WjxData.receiveSize, false);
        } else if (window.attachEvent) {
          window.attachEvent('onmessage', WjxData.receiveSize, false);
        }
      }
      var iframeheight = '400';
      if (iframeheight == 2)// 1表示自定义高度，2表示屏幕高度，其他是指定高度
      { iframeheight = document.documentElement.clientHeight; }
      target.innerHTML += '<iframe id=\'' + iframeId + '\' src=\'' + matchedUrl + '\' width=\'100%\' height=' + iframeheight + ' frameborder=0 allowTransparency=\'true\'>';
    }
  }
};
</script>

<style lang="less" scoped></style>
