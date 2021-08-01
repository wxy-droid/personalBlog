<template>
  <div class="test-container">
    <ImagerLoader
      src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304"
      placeholder="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100"
    @load11="hanlderLoad11"
    />
  </div>
</template>

<script>
import ImagerLoader from "./";
export default {
  components: {
    ImagerLoader,
  },
  methods : {
      hanlderLoad11(){
          console.log('原始图片已经加载完成');
      }
  }
};
</script>

<style scoped>
.test-container {
  width: 500px;
  height: 400px;
  border: 2px solid;
  margin: 0 auto;
}
</style>