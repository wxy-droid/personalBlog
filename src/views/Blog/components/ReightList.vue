<template>
  <ul class="right-list-container">
    <li v-for="(item, i) in list" :key="i">
      <span 
      @click="hanldeClick(item)"
      :class="{ active: item.isSelect
      }">{{item.name}}</span>
      <span
      v-if="item.aside"
      @click="hanldeClick(item)"
      class="aside"
      :class="{ active: item.isSelect }"
      >{{ item.aside }}</span>
      <!-- 显示当前组件 -->
      <RightList :list="item.children" @select="hanldeClick"/>
    </li>
  </ul>
</template>

<script>
export default {
    name : "RightList",
  // [ {name : 'xxx', isSelect: true, Children: [ {name : 'yyy' isSelect: false} ]} ];
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods : {
      hanldeClick(item){
          this.$emit('select', item);
      }
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.right-list-container {
    list-style: none;
    padding: 0;
    .right-list-container {
        margin-left: 1em;
    }
    li {
        min-height: 40px;
        line-height: 40px;
        font-size: 14px;
        cursor: pointer;
        .active {
            color: @warn;
            font-weight: bold;
        }
    }
}
.aside {
  font-size: 13px;
  margin-left: 1em;
  color: @gray;
}
</style>