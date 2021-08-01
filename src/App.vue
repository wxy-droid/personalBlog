<template>
  <div class="app-container">
    <Layout>
      <template #left>
          <div class="left">
              <SiteAside />
          </div>
      </template>
      <template>
          <RouterView />
      </template>
    </Layout>
    <ToTop />
  </div>
</template>

<script>
import Layout from "@/components/Layout";
import SiteAside from "@/components/SiteAside";
import ToTop from "@/components/ToTop";
export default {
  components: {
    Layout,
    SiteAside,
    ToTop,
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
.app-container {
  .self-fill(fixed);
  .left {
    width: 250px;
    height: 100%;
  }
  .main {
    width: 100%;
    height: 100%;
  }
}
</style>



