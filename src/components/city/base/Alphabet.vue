<template>
  <div class="alphabet">
    <mt-index-list>
      <mt-index-section v-for='(city,key) of cities' :key="key" :index="key">
        <mt-cell v-for='(item,index) of city' :key="index" :title="item.name" @click="handleClick(item.name)"></mt-cell>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>

<script>
export default {
  props:["cities"],
  methods:{
    handleClick(city){
      //向仓库中存值
      this.$store.commit("changeCity",city);
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
  .alphabet{
    .mint-indexlist{
      .mint-indexlist-content{
        .mint-indexsection{
          .mint-indexsection-index{
            height: .3rem;
            background-color: #ccc;
            line-height: .3rem;
          }
        }
      }
      .mint-indexlist-nav{
        border: none;
        .mint-indexlist-navlist{
          .mint-indexlist-navitem{
            margin: .06rem 0;
            color:#26a2ff;
          }
        }
      }
    }
}
</style>