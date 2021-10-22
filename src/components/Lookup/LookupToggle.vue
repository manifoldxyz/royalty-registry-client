<template>
  <div class="lookup-toggle" @click="toggle">
    <div :class="{selected: lookupById}">
      <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 0L0 5H10L5 0Z" fill="black" />
      </svg>
      <span>By Token ID</span>
    </div>
    <div :class="{selected: !lookupById}">
      <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 5L10 -4.76837e-07L-5.1656e-07 -1.35107e-06L5 5Z" fill="black" />
      </svg>
      <span>
        By URL
      </span>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator"

  @Component
  export default class LookupToggle extends Vue {
    @Prop({ type: Boolean, required: true }) lookupById: boolean

    toggle() {
      this.$emit('toggle')
    }
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
    cursor: pointer;

    > div {
      background: white;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      grid-gap: 10px;
      padding: 0 0 0 10px;
      transition: background 0.25s;

      span {
        font-size: 9px;
        text-transform: uppercase;
      }

      &.selected {
        background: #f5f5f5;
        pointer-events: none;
      }
    }

    &:hover {
      > div {
        background: #f5f5f5;

        &.selected {
          background: #f9f9f9;
        }
      }
    }
  }
</style>
