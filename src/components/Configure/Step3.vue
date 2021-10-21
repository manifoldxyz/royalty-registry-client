<template>
  <div class="step3">
    <div class="step3-content">
      <span class="step-label">Step 3 / 4 : Deploy Override Contract</span>
      <h2>Deploying New Override Contract</h2>
      <span class="text">Sending...</span>
      <span class="text">Sent.</span>
      <span class="text">Transaction Hash: 0x7afeda4c714e1c0a2a1248332c100924506ac8e6</span>
      <span class="text">Etherscan: https://etherscan.io/tx/0x7afeda4c714e1c0a2a1248332c100924506ac8e6</span>
      <span class="text">Confirming...</span>
      <span class="text">Confirmed.</span>
      <span class="text">Contract Address: 0x7afeda4c714e1c0a2a1248332c100924506ac8e6</span>
      <span class="text">Etherscan: https://etherscan.io/address/0x7afeda4c714e1c0a2a1248332c100924506ac8e6</span>
      <span class="text">Setting as Override Contract for 0x0123456789abcdef...</span>
      <span class="text">Set.</span>
      <h2>Configure New Override</h2>
      <button class="full">Configure Override</button>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator"
  import SelectableField from "@/components/common/SelectableField.vue"

  @Component({
    components: {
      SelectableField
    }
  })
  export default class Step3 extends Vue {

  }
</script>
<style lang="scss" scoped>
  .step3 {
    .step3-content {
    }
  }
</style>
