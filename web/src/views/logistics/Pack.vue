<template>
  <div>
    <nav-layout></nav-layout>
    <router-view></router-view>
  </div>
</template>
<script>
import NavLayout from "../navlayout/NavLayout";
export default {
  data() {
    return {};
  },
  components: { NavLayout }
};
</script>