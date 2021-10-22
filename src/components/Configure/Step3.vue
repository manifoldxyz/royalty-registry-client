<template>
  <div class="step step3">
    <div :class="{show: loaded}" class="step3-content">
      <span class="step-label">Step 3 / 4 : Deploy Override Contract</span>
      <h2>Deploying New Override Contract</h2>
      <span class="text">Sending...</span>
      <template v-if="!!newContractTxHash">
        <span class="text">Sent.</span>
        <span class="text">Transaction Hash: {{ newContractTxHash }}</span>
        <span class="text">Etherscan: <a target="_blank" :href="getEtherscanTxUrl($store.state.network, newContractTxHash)">{{ getEtherscanTxUrl($store.state.network, newContractTxHash) }}</a></span>
        <span class="text">Confirming...</span>
      </template>
      <template v-if="!!newContractAddress">
        <span class="text">Confirmed.</span>
        <span class="text">Contract Address: {{ newContractAddress }}</span>
        <span class="text">Etherscan: <a target="_blank" :href="getEtherscanAddressUrl($store.state.network, newContractAddress)">{{ getEtherscanAddressUrl($store.state.network, newContractAddress) }}</a></span>
      </template>
      <template v-if="!!setOverrideTxHash">
        <span class="text">Setting as Override Contract for {{ tokenAddress }}...</span>
        <span class="text">Transaction Hash: {{ setOverrideTxHash }}</span>
        <span class="text">Etherscan: <a target="_blank" :href="getEtherscanTxUrl($store.state.network, setOverrideTxHash)">{{ getEtherscanTxUrl($store.state.network, setOverrideTxHash) }}</a></span>
        <span class="text">Setting...</span>
      </template>
      <template v-if="overrideSet">
        <span class="text">Set.</span>
        <div class="step3-action" :class="{show: overrideSet}">
          <h2>Configure New Override</h2>
          <button :tabindex="active ? 0 : -1" class="full" @click="configureOverride">Configure Override</button>
        </div>
      </template>
      <template v-if="error || cancelled">
        <span v-if="error" class="text" :style="{'color': 'red'}">An error occured.</span>
        <span v-if="cancelled" class="text" :style="{'color': 'red'}">You cancelled the transaction.</span>
        <button :tabindex="active ? 0 : -1" class="full" @click="performTransaction">Try Again</button>
      </template>
    </div>
    <load-screen v-if="!loaded" />
  </div>
</template>
<script lang="ts">
  import { ethers } from "ethers"
  import { mixins } from "vue-class-component"
  import { Component, Watch } from "vue-property-decorator"
  import { EIP2981RoyaltyOverrideFactory } from "@/lib/EIP2981RoyaltyOverride"
  import { setCookie, getCookie } from "@/lib/cookies"
  import { PENDING_CONFIGURATION_TOKEN_ADDRESS, PENDING_NEW_CONTRACT_TX, PENDING_SET_OVERRIDE_TX } from "@/constants"
  import { getEtherscanTxUrl, getEtherscanAddressUrl } from "@/lib/etherscan"
  import StepMixin from "@/mixins/StepMixin"

  @Component
  export default class Step3 extends mixins(StepMixin) {
    getEtherscanTxUrl: Function = getEtherscanTxUrl
    getEtherscanAddressUrl: Function = getEtherscanAddressUrl
    provider: ethers.providers.Web3Provider
    factory: EIP2981RoyaltyOverrideFactory
    tokenAddress: string = ""
    newContractTxHash: string = ""
    newContractAddress: string = ""
    setOverrideTxHash: string = ""
    overrideSet: boolean = false
    error: boolean = false
    cancelled: boolean = false

    created() {
      //@ts-ignore
      this.provider = new ethers.providers.Web3Provider(window.ethereum)
    }

    async activate() {
      //@ts-ignore
      this.tokenAddress = this.$parent.tokenAddress
      //@ts-ignore
      this.factory = new EIP2981RoyaltyOverrideFactory(window.ethereum)
      this.loaded = true
    }

    @Watch("loaded")
    loadedHandler(value) {
      if (value) {
        this.performTransaction()
      }
    }

    async performTransaction() {
      try {
        setCookie(PENDING_CONFIGURATION_TOKEN_ADDRESS, this.tokenAddress, 10)
        const pendingNewContractTx = getCookie(PENDING_NEW_CONTRACT_TX)
        let newContractTx

        if (pendingNewContractTx) {
          newContractTx = await this.provider.getTransaction(pendingNewContractTx)
        } else {
          newContractTx = await this.factory.createOverrideContract()
          setCookie(PENDING_NEW_CONTRACT_TX, newContractTx.hash, 10)
        }

        this.newContractTxHash = newContractTx.hash
        let newContractReceipt

        if (pendingNewContractTx) {
          while (!newContractReceipt) {
            newContractReceipt = await this.provider.getTransactionReceipt(this.newContractTxHash)
            await new Promise(res => setTimeout(res, 2000))
          }
        } else {
          newContractReceipt = await newContractTx.wait()
        }

        if (newContractReceipt.status == 0) {
          setCookie(PENDING_NEW_CONTRACT_TX, '', 0)
          throw new Error()
        }

        const newContractTxInterface = new ethers.utils.Interface([
          "event EIP2981RoyaltyOverrideCreated(address newEIP2981RoyaltyOverride)"
        ])

        this.newContractAddress = newContractTxInterface.parseLog(newContractReceipt.logs.find(log => { return log.topics[0] == "0x6ace5835f14486bead350c58a6ce67b18fec46c58b809b749b08541cf7458025" })).args[0]

        const pendingSetOverrideTx = getCookie(PENDING_SET_OVERRIDE_TX)
        let setOverrideTx

        if (pendingSetOverrideTx) {
          setOverrideTx = await this.provider.getTransaction(pendingSetOverrideTx)
        } else {
          setOverrideTx = await this.registry.setRoyaltyLookupAddress(this.tokenAddress, this.newContractAddress)
          setCookie(PENDING_SET_OVERRIDE_TX, setOverrideTx.hash, 10)
        }

        this.setOverrideTxHash = setOverrideTx.hash
        const setOverrideReceipt = await setOverrideTx.wait()

        if (setOverrideReceipt.status == 0) {
          setCookie(PENDING_SET_OVERRIDE_TX, '', 0)
          throw new Error()
        }

        this.overrideSet = true
        setCookie(PENDING_NEW_CONTRACT_TX, '', 0)
        setCookie(PENDING_SET_OVERRIDE_TX, '', 0)
        setCookie(PENDING_CONFIGURATION_TOKEN_ADDRESS, '', 0)

      } catch (e: any) {
        if (process.env.NODE_ENV == 'development') {
          console.log(e)
          console.trace()
        }
        if (e.code === 4001) {
          this.cancelled = true
        } else {
          this.error = true
        }
      }
    }

    configureOverride() {
      this.$emit('configure', this.newContractAddress)
    }
  }
</script>
<style lang="scss" scoped>
  .step3 {
    .step3-content {
      .step3-action {
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.25s, transform 0.25s;
        pointer-events: none;
      }
    }
  }
</style>
