<template>
  <div id="homepage">
    <span class="spinner"></span>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class HomePage extends Vue {
    mounted() {
      setTimeout(() => {
        this.$router.push('/lookup')
      }, 1000)
    }
  }
</script>
<style lang="scss">
  #homepage {
    display: grid;
    align-items: center;
  }
</style>
