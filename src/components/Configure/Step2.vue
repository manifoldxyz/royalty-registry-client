<template>
  <div class="step2">
    <div class="step2-content">
      <span class="step-label">Step 2 / 4 : Token Royalties</span>
      <h2>Token Contract Royalty Spec</h2>
      <span class="text">This Token already supports <strong>EIP2981</strong>.</span>
      <h2>Active Overrides</h2>
      <div class="table">
        <div>
          <span>Address</span>
          <span>0x7afeda4c714e1c0a2a1248332c100924506ac8e6</span>
        </div>
        <div>
          <span>Etherscan</span>
          <a target="_blank" :href="getEtherscanAddressUrl($store.state.network, '0x7afeda4c714e1c0a2a1248332c100924506ac8e6')">{{ getEtherscanAddressUrl($store.state.network, '0x7afeda4c714e1c0a2a1248332c100924506ac8e6') }}</a>
        </div>
      </div>
      <button class="full">Configure Override</button>
      <h2>Create New Override</h2>
      <button class="full">Create New Override</button>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator"
  import { getEtherscanAddressUrl } from "@/lib/etherscan"

  @Component
  export default class Step2 extends Vue {
    getEtherscanAddressUrl: Function = getEtherscanAddressUrl

  }
</script>
<style lang="scss" scoped>
  .step2 {
    .step2-content {
    }
  }
</style>
