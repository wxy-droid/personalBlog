<template>
  <div class="top-container" v-show="show" @click="handleClick">
        Top  
  </div>
</template>

<script>
export default {
  data() {
    return {
      show : false
    }
  },
  created() {
    this.$Bus.$on('mainScroll', this.handleScroll);
  },
  methods : {
    handleScroll(dom){
      if (!dom) {
        this.show = false;
        return;
      }
      this.show = dom.scrollTop >= 500;
    },
    handleClick(){
      this.$Bus.$emit('setMainScroll', 0);
    }
  },
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.top-container {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: @primary;
    color: #fff;
    line-height: 50px;
    text-align: center;
    position: fixed;
    right: 50px;
    bottom: 50px;
    z-index: 99;
    cursor: pointer;
}
</style>