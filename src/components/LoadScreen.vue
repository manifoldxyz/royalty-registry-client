<template>
  <div id="load-screen">
    <span class="spinner"></span>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component
  export default class LoadScreen extends Vue {}
</script>
<style lang="scss" scoped>
  #load-screen {
    width: 100%;
    height: 100%;
    display: grid;
    align-items: center;
    overflow: visible;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
</style>
