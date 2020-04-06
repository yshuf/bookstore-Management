<template>
  <div class="hello">
    <el-button type="info" @click="loginout">退出</el-button>
  </div>
</template>

<script>
export default{
  name: "Home",
  props: {
    msg: String
  },
  data() {
    return {
      
    }
  },
  methods:{
    loginout(){
      window.sessionStorage.clear();
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped lang="less">

</style>
