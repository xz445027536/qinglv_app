<template>
  <div class="hot">
    <div class="hot-top">
      <img class="hot-top-img" src="../../../assets/images/hot.png" alt="">
      <span class="hot-top-title">热门景点推荐</span>   
    </div>
    <div class="hop-con">
      <div class="con-list" v-for="(item,index) of hotlist" :key="index">
        <router-link class="item" :to="{name:'details',params:{id:item.id}}">
          <img class="item-img" :src="item.imgUrl" alt="">
          <div class="con-top-con">
            <div class="con-title" v-text="item.title"></div>
            <div class="score_comment">
              <i class="iconfont icon-star" v-for="(i,index) in 5" :key="index"></i>
              <span class="comment">{{item.comment}}条评论</span>
            </div>
            <div class="price">
              <div class="item-price">
                ￥<span v-text="item.price"></span><i>起</i>
              </div>
              <div class="item-area" v-text="item.area"></div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:["hotlist"],
    filters:{
      star(score){
        return{
          width:score*100/5+"%"
        }
      }
    }
  }
</script>

<style lang="scss">
  .hot{
    .hot-top{
      padding:.24rem 0;      
      .hot-top-img{
        width: .3rem;
        height: .3rem;
        margin-top: .07rem;
        margin-left: .2rem;
        vertical-align: top;
      }
      .hot-top-title{
        display: inline-block;
        height: .44rem;
        margin-left: .06rem;
        line-height: .44rem;
        font-size: .32rem;
      }
    }
    .hop-con{
      .con-list{
        height: 2rem;
        padding:.2rem;
        .item{
          display: flex;
          img.item-img{
            width: 2rem;
            height: 2rem;
          }
          .con-top-con{
            flex: 1;
            padding-left: .2rem;
            .con-title{
              height: .44rem;
              margin-top: .26rem;
              line-height: .44rem;
              font-size: .32rem;
              color: #212121;
            }
            .score_comment{
              height: .34rem;
              margin-top: .14rem;
              .icon-star{
                font-size: .28rem;
                color:#ff8300;
              }
              .comment{
                margin-left: .1rem;
                font-size: .24rem;
                color:#616161;
              }
            }
            .price{
              display: flex;
              height: .4rem;
              margin-top: .18rem;
              line-height: .4rem;
              font-size: .2rem;
              color: #ff8300;
              .item-price{
                flex: 1;
                span{
                  font-size: .4rem;
                }
                i{
                  color: #616161;
                }
              }
              .item-area{
                text-align: right;
                color: #616161;
              }
            }
          }
        }
      }
    }
  }
</style>