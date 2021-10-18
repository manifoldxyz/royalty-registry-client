<template>
  <div id="lookup-by-url" class="bar-field" :class="{error}">
    <label>
      Search By URL
    </label>
    <input type="text" placeholder="https://example.org/0x0123456789abcdef/1" @keydown="parseAdderss" />
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class LookupByURL extends Vue {
    error: boolean = false

    parseAdderss(url) {
      this.error = true
    }
  }
</script>
<style lang="scss">
  #lookup-by-url {
    width: 100%;
    height: 100%;

    &.error {
      input {
        outline: 1px solid rgba(255, 0, 0, 0.25);
        color: rgba(255, 0, 0, 0.75);
      }
    }
  }
</style>
