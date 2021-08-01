<template>
  <div 
  class="home-container" 
  ref="container" 
  @wheel="handlerWheel"
  v-loading="loading"
  >
    <ul
      class="ul-container"
      :style="{
        marginTop,
      }"
      @transitionend="handleTransitionEnd"
    >
      <li v-for="item in data" :key="item.id">
        <CarouselItem :carouse="item" />
      </li>
    </ul>
    <div class="icon icon-up" v-show="index >= 1" @click="switchTo(index - 1)">
      <Icon type="arrowUp" />
    </div>
    <div
      class="icon icon-down"
      v-show="index < data.length - 1"
      @click="switchTo(index + 1)"
    >
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
      <li
        v-for="(item, i) in data"
        :key="item.id"
        :class="{ active: i === index }"
        @click="switchTo(i)"
      ></li>
    </ul>
  </div>
</template>

<style scoped lang="less">
@import "~@/styles/var.less";
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  ul {
    margin: 0;
    padding: 0;
  }
}

.ul-container {
  width: 100%;
  height: 100%;
  transition: 0.5s;
  li {
    width: 100%;
    height: 100%;
  }
}

.icon {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
  color: @gray;
  cursor: pointer;
  @weiyi: 25px;
  &.icon-up {
    top: @weiyi;
    animation: jump-up 2s infinite;
  }
  &.icon-down {
    bottom: @weiyi;
    animation: jump-down 2s infinite;
  }
  @jump: 5px;
  @keyframes jump-up {
    0% {
      transform: translate(-50%, @jump);
    }
    50% {
      transform: translate(-50%, -@jump);
    }
    100% {
      transform: translate(-50%, @jump);
    }
  }
  @keyframes jump-down {
    0% {
      transform: translate(-50%, -@jump);
    }
    50% {
      transform: translate(-50%, @jump);
    }
    100% {
      transform: translate(-50%, -@jump);
    }
  }
}

.indicator {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  li {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: @words;
    cursor: pointer;
    margin-bottom: 10px;
    border: 1px solid #fff;
    box-sizing: border-box;
    &.active {
      background: #fff;
    }
  }
}
</style>

<script>
// import { getBanners } from "@/appi/banner.js";
import CarouselItem from "./CarouselItem";
import Icon from "@/components/Icon";
import { mapState } from "vuex";
// import FetchData from "@/mixins/fetchData.js";
export default {
  // mixins: [FetchData([])],
  components: {
    CarouselItem,
    Icon,
  },
  data() {
    return {
      index: 0, // 索引值
      containerHeight: 0, // 总容器高度
      switchWheel: false, // 是否在滚动中
    };
  },
  created() {
    this.$store.dispatch('banner/fetchBanners');
  },
  // 当dom元素生成后 渲染总容器高度
  mounted() {
    this.containerHeight = this.$refs.container.clientHeight;
    // 窗口大小发生改变重新赋值
    window.addEventListener("resize", this.hanlderResize);
  },
  // 当组件被移除时
  destroyed() {
    window.removeEventListener("resize", this.hanlderResize);
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
    ...mapState('banner', ["loading"]),
    ...mapState('banner', ["data"])
  },
  methods: {
    // async fetchData(){
    //   return await getBanners();
    // },
    // 切换轮播图
    switchTo(i) {
      this.index = i;
    },
    hanlderResize() {
      this.containerHeight = this.$refs.container.clientHeight;
    },
    // 鼠标滚动切换轮播图
    handlerWheel(e) {
      if (this.switchWheel) {
        // 在滚动中啥都不做
        return;
      }
      if (e.deltaY < -10 && this.index > 0) {
        this.switchWheel = true;
        this.index--;
      } else if (e.deltaY > 10 && this.index < this.data.length - 1) {
        this.switchWheel = true;
        this.index++;
      }
    },
    handleTransitionEnd() {
      this.switchWheel = false;
    },
  },
};
</script>
