<template>
  <div class="alphabet" @click.stop="handleClick($event)">
    <mt-index-list>
      <mt-index-section v-for="(city,key) of cities" :key="key" :index="key">
        <mt-cell v-for="(item,index) of city" :key="index" :title="item.name"></mt-cell>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>

<script>
export default {
  props: ["cities"],
  methods: {
    handleClick(e) {
      //向仓库中存值
      if (e.target.className=="mint-cell-wrapper" || e.target.className=="mint-cell-text" ||e.target.className=="mint-cell-title") {
         this.$store.commit("changeCity",e.path[0].innerText);
         this.$router.push('/')
        //console.log(e.path[0].innerText);
      }
    }
  }
};
</script>

<style lang="scss">
.alphabet {
  .mint-indexlist {
    .mint-indexlist-content {
      .mint-indexsection {
        .mint-indexsection-index {
          height: 0.3rem;
          background-color: #ccc;
          line-height: 0.3rem;
        }
      }
    }
    .mint-indexlist-nav {
      border: none;
      .mint-indexlist-navlist {
        .mint-indexlist-navitem {
          margin: 0.06rem 0;
          color: #26a2ff;
        }
      }
    }
  }
}
</style>