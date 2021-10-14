<template>
  <div class="token-royalties">
    <h2>Royalties</h2>
    <table class="token-royalties-content">
      <tr>
        <th>Payable Address</th>
        <th>Share (%)</th>
        <th>Value (WEI)</th>
      </tr>
      <tr>
        <td>0x0123456789abcdef</td>
        <td>30</td>
        <td>0.05</td>
      </tr>
    </table>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component
  export default class TokenRoyalties extends Vue {

  }
</script>
<style lang="scss" scoped>
  .token-royalties {
    h2 {
      display: block;
      width: 100%;
      font-size: 24px;
      padding: 10px 10px 10px 7px;
      margin-bottom: 5px;
    }
  }

  .token-royalties-content {
    width: 100%;
    height: auto;

    tr {
      width: 100%;
      height: 60px;
      display: grid;
      grid-template-columns: 1fr 120px 120px;
      align-items: center;
      border-bottom: 1px solid #ddd;

      &:first-child {
        height: auto;
        align-items: flex-end;
      }

      th,
      td {
        text-align: right;
        padding: 10px;

        &:first-child {
          text-align: left;
        }
      }

      th {
        font-size: 11px;
        text-transform: uppercase;
      }
    }
  }
</style>
