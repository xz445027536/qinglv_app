<template>
  <div class="details">
    <details-banner></details-banner>
  </div>
</template>

<script>
import {getDetails} from '@/api'
import DetailsBanner from './base/banner'
export default {
  components:{DetailsBanner},
  created(){
    this.getData()
  },
  methods:{
    async getData(){
      let a=await getDetails(this.$route.params.id);
      console.log(a)
    }
  }
}
</script>

<style>

</style>