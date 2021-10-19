<template>
  <div class="token-royalties">
    <h2>Royalties</h2>
    <table class="token-royalties-content">
      <colgroup>
       <col style="width: auto;">
       <col style="width: 100px;">
       <col style="width: auto;">
      </colgroup>
      <tr>
        <th>Payable Address</th>
        <th>Share (%)</th>
        <th>Value (ETH)</th>
      </tr>
      <tr v-if="dataIsEmpty">
        <td><em>No receipients</em></td>
        <td><em>0</em></td>
        <td><em>0</em></td>
      </tr>
      <template v-else>
        <tr v-for="record in data" :key="record.address">
          <td><a target="_blank" :href="getEtherscanAddressUrl($store.state.network, record.address)">{{ record.address }}</a></td>
          <td>{{ record.percentage }}</td>
          <td>{{ record.eth }}</td>
        </tr>
      </template>
    </table>
  </div>
</template>
<script lang="ts">
  import { ethers } from "ethers"
  import { Component, Prop, Vue } from "vue-property-decorator"
  import { RoyaltyInfo } from "@/lib/RoyaltyEngineV1"
  import { getEtherscanAddressUrl } from "@/lib/etherscan"

  @Component
  export default class TokenRoyalties extends Vue {
    @Prop({ type: Array, required: true }) royaltyData: RoyaltyInfo[]
    @Prop({ type: Object, required: true }) amount: ethers.BigNumber
    getEtherscanAddressUrl: Function = getEtherscanAddressUrl
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
          eth: ethers.utils.formatEther(e.amount)
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
    display: table;

    tr {
      width: 100%;
      height: 60px;
      display: table-row;
      border-bottom: 1px solid #ddd;

      &:first-of-type {
        height: auto;
      }

      th,
      td {
        text-align: right;
        padding: 10px;

        &:first-child {
          text-align: left;
        }

        a {
          font-size: inherit;

          &:hover {
            text-decoration: underline;
          }
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
