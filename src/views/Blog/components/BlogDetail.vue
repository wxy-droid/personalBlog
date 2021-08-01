<template>
  <div class="blog-detail-container">
    <h1>{{ obj.title }}</h1>
    <div class="aside">
      <span>日期：{{ formatDate(obj.createDate) }}</span>
      <span>浏览：{{ obj.scanNumber }}</span>
      <a href="#data-form-container">评论：{{ obj.commentNumber }}</a>
      <RouterLink 
      :to="{
        name : 'category',
        params : {
          categoryId : obj.category.id
        }
      }"
      >
      {{ obj.category.name }}
      </RouterLink>
    </div>
    <div v-html="obj.htmlContent" class="markdown-body"></div>
  </div>
</template>

<script>
import formatDate from "@/utils/formatDate.js";
import "@/styles/markdown.css";
import "highlight.js/styles/github.css";
export default {
  props: {
    obj: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate,
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.aside {
  font-size: 13px;
  color: @gray;
  span,
  a {
    margin-right: 15px;
  }
}
.markdown-body {
  margin: 2em 0;
}
</style>