<template>
    <div class="test-container">
        <Contact />
    </div>
</template>

<script>
import Contact from "./"
export default {
    components : {
        Contact
    }
}
</script>

<style lang="less">
@import "~@/styles/global.less";
.test-container {
    width: 250px;
    height: 400px;
    border: 2px solid;
    background-color: #000;
    margin: 0 auto;
    padding-top: 150px;
}
</style>