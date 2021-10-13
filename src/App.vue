<template>
  <div id="app">
    <app-header />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import { EthereumProvider } from '@manifoldxyz/manifold-sdk'
  import { setProviderEventsHandler } from "@manifoldxyz/manifold-dropsitetools-lib"
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import AppHeader from "@/components/AppHeader.vue"

  @Component({
    components: {
      AppHeader
    }
  })
  export default class App extends Vue {
    created() {
      setProviderEventsHandler(this.handleConnection)
    }

    async handleConnection() {

    }
  }
</script>

<style lang="scss"> // Do not scope
  * {
    font-family: 'Chivo', sans-serif !important;
    color: white !important;
  }

  #app {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>
