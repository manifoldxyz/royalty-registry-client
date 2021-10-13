<template>
  <header>
    <m-simple-connect :avatar="''" :show-chain="true" />
  </header>
</template>
<script lang="ts">
  import { EthereumProvider } from '@manifoldxyz/manifold-sdk'
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class AppHeader extends Vue {}
</script>
<style lang="scss" scoped>
  header {
    width: 100%;
    height: 140px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }
</style>
