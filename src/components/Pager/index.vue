<template>
  <!-- 只有在页数大于1才显示 -->
  <div class="pager-container" v-if="pagerNumber > 1">
    <a @click="handleClick(1)" :class="{ disabled: current === 1 }"
      >|&lt;&lt;</a
    >
    <a @click="handleClick(current - 1)" :class="{ disabled: current === 1 }">&lt;&lt;</a>
    <a
      @click="handleClick(n)"
      v-for="(n, i) in numbers"
      :key="i"
      :class="{ active: n === current }"
    >
      {{ n }}
    </a>
    <a @click="handleClick(current + 1)" :class="{ disabled: current === pagerNumber }"
      >&gt;&gt;</a
    >
    <a @click="handleClick(pagerNumber)" :class="{ disabled: current === pagerNumber }"
      >&gt;&gt;|</a
    >
  </div>
</template>

<style lang="less" scoped>
@import "~@/styles/var.less";
.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  a {
    color: @primary;
    margin: 0 6px;
    cursor: pointer;
    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: @words;
      font-weight: bold;
      cursor: text;
    }
  }
}
</style>

<script>
export default {
  props: {
    // 当前页码
    current: {
      type: Number,
      default: 1,
    },
    // 总数据量
    total: {
      type: Number,
      default: 0,
    },
    // 页容量
    limit: {
      type: Number,
      default: 10,
    },
    // 可见页码数
    visibleNumber: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    // 总页数
    pagerNumber() {
      return Math.ceil(this.total / this.limit);
    },
    // 得到显示的最小数字
    visibleMin() {
      let min = this.current - Math.floor(this.visibleNumber / 2);
      if (min < 1) {
        min = 1;
      }
      return min;
    },
    // 得到显示的最大数字
    visibleMax() {
      let max = this.visibleMin + this.visibleNumber - 1;
      if (max > this.pagerNumber) {
        max = this.pagerNumber;
      }
      return max;
    },
    numbers() {
      let nums = [];
      for (let i = this.visibleMin; i <= this.visibleMax; i++) {
        nums.push(i);
      }
      return nums;
    },
  },
  methods: {
    handleClick(newPager) {
        if (newPager < 1) {
            newPager = 1;
        }
        if (newPager > this.pagerNumber) {
            newPager = this.pagerNumber
        }
        if (newPager == this.current) {
            return;
        }
        this.$emit("pageChange", newPager);
    },
  },
};
</script>