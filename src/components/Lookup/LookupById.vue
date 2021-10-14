<template>
  <div id="lookup-by-id">
    <div class="bar-field">
      <label>
        Search By Token Address
      </label>
      <input type="text" placeholder="0x0123456789abcdef" />
    </div>
    <div class="bar-field">
      <label>
        Token ID
      </label>
      <input type="text" placeholder="0000" />
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import LookupBar from "@/components/Lookup/LookupBar.vue"

  @Component({
    components: {
      LookupBar
    }
  })
  export default class Home extends Vue {
  }
</script>
<style lang="scss">
  #lookup-by-id {
    width: 100%;
    height: 100%;
    background: #ddd;
    display: grid;
    grid-template-columns: 1fr 120px;
    grid-gap: 1px;
    overflow: visible;

    > div {
      background: white;
    }
  }
</style>
