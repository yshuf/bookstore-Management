<style lang="scss"></style>

<template>
  <div class="tinymce">
    <!-- 富文本编辑组件 -->
    <editor id="tinymce" v-model="tinymceHtml" :init="init"></editor>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver/theme.min';
import Editor from '@tinymce/tinymce-vue';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/code';
import 'tinymce/plugins/table';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/textcolor';
import { MessageBox } from '../../utils/common';

export default {
  name: 'richText',
  data () {
    return {
      tinymceHtml: null,
      init: {
        // language_url: '/static/tinymce/zh_CN.js',
        // language: 'zh_CN',
        // skin_url: '/static/tinymce/skins/ui/oxide',
        content_css: '/static/tinymce/skins/content/default/content.css',
        height: 300,
        plugins:
          'link lists image code table colorpicker textcolor wordcount contextmenu',
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        branding: false,
        object_resizing: false,
        convert_urls: false
      }
    };
  },
  components: { Editor },
  props: {
    defaultTxt: {
      type: String
    },
    value: {
      type: String
    },
    imageSize: {
      type: String
    },
    postUrl: {
      type: String
    }
  },
  created () {
    const that = this;
    this.init.images_upload_handler = function (blobInfo, success, failure) {
      // const img = 'data:image/jpeg;base64,' + blobInfo.base64()
      if (blobInfo.blob().size / 1024 / 1024 > that.imageSize) {
        // 字节转MB
        failure('图片太大，须小于' + that.imageSize + 'M');
      }
      // success(img)
      const fileInfo = new FormData();
      console.log(blobInfo.blob());
      if (blobInfo.blob()) {
        fileInfo.append('file', blobInfo.blob());
        fileInfo.append('fileType', 'noticeLogo');
      }
      if (blobInfo.blob()) {
        that.ajaxRequest({
          type: 'post',
          param: fileInfo,
          hasFile: true,
          url: that.postUrl,
          successfn: function (res) {
            console.log('上传图片', res);
            success(res.data);
          },
          errorfn: function (e) {
            MessageBox({
              content: e.msg,
              autohide: true
            });
          }
        });
      }
    };
    this.init.init_instance_callback = function (editor) {
      $(editor.getContainer())
        .find('button.tox-statusbar__wordcount')
        .click();
    };
  },
  mounted () {
    tinymce.init({});
    this.tinymceHtml = this.defaultTxt;
  },
  computed: {},
  watch: {
    value (val) {
      this.tinymceHtml = val;
    },
    tinymceHtml (val) {
      this.$emit('getContent', val);
    }
  },
  methods: {}
};
</script>
