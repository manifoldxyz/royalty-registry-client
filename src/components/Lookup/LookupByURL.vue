<template>
  <div id="lookup-by-url" class="bar-field">
    <label>
      Search By URL
    </label>
    <input type="text" placeholder="https://example.org/0x0123456789abcdef/1" />
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class LookupByURL extends Vue {

  }
</script>
<style lang="scss">
  #lookup {
    width: 100%;
    height: 100%;
  }
</style>
