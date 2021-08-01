<template>
    <div class="test-container">
        <Empty />
    </div>
</template>

<script>
import Empty from "./";
export default {
  components: {
    Empty,
  },
};
</script>

<style>
.test-container {
    width: 150px;
    height: 200px;
    border: 2px solid #ddd;
    margin: 0 auto;
    position: relative;
}
</style>