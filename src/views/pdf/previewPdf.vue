
<template>
  <div>
    <preview-pdf :pdfUrl="url"></preview-pdf>
  </div>
</template>

<script>
import previewPdf from '@/components/common/previewPDF';
export default {
  name: 'pdfView',
  components: { previewPdf },
  data () {
    return {
      url: 'http://10.1.1.124:8824/file/杭州市数字改革门户网站PC端_移动端UI规范-政府端(0309)-0cd4e50b8bf9466d92efc4c6edb1b39a.pdf'
    };
  }
};
</script>
