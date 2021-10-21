<template>
  <div class="step step2">
    <div :class="{show: loaded}" class="step2-content">
      <span class="step-label">Step 2 / 4 : Token Royalties</span>
      <template v-if="!!tokenSpec">
        <h2>Token Contract Royalty Spec</h2>
        <span class="text">This Token already supports <strong>{{ tokenSpec }}</strong>.</span>
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
          :tabindex="active ? 1 : -1"
          @click="editOverride"
        >
          Configure Override
        </button>
      </template>
      <h2>Create New Override</h2>
      <button
        class="full"
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

  @Component
  export default class Step2 extends mixins(StepMixin) {
    getEtherscanAddressUrl: Function = getEtherscanAddressUrl
    tokenSpec: string | null = null
    overrideAddress: string = ""
    overrideAllowed: boolean = false

    async activate() {
      //@ts-ignore
      const tokenAddress = this.$parent.tokenAddress

      this.overrideAllowed = await this.registry.overrideAllowed(tokenAddress)
      console.log(this.overrideAllowed)
      this.tokenSpec = await this.specChecker.getRoyaltySpec(tokenAddress)
      const lookupAddress = await this.registry.getRoyaltyLookupAddress(tokenAddress)

      if (lookupAddress.toLowerCase() != tokenAddress.toLowerCase()) {
        this.overrideAddress = lookupAddress
      }

      this.loaded = true
    }

    editOverride() {
      this.$emit('edit', this.overrideAddress)
    }

    createNewOverride() {
      this.$emit('create')
    }
  }
</script>
