<template>
  <div class="siteAside-container">
    <Avatar v-if="data" :url="data.avatar" />
    <h1 v-if="data" class="title">{{ data.siteTitle }}</h1>
    <Menu />
    <Contact />
    <p class="footer" v-if="data">
      {{ data.icp }}
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Avatar from "@/components/Avatar";
import Menu from "./Menu"
import Contact from "./Contact";
import { titleCotroll } from "@/utils";
export default {
  components : {
    Avatar,
    Menu,
    Contact,
  },
  computed : {
    ...mapState('overall', ["data"]),
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.siteAside-container {
  width: 100%;
  height: 100%;
  background: @dark;
  padding: 20px 0;
  box-shadow: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  // border-radius: 5px;
}
.avatar-container {
  margin: 0 auto;
}
.title {
  font-size: 1.2em;
  color: #fff;
  text-align: center;
}
.footer {
  text-align: center;
  font-size: 12px;
}
</style>