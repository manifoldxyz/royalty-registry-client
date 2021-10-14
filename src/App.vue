<template>
  <div id="app">
    <app-header />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import AppHeader from "@/components/AppHeader.vue"

  @Component({
    components: {
      AppHeader
    }
  })
  export default class App extends Vue {
    created() {

    }

    async handleConnection() {

    }
  }
</script>

<style lang="scss"> // Do not scope
  #app {
    width: 100%;
    height: 100%;
    position: relative;
    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>
