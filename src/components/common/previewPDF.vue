
<template>
  <div>
    <p v-show="!show" style="position:absolute;top:0;left:0;text-align:center;width:100%;padding-top:0.2rem;">PDF加载中，请耐心等待...</p>
    <pdf
      v-show="show"
      v-for="i in numPages"
      :key="i"
      :src="src"
      :page="i"
      :rotate="rotate"
      class="pdf"
      :style="style"
    ></pdf>
  </div>
</template>

<script>
import pdf from 'vue-pdf-signature';
import CMapReaderFactory from 'vue-pdf-signature/src/CMapReaderFactory';
export default {
  name: 'PreviewPDF',
  components: { pdf },
  props: {
    pdfUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      numPages: '',
      src: '',
      show: false,
      rotate: 0,
      style: 'width:100%',
      widt: 100
    };
  },
  mounted () {
    this.loadPdf(this.pdfUrl);
  },
  methods: {
    loadPdf (url) {
      this.src = pdf.createLoadingTask({
        url: url,
        cMapPacked: true,
        CMapReaderFactory
      });
      this.src.promise.then((pdf) => {
        this.show = true;
        this.numPages = pdf.numPages; // 这里拿到当前pdf总页数
      });
    }
  }
};
</script>
