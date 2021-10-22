<template>
  <div class="step step2">
    <div :class="{show: loaded}" class="step2-content">
      <span class="step-label">Step 2 / 4 : Token Royalties</span>
      <template v-if="!!royaltySpec">
        <h2>Token Contract Royalty Spec</h2>
        <span class="text">This Token already supports <strong>{{ royaltySpec }}</strong>.</span>
        <span v-if="royaltySpec == 'Manifold'" class="text">You should configure your royalties using <a href="https://studio.manifoldxyz.dev">Manifold Studio</a> instead of creating a new override.</span>
      </template>
      <template v-if="!!overrideAddress">
        <h2>Active Overrides</h2>
        <div class="table">
          <div>
            <span>Address</span>
            <span>{{ overrideAddress }}</span>
          </div>
          <div>
            <span>Etherscan</span>
            <a
              target="_blank"
              :href="getEtherscanAddressUrl($store.state.network, overrideAddress)"
              :tabindex="active ? 0 : -1"
            >
              {{ getEtherscanAddressUrl($store.state.network, overrideAddress) }}
            </a>
          </div>
        </div>
        <button
          class="full"
          :class="{disabled: !overrideAllowed || !overrideSupported}"
          :tabindex="active ? 1 : -1"
          @click="configureOverride"
        >
          <template v-if="overrideSupported">
            Configure Override
          </template>
          <template v-else>
            Override Not Configurable
          </template>
        </button>
      </template>
      <h2>Create New Override</h2>
      <button
        class="full"
        :class="{disabled: !overrideAllowed}"
        @click="createNewOverride"
        :tabindex="active ? 2 : -1"
      >
        Create New Override
      </button>
    </div>
    <load-screen v-if="!loaded" />
  </div>
</template>
<script lang="ts">
  import { mixins } from "vue-class-component"
  import { Component } from "vue-property-decorator"
  import StepMixin from "@/mixins/StepMixin"
  import { getEtherscanAddressUrl } from "@/lib/etherscan"
  import { EIP2981RoyaltyOverride } from "@/lib/EIP2981RoyaltyOverride"

  @Component
  export default class Step2 extends mixins(StepMixin) {
    getEtherscanAddressUrl: Function = getEtherscanAddressUrl
    royaltySpec: string | null = null
    overrideAddress: string = ""
    overrideContract: EIP2981RoyaltyOverride
    overrideAllowed: boolean = false
    overrideSupported: boolean = false

    async activate() {
      //@ts-ignore
      const tokenAddress = this.$parent.tokenAddress

      this.overrideAllowed = await this.registry.overrideAllowed(tokenAddress)
      this.royaltySpec = await this.specChecker.getRoyaltySpec(tokenAddress)
      const lookupAddress = await this.registry.getRoyaltyLookupAddress(tokenAddress)

      if (lookupAddress.toLowerCase() != tokenAddress.toLowerCase()) {
        this.overrideAddress = lookupAddress
        //@ts-ignore
        this.overrideContract = new EIP2981RoyaltyOverride(window.ethereum, this.overrideAddress)
        this.overrideSupported = await this.overrideContract.overrideSupported()
      }

      this.loaded = true
    }

    configureOverride() {
      if (this.overrideAllowed) {
        this.$emit('configure', this.overrideAddress)
      }
    }

    createNewOverride() {
      if (this.overrideAllowed) {
        this.$emit('create')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .step .step2-content button.disabled {
    position: relative;

    &:hover {
      &::after {
        display: block;
        position: absolute;
        line-height: 60px;
        top: 0;
        left: 0;
        content: 'Access Denied';
        width: 100%;
        height: 100%;
        background: red;
        color: white;
        cursor: none;
      }
    }
  }
</style>
