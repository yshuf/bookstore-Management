<!--
 * @Description:
 * @Author: mobai
 * @Date: 2023-03-23 09:42:05
 * @LastEditors: mobai
 * @LastEditTime: 2023-06-29 14:34:38
 * @FilePath: \bookstore-Management\src\views\eleComponent\index.vue
-->
<template>
  <div class="page-content">
    基于 elementui 封装的组件
    <div class="title">季度选择组件（通过传递年月份）</div>
    <quarter-picker
      width="170px"
      format="yyyy年q季度"
      value-format="yyyy-MM"
      placeholder="请选择季度"
      v-model="quarterDate"
      :disabled-date="disabledQuarter"
      @change="handleChangeQuarter"
    ></quarter-picker>
    <div class="title">季度选择组件（通过传递年季度）</div>
    <quarter-picker-new
      width="170px"
      format="yyyy年q季度"
      value-format="yyyy-MM"
      placeholder="请选择季度"
      v-model="quarterDateNew"
      :disabled-date="disabledQuarter"
      @change="handleChangeQuarterNew"
    ></quarter-picker-new>
  </div>
</template>

<script>

import QuarterPicker from '@/components/common/quarter-picker.vue';
import QuarterPickerNew from '@/components/common/quarter-picker-new.vue';

export default {
  name: 'EleComponent',
  components: { QuarterPicker, QuarterPickerNew },
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
      quarterDate: '2022-09',
      quarterDateNew: '2022年3季度',
      wordcloud: null

    };
  },
  mounted () {
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
    },
    handleChangeQuarterNew () {

    }
  }
};
</script>

<style lang="less" scoped>
.title {
  line-height: 40px;
}
.words {
  width: 500px;
  height: 500px;
}

</style>
