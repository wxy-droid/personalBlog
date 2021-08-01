<template>
  <div>
    <Pager :current="current" :total="total" @pageChange="handlePagerChange"/>
  </div>
</template>

<script>
import Pager from './'
export default {
  components : {
    Pager,
  },
  data(){
    return {
      current : 1,
      total : 300,
    }
  },
  methods : {
    handlePagerChange(newPager){
      console.log(newPager);
      this.current = newPager;
    }
  }
};
</script>

<style scoped></style>
