<template>
  <div class="page-content">
    基于 elementui 封装的组件
    <div class="title">季度选择组件</div>
    <quarter-picker
      width="170px"
      format="yyyy年q季度"
      value-format="yyyy-MM"
      placeholder="请选择季度"
      v-model="quarterDate"
      :disabled-date="disabledQuarter"
      @change="handleChangeQuarter"
    ></quarter-picker>
  </div>
</template>

<script>
import QuarterPicker from '@/components/common/quarter-picker.vue';
export default {
  name: 'EleComponent',
  components: { QuarterPicker },
  data () {
    return {
      disabledQuarter: time => {
        const now = new Date();
        return (
          time.getFullYear() > now.getFullYear() || (time.getFullYear() === now.getFullYear() && parseInt(time.getMonth() / 3) >= parseInt(now.getMonth() / 3) + 1)
        );
      },
      dataYear: null,
      dataQuarter: null,
      quarterDate: '2022-09'
    };
  },
  methods: {
    handleChangeQuarter (data) {
      // 返回 年-月
      const value = data && data.split('-');
      this.dataYear = Number(value[0]);
      const month = Number(value[1]);
      const currQuarter = Math.floor(
        month % 3 === 0 ? month / 3 : month / 3 + 1
      );
      this.dataQuarter = currQuarter;
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  line-height: 40px;
}

</style>
