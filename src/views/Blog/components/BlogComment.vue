<template>
  <div class="blog-comment-container">
    <MessageArea 
      title="评论列表"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData.js";
import {getCommentType, postComment} from "@/appi/blog.js";
export default {
    mixins : [fetchData({ total: 0, rows: []})],
    components : {
       MessageArea, 
    },
    data() {
      return {
        page : 1,
        limit : 10
      }
    },
    created() {
      this.$Bus.$on('mainScroll', this.handleScroll);
    },
    destroyed() {
      this.$Bus.$off('mainScroll', this.handleScroll);
    },
    computed : {
      hasMore() {
        return this.data.rows.length < this.data.total;
      }
    },
    methods : {
      handleScroll(dom){
        if (this.isLoading || !dom) {
          // 目前正在加载更多中
          return;
        }
        const range = 100;
        const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
        if (dec <= range) {
          // 满足条件 加载更多
          this.fetchDataTow();
        }
      },
      // 加载数据
      async fetchData() {
        return await getCommentType(
          this.$route.params.id,
          this.page,
          this.limit
        );
      },
      // 加载下一页数据
      async fetchDataTow() {
          if (!this.hasMore) {
            // 表示数据已经加载完成 没有了
            return;
          }
          this.isLoading = true;
          this.page++;
          let resp = await this.fetchData();
          this.data.total = resp.total;
          this.data.rows = this.data.rows.concat(resp.rows);
          this.isLoading = false;
      },

      // 接收提交评论
      async handleSubmit(formData, callback){
        const resp = await postComment({
          blogId : this.$route.params.id,
          ...formData
        })
        this.data.rows.unshift(resp);
        this.data.total++;
        callback('评论成功');
      }
    }
}
</script>

<style scoped>
.blog-comment-container {
  margin: 30px 0; 
}
</style>