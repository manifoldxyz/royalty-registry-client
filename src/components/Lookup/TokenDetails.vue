<template>
  <div class="token-details">
    <h2>Token Details</h2>
    <div class="token-details-content">
      <div>
        <span>Address</span>
        <span>{{ values.address }}</span>
      </div>
      <div v-if="royaltySpec">
        <span>Royalty Spec</span>
        <span>{{ royaltySpec }} <a v-if="royaltyOverrideAddress" :href="getEtherscanAddressUrl($store.state.network, royaltyOverrideAddress)">(overridden)</a></span>
      </div>
      <div>
        <span>ID</span>
        <span>{{ values.id }}</span>
      </div>
      <div>
        <span>Etherscan</span>
        <a target="_blank" :href="getEtherscanTokenUrl($store.state.network, values.address, values.id)">{{ getEtherscanTokenUrl($store.state.network, values.address, values.id) }}</a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator"
  import { getEtherscanTokenUrl, getEtherscanAddressUrl } from "@/lib/etherscan"

  @Component
  export default class TokenDetails extends Vue {
    @Prop({ type: Object, required: true}) values: object
    @Prop({ type: String, required: false }) royaltyOverrideAddress: string | null
    @Prop({ type: String, required: false }) royaltySpec: string | null
    getEtherscanTokenUrl: Function = getEtherscanTokenUrl
    getEtherscanAddressUrl: Function = getEtherscanAddressUrl
  }
</script>
<style lang="scss" scoped>
  .token-details {
    h2 {
      display: block;
      width: 100%;
      font-size: 24px;
      padding: 10px 10px 10px 7px;
      margin-bottom: 10px;
    }
  }

  .token-details-content {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    max-width: 900px;
    border-top: 1px solid #ddd;

    > div {
      display: grid;
      grid-template-columns: 100px 1fr;
      padding: 14px 10px;
      align-items: center;
      border-bottom: 1px solid #ddd;

      span,
      a {
        &:first-child {
          font-size: 10px;
          text-transform: uppercase;
        }

        &:last-child {
          font-size: 15px;
          text-transform: none;
        }
      }

      a {
        text-decoration: underline;
      }
    }
  }
</style>
