<template>
  <div class="lookup-toggle">
    <div>
      <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 0L0 5H10L5 0Z" fill="black" />
      </svg>
      <span>
        By URL
      </span>
    </div>
    <div>
      <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 5L10 -4.76837e-07L-5.1656e-07 -1.35107e-06L5 5Z" fill="black" />
      </svg>
      <span>By Token ID</span>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component
  export default class LookupToggle extends Vue {

  }
</script>
<style lang="scss" scoped>
  .lookup-toggle {
    width: 100%;
    height: 60px;
    background: #ddd;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 1px;

    > div {
      background: white;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      grid-gap: 10px;
      padding: 0 0 0 10px;

      span {
        font-size: 9px;
        text-transform: uppercase;
      }
    }
  }
</style>
