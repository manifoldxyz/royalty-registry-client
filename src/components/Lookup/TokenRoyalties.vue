<template>
  <div class="token-royalties">
    <h2>Royalties</h2>
    <table class="token-royalties-content">
      <tr>
        <th>Payable Address</th>
        <th>Share (%)</th>
        <th>Value (WEI)</th>
      </tr>
      <tr v-if="dataIsEmpty">
        <td><em>No receipients</em></td>
        <td><em>0</em></td>
        <td><em>0</em></td>
      </tr>
      <template v-else>
        <tr v-for="record in data" :key="record.address">
          <td>{{ record.address }}</td>
          <td>{{ record.percentage }}</td>
          <td>{{ record.wei }}</td>
        </tr>
      </template>
    </table>
  </div>
</template>
<script lang="ts">
  import { ethers } from "ethers"
  import { Component, Prop, Vue } from "vue-property-decorator"
  import { RoyaltyInfo } from "@/lib/RoyaltyEngineV1"

  @Component
  export default class TokenRoyalties extends Vue {
    @Prop({ type: Array, required: true }) royaltyData: RoyaltyInfo[]
    @Prop({ type: Object, required: true }) amount: ethers.BigNumber
    data: any[] = []
    dataIsEmpty: boolean = false

    created() {
      this.data = this.royaltyData.map((e, i) => {
        if (i == 0 && !e.recipient) {
          this.dataIsEmpty = true
          return
        }
        return {
          address: e.recipient,
          percentage: e.amount.mul(ethers.BigNumber.from(100)).div(this.amount),
          wei: e.amount
        }
      })
    }
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

        em {
          font-size: inherit;
          font-style: italic;
          opacity: 0.25;
        }
      }

      th {
        font-size: 11px;
        text-transform: uppercase;
      }
    }
  }
</style>
