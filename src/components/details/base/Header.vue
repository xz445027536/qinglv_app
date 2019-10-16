<template>
  <div class="header">
    <router-link v-show='isShow' class="header-goback iconfont icon-fanhui" to="/">
    </router-link>
    <div class="header-fixed" v-show='!isShow' :style="styleObj">
        <router-link class='iconfont icon-fanhui header-back' tag="i" to="/"></router-link>
      <div class="header-title">{{sightName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props:['sightName'],
  data(){
    return{
      isShow:true,
      styleObj:{}
    }
  },
  methods:{
    handleScroll(){
      let scrollTop = document.documentElement.scrollTop
      if(scrollTop>40){
        this.isShow = false

        this.styleObj = {
          opacity:(scrollTop-40)/100
        }
      }else{
        this.isShow =  true
      }

    }
  }
}
</script>

<style lang="scss" scoped>
  .header{
    position:fixed;
    left:0;
    top:0;
    right:0;
    z-index:1;
    .header-goback{
      position:absolute;
      width: .8rem;
      border-radius: 50%;
      text-align: center;
      background-color: rgba(0, 0, 0, .8);
      color:#fff;
    }  
    .header-fixed{
      position:relative;
      width: 100%;
      background-color:#00bcd4;
      height:.88rem;
      color:#fff;
      text-align:center;
      .header-back{
        position:absolute;
        left:0;
        top:0;
        width:.8rem;
        color:#fff;
      }  
      .header-title{
        text-align:center;
        font-size:.32rem;
      }  
    }      
  }        
</style>