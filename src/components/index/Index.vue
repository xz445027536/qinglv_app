<template>
  <div class="index">
    <index-header></index-header>
    <index-swiper></index-swiper>
    <index-hot :hotlist="recommendList"></index-hot>
  </div>
</template>

<script>
import { getIndex } from "@/api";
import IndexHeader from "./base/Header";
import IndexSwiper from "./base/Swiper";
import IndexHot from "./base/Hot";
export default {
  data() {
    return {
      recommendList:[]
    };
  },
  components: { IndexHeader, IndexSwiper, IndexHot },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let {recommendList} = await getIndex();
      this.recommendList=recommendList;
    }
  },
  activated(){
    this.getData();
  }
};
</script>

<style lang="scss">
</style>