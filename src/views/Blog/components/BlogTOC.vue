<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <RightList :list="newTocArray" @select="hanldClick" />
  </div>
</template>

<script>
import RightList from "./ReightList";
import fangdou from "@/utils/fangdou.js";
export default {
  components: {
    RightList,
  },
  props: {
    toc: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeAnchor: "",
    };
  },
  computed: {
    // 将得到的数据toc与activeAnchor结合形成带有isSelect属性的数组
    newTocArray() {
      const newtoc = (toc = []) => {
        return toc.map((t) => ({
          ...t,
          isSelect: t.anchor === this.activeAnchor,
          children: newtoc(t.children),
        }));
      };
      return newtoc(this.toc);
    },
    // 得到所有带锚点的h1的dom
    doms() {
      const doms = [];
      const addDoms = (toc) => {
        for (const item of toc) {
          doms.push(document.getElementById(item.anchor));
          if (item.children && item.children.length) {
            addDoms(item.children);
          }
        }
      };
      addDoms(this.toc);
      return doms;
    },
  },
  methods: {
    hanldClick(item) {
      location.hash = item.anchor;
    },
    // 设置activeAnchor为正确的值
    setSelect() {
      this.activeAnchor = ""; //为了避免查询赋值出错
      const range = 200; //设置h1元素距离视口顶部的距离不能大于200
      for (const item of this.doms) {
        // 看一下当前这个dom元素是不是应该被选中
        if (!item) {
          continue;
        }
        // 得到dom元素距离视口顶部的距离
        const top = item.getBoundingClientRect().top;
        // 当距离大于0 小于200时 成立
        if (top >= 0 && top <= range) {
          // 在规定范围内
          this.activeAnchor = item.id;
          return;
        } else if (top > range) {
          // 在规定范围外
          return;
        } else {
          // top < 0 这个时候也不确定到底是不是被选中
          // 在规定范围内都可以
          this.activeAnchor = item.id;
        }
      }
    },
  },
  created() {
    this.setSelectFangdou = fangdou(this.setSelect, 50);
    this.$Bus.$on("mainScroll", this.setSelectFangdou);
  },
  destroyed() {
    this.$Bus.$off("mainScroll", this.setSelectFangdou);

  }
};
</script>

<style scoped lang="less">
.blog-toc-container {
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>