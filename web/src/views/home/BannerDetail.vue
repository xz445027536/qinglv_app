<template>
  <div>
    <img :src="imgSrc" width="100%">
  </div>
</template>
<script>
  export default {
    data() {
      return {
        imgSrc: ''
      }
    },
    created() {
      this.imgSrc = this.$route.query.img
    }
  }
</script>