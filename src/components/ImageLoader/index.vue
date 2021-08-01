<template>
  <div class="ImagerLoader-container">
    <img v-if="!everythingDone" :src="placeholder" class="placeholder" />
    <img
      @load="hanlderLoad"
      :src="src"
      :style="{
        opacity: originLoader1,
        transition: `${duration}ms`,
      }"
    />
  </div>
</template>

<script>
export default {
  props: {
    // 原始图片的路径
    src: {
      type: String,
      required: true,
    },
    // 原始图片加载完成前的占位图片
    placeholder: {
      type: String,
      required: true,
    },
    // 原始图片加载完成后，切换到原始图经过的毫秒数
    duration: {
      type: Number,
      default: 2000,
    },
  },
  data() {
    return {
      originLoader: false, //原图是否加载完成
      everythingDone: false, //是否所有资源都加载完成
    };
  },
  computed: {
    originLoader1() {
      return this.originLoader ? 1 : 0;
    },
  },
  methods : {
      hanlderLoad(){
          this.originLoader = true;
          setTimeout(() => {
              this.everythingDone = true;
              this.$emit('load11');
          }, this.duration)
      }
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
.ImagerLoader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    .self-fill();
    // 图片比例不变
    object-fit: cover;
  }
  .placeholder {
    // 增加模糊
    filter: blur(2vw);
  }
}
</style>