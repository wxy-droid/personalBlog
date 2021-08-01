<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
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
import { getMessageType, postMessage } from "@/appi/message.js";
import mainScroll from "@/mixins/mainScroll.js";
export default {
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("messageContainer")],
  computed : {
    hasMore() {
      return this.data.rows.length < this.data.total;
    }
  },
  created() {
    this.$Bus.$on("mainScroll", this.handleScroll);
  },
  methods: {
    async fetchData() {
      return getMessageType(this.page, this.limit);
    },
    async handleScroll(dom){
        if (this.isLoading || !dom) {
          // 表示现在正在加载中
          return;
        }
        const range = 100;
        const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
        if (dec < 100) {
          this.fetchMore();
        }
    },
    // 加载更多 下一页
    async fetchMore() {
      if (!this.hasMore) {
        // 表示已经加载完成
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData()
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    // 接收提交评论
    async handleSubmit(data, callback) {
      const resp = await postMessage(data);
      callback("感谢您的留言");
      this.data.rows.unshift(resp);
      this.data.total++;
    }
  },
};
</script>

<style scoped lang="less">
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>