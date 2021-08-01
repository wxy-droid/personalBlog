<template>
  <Layout>
     <div ref="mianContainer" class="mian-container" v-loading="isLoading">
       <BlogDetail :obj="data" v-if="data"/>
       <BlogComment v-if="!isLoading"/>
     </div>
     <template #right>
       <div class="right-container" v-loading="isLoading">
          <BogTOC :toc="data.toc" v-if="data"/>
         </div> 
     </template>
  </Layout>
</template>

<script>
import BlogComment from "./components/BlogComment";
import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail";
import BogTOC from "./components/BlogTOC";
import fetchData from "@/mixins/fetchData.js";
import {getblog} from "@/appi/blog";
import mainScroll from "@/mixins/mainScroll.js";
import { titleCotroll } from "@/utils";
export default {
  mixins : [fetchData(null), mainScroll("mianContainer")],
  components: {
    Layout,
    BlogDetail,
    BogTOC,
    BlogComment,
  },
  methods : {
    async fetchData() {
      const resp =  await getblog(this.$route.params.id);
      titleCotroll.setRouterTitle(resp.title);
      return resp;
    },
  },
  updated() {
    let hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  }
};
</script>

<style scoped lang="less">
.mian-container {
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
.right-container {
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  position: relative;
  padding: 20px;
}
</style>