<template>
  <div class="details">
    <details-banner :sightName="sightName" :bannerImg="bannerImg" :gallaryImgs="gallaryImgs"></details-banner>
    <details-header :sightName="sightName"></details-header>
  </div>
</template>

<script>
import {getDetails} from '@/api'
import DetailsBanner from './base/banner'
import DetailsHeader from './base/Header'
export default {
  components:{DetailsBanner,DetailsHeader},
  data(){
    return{
      sightName:"",
      bannerImg:'',
      gallaryImgs:[],
      cardInfo:{},
      recommendInfo:[],
      calendarInfo:[],
      commentInfo:[]
    }
  },
  created(){
    this.getData()
  },
  methods:{
    async getData(){
      let {sightName,bannerImg,gallaryImgs,cardInfo,recommendInfo,calendarInfo,commentInfo}=await getDetails(this.$route.params.id);
      this.sightName=sightName;
      this.bannerImg=bannerImg;
      this.gallaryImgs=gallaryImgs;
      this.cardInfo=cardInfo;
      this.recommendInfo=recommendInfo;
      this.calendarInfo=calendarInfo;
      this.commentInfo=commentInfo;
    }
  }
}
</script>

<style lang="scss">
  .details{
    height: 40rem;
  }
</style>