<!--
 * @Descripttion: 季度选择器
 * @version: 1.0
 * @Author: https://www.lervor.com/
 * @Date: 2021-12-06
 * @LastEditTime: 2023-03-27 15:56:37
-->
<template>
  <el-popover
    trigger="focus"
    v-model="pickerVisible"
    popper-class="lervor-quarter-popover"
    :disabled="disabled"
  >
    <el-input
      ref="reference"
      slot="reference"
      class="el-date-editor"
      readonly
      :disabled="disabled"
      :size="size"
      :placeholder="placeholder"
      :value="value"
      :validate-event="false"
      :style="{ width }"
      @mouseenter.native="handleMouseEnter"
      @mouseleave.native="showClose = false"
    >
      <i slot="prefix" class="el-input__icon" :class="triggerClass"> </i>
      <i
        slot="suffix"
        class="el-input__icon"
        :class="[showClose ? '' + clearIcon : '']"
        @click="handleClickIcon"
        @mousedown="handleMousedownIcon"
      >
      </i>
    </el-input>
    <div class="lervor-quarter-picker custom-date-dropdown">
      <div class="el-date-picker__header el-date-picker__header--bordered">
        <button
          type="button"
          aria-label="前一年"
          class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"
          @click="prevYear"
        ></button>
        <span role="button" class="el-date-picker__header-label">{{
          yearLabel
        }}</span>
        <button
          type="button"
          aria-label="后一年"
          class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"
          @click="nextYear"
        ></button>
      </div>
      <div
        class="el-picker-panel__content"
        style="width: 200px; margin: 10px 15px"
      >
        <table class="lervor-quarter-table" @click="handleTableClick">
          <tbody>
            <tr>
              <td class="available" :class="getCellStyle(0)">
                <a class="cell">第一季度</a>
              </td>
              <td class="available" :class="getCellStyle(1)">
                <a class="cell">第二季度</a>
              </td>
            </tr>
            <tr>
              <td class="available" :class="getCellStyle(2)">
                <a class="cell">第三季度</a>
              </td>
              <td class="available" :class="getCellStyle(3)">
                <a class="cell">第四季度</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </el-popover>
</template>

<script>
import {
  formatDate,
  prevYear,
  nextYear,
  range,
  nextDate,
  isDateObject,
  parseDate
} from 'element-ui/src/utils/date-util';
import { hasClass } from 'element-ui/src/utils/dom';

// 获取指定年份和季度的所有日期
const datesInYearAndQuarter = (year, quarter) => {
  const numOfDays = getDayCountOfQuarter(year, quarter);
  const firstDay = new Date(year, quarter * 3, 1);
  return range(numOfDays).map(n => nextDate(firstDay, n));
};

// 获取指定年份和季度总天数
const getDayCountOfQuarter = (year, quarter) => {
  switch (quarter) {
    case 0: // 第一季度包含二月，需要对是否闰年进行判断处理
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return 91;
      } else {
        return 90;
      }
    case 1:
      return 91;
    default:
      return 92;
  }
};

export default {
  name: 'QuarterPicker',
  props: {
    size: String,
    format: String, // 显示在输入框中的格式，引入季度：q（阿拉伯数字）、Q（中文数字）
    valueFormat: String,
    placeholder: String,
    prefixIcon: String,
    clearIcon: {
      type: String,
      default: 'el-icon-circle-close'
    },
    disabled: Boolean,
    clearable: {
      type: Boolean,
      default: true
    },
    width: {
      // 组件宽度
      type: String,
      default: ''
    },
    disabledDate: {}, // 不可用的日期
    value: null
  },
  data () {
    return {
      showClose: false,
      pickerVisible: false,
      date: new Date(),
      quarterText: ['一', '二', '三', '四'],
      yearLabel: '',
      year: '', // 年份
      quarter: 0 // 季度
    };
  },
  // 这里可以省略 model属性 v-model中的prop就是把value用作prop，input用作event
  // model: {
  //   prop: 'value', // 定义v-model的值传递给那个prop属性
  //   event: 'change' // 定义此事件触发时，自动更新父组件v-model对应的数据
  // },
  computed: {
    triggerClass () {
      return this.prefixIcon || 'el-icon-date';
    },
    parsedValue () {
      if (!this.value) {
        return this.value;
      }
      if (isDateObject(this.value)) {
        return this.value;
      }
      // 非时间格式且设置了valueFormat，进行时间转换
      if (this.valueFormat) {
        return parseDate(this.value, this.valueFormat);
      }
      // 非时间格式且未设置valueFormat，再尝试转换时间
      return new Date(this.value);
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        if (!val) return;
        // 返显
        this.year = val.split('年')[0];
        this.quarter = Number(val.split('年')[1].split('季度')[0]);
      }
    },
    year: {
      immediate: true,
      handler (val) {
        this.yearLabel = val + '年';
      }
    }
  },
  mounted () {
  },
  methods: {
    handleMouseEnter () {
      if (this.disabled) return;
      if (this.value && this.clearable) {
        this.showClose = true;
      }
    },
    handleClickIcon (event) {
      if (this.disabled) return;
      if (this.showClose) {
        this.$emit('input', null);
        this.$emit('change', null);
        this.showClose = false;
        this.pickerVisible = false;
        this.$refs.reference.blur();
      }
    },
    handleMousedownIcon (event) {
      // 阻止鼠标按下清空按钮，防止清空数据时季度选择面板闪现
      event.preventDefault();
    },
    handleTableClick (event) {
      let target = event.target;
      if (target.tagName === 'A') {
        target = target.parentNode;
      }
      if (target.tagName !== 'TD') return;
      if (hasClass(target, 'disabled')) return;
      const column = target.cellIndex;
      const row = target.parentNode.rowIndex;
      // 季度，从0开始
      const quarter = row * 2 + column;
      // 季度开始月份，从0开始
      const month = quarter * 3;
      let newDate = new Date(this.year, month, 1);
      if (this.valueFormat) {
        newDate = formatDate(newDate, this.valueFormat); // 返回年月 比如2023-02
      }
      this.pickerVisible = false;
      console.log(newDate, this.year + '-' + quarter + 1, '选择数据值');
      this.$emit('input', newDate);
      this.$emit('change', newDate);
    },
    prevYear () {
      this.year = Number(this.year) - 1;
    },
    nextYear () {
      this.year = Number(this.year) + 1;
    },
    getCellStyle (quarter) {
      console.log(this.quarter, '当前季度');
      const style = {};
      const today = new Date();
      const date = this.parsedValue ? this.parsedValue : today;
      style.disabled =
        typeof this.disabledDate === 'function'
          ? datesInYearAndQuarter(this.year, quarter).every(this.disabledDate)
          : false;
      // 当前选中的季度样式
      style.current =
        date.getFullYear() === this.year &&
        this.quarter === Number(quarter + 1);
      // 今日所在季度样式
      style.quarter =
        today.getFullYear() === this.year &&
        parseInt(today.getMonth() / 3) === quarter;
      return style;
    }
  }
};
</script>

<style lang="less" scoped>
//主颜色
@baseColor: #1492ff;
//标题、辅助文字
@baseFontColor: rgba(0, 0, 0, 0.85);
//次要、失效文字
@disabledFontColor: rgba(0, 0, 0, 0.25);
/* stylelint-disable */
.lervor-quarter-picker {
  line-height: 30px;
}
.lervor-quarter-table {
  width: 100%;
  margin: -1px;
  font-size: 12px;
  border-collapse: collapse;
}
.lervor-quarter-table td {
  padding: 20px 8px 10px;
  text-align: center;
  cursor: pointer;
}
.lervor-quarter-table td .cell {
  display: block;
  height: 24px;
  margin: 0 auto;
  line-height: 24px;
  color: @baseFontColor;
  padding: 0 10px;
  width: fit-content;
  border-radius: 4px;
}
.lervor-quarter-table td .cell:hover {
  color: @baseFontColor;
  background: rgba(0, 0, 0, 0.05);
}

.lervor-quarter-table td.current:not(.disabled) .cell {
  color: white;
  background-color: @baseColor;
  font-weight: 600 !important;
  height: 24px;
  line-height: 24px;
}

.lervor-quarter-table td.quarter .cell {
  color: @baseColor;
}

.lervor-quarter-table td.disabled .cell {
  color: @disabledFontColor;
  cursor: not-allowed;
  background: rgba(0, 0, 0, 0.05);
}
</style>
