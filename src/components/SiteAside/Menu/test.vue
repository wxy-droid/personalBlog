<template>
    <div class="test-container">
        <Menu />
    </div>
</template>

<script>
import Menu from "./"
import "@/styles/global.less";
export default {
    components : {
        Menu
    }
}
</script>

<style scoped lang="less">
.test-container {
    width: 250px;
    height: 400px;
    border: 2px solid;
    background-color: #000;
    margin: 0 auto;
}
</style>