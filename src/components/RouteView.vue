<template>
  <!-- <keep-alive include="a, b"> -->
    <router-view />
  <!-- </keep-alive> -->
</template>

<script>
export default {
  props: {
    keepAlive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>