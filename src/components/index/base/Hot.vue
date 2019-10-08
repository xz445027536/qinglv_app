<template>
  <div class="hot">
    <div class="hot-top">
      <img class="hot-top-img" src="../../../assets/images/hot.png" alt="">
      <span class="hot-top-title">热门景点推荐</span>   
    </div>
    <div class="hop-con">
      <div class="con-list" v-for="(item,index) of lists" :key="index">
        <router-link to="">
          <div class="con-top-img">
            <img :src="item.img_url" alt="">
          </div>
          <div class="con-top-con">
            <div class="con-title" v-text="item.title">世界之窗</div>
            <div class="score_comment">
              <span class="score">☆☆☆☆☆</span>
              <span class="comment">{{item.comment}}条评论</span>
            </div>
            <div class="price">
              ￥<em v-text="item.price"></em><span>起</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        lists:[
          {img_url:require('../../../assets/images/jxzh.jpg'),title:"世界之窗",comment:"13571",price:"129"}
        ]
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
        .router-link-exact-active{
          height: 100%;
          display: flex;
          .con-top-img{
            height: 100%;
            img{
              height: 100%;
            }
          }
          .con-top-con{
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
              .score{
                color:#ffb436;
              }
              .comment{
                margin-left: .1rem;
                font-size: .24rem;
                color:#616161;
              }
            }
            .price{
              margin-top: .18rem;
              height: .4rem;
              font-size: .2rem;
              color: #ff8300;
              em{
                font-size: .4rem;
              }
              span{
                color: #616161;
              }
            }
          }
        }
      }
    }
  }
</style>