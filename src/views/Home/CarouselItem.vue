<template>
  <div 
  class="carouselItem-container" 
  ref="container"
  @mousemove="handleMouseMove"
  @mouseleave="handleMouseLeave"
  >
    <div class="img-container" :style="imagePosition"  ref="image">
      <ImageLoader
        @load11="handleWidth"
        :src="carouse.bigImg"
        :placeholder="carouse.midImg"
      />
    </div>
    <!-- <div class="text">横坐标：{{ mouseX }} 纵坐标：{{ mouseY }}</div> -->
    <div class="title" ref="title">{{ carouse.title }}</div>
    <div class="description" ref="desc">{{ carouse.description }}</div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  props: ["carouse"],
  components: {
    ImageLoader,
  },
  data() {
    return {
      titleWidth: 0, //标题宽度
      descWidth: 0, // 描述宽度
      containerSize: null, // 外层容器的尺寸
      imageSize: null, // 里层图片的尺寸
      mouseX: 0, // 鼠标的横坐标
      mouseY: 0, // 鼠标的纵坐标
    };
  },
  computed: {
    // 得到图片坐标
    imagePosition() {
      if (!this.imageSize || !this.containerSize) {
        return;
      }
      // 多出的宽高
      const chazhiX = this.imageSize.width - this.containerSize.width;
      const chazhiY = this.imageSize.height - this.containerSize.height;
      // 容器的宽高要和多出的宽高成比例  
      const left = (-chazhiX / this.containerSize.width) * this.mouseX;
      const top = (-chazhiY / this.containerSize.height) * this.mouseY;
      return {
          transform: `translate(${left}px, ${top}px)`,
      }
    },
    // 得到图片初始居中的坐标
    center(){
      return {
        x : this.containerSize.width / 2,
        y : this.containerSize.height / 2,
      }
    }
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth; ////标题宽度
    this.descWidth = this.$refs.desc.clientWidth; // 描述宽度
    // 当dom元素加载完成后给容器赋值
    this.setSize();
    this.mouseX = this.center.x;
    this.mouseY = this.center.y;
    // 当容器尺寸发生变化时重新给容器尺寸赋值
    window.addEventListener('resize', this.setSize);
  },
  destroyed(){
    window.removeEventListener('resize', this.setSize);
  },
  methods: {
    // 调用该方法 显示文字
    handleWidth() {
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;
      // 强制让浏览器渲染一次
      this.$refs.title.clientWidth;
      this.$refs.title.style.transition = "1s";
      this.$refs.title.style.width = this.titleWidth + "px";

      this.$refs.desc.style.opacity = 1;
      this.$refs.desc.style.width = 0;
      // 强制让浏览器渲染一次
      this.$refs.desc.clientWidth;
      this.$refs.desc.style.transition = "1s .5s";
      this.$refs.desc.style.width = this.descWidth + "px";
    },
    // 外层容器和图片容器的尺寸
    setSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
      this.imageSize = {
        width: this.$refs.image.clientWidth,
        height: this.$refs.image.clientHeight,
      };
    },
    // 鼠标移动坐标的位置
    handleMouseMove(e){
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    handleMouseLeave(){
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    }
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.carouselItem-container {
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  overflow: hidden;
}
.img-container {
  width: 110%;
  height: 110%;
  position: absolute;
  transition: .3s;
}
// .text {
//   position: absolute;
//   left: 0;
//   top: 0;
//   color: #fff;
//   font-size: 20px;
// }
.title,
.description {
  position: absolute;
  left: 30px;
  color: #fff;
  letter-spacing: 3px;
  text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(0, 0, 0, 0.5) 0 -1px 0 rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  overflow: hidden;
  opacity: 0;
}
.title {
  top: calc(50% - 40px);
  font-size: 2em;
}
.description {
  top: calc(50% + 20px);
  font-size: 1.2em;
  color: lighten(@gray, 20%);
}
</style>