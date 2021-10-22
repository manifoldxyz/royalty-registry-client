<template>
  <div id="app">
    <template v-if="hasWallet">
      <template v-if="supportedNetwork">
        <app-header />
        <router-view></router-view>
      </template>
      <template v-else>
        <div class="unsupported-network">
          <h1>RoyaltyRegistry.eth</h1>
          <span>Only Mainnet, Ropsten, and Rinkeby chains are supported.</span>
          <faq />
        </div>
      </template>
    </template>
    <template v-else>
      <div class="install-wallet">
        <h1>RoyaltyRegistry.eth</h1>
        <span>Please Install a Wallet</span>
        <faq />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
  import { ethers } from "ethers"
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import AppHeader from "@/components/AppHeader.vue"
  import Faq from "@/components/FAQ.vue"

  @Component({
    components: {
      AppHeader,
      Faq
    }
  })
  export default class App extends Vue {
    hasWallet: boolean = false
    ethersProvider: ethers.providers.Web3Provider
    supportedNetwork: boolean = true

    async created() {
      //@ts-ignore
      if (window.ethereum) {
        this.hasWallet = true
        //@ts-ignore
        this.ethersProvider = new ethers.providers.Web3Provider(window.ethereum)
        //@ts-ignore
        this.ethersProvider.provider.on("chainChanged", (chainId) => {
          this.setNetwork(parseInt(chainId))
          this.$router.push('/')
        })
        this.setNetwork((await this.ethersProvider.getNetwork()).chainId)
      }
    }

    setNetwork(chainId: number) {
      if ([1,3,4].indexOf(chainId) >= 0) {
        this.supportedNetwork = true
        this.$store.commit('setNetwork', chainId)
      } else {
        this.supportedNetwork = false
        this.$store.commit('setNetwork', undefined)
      }
    }
  }
</script>

<style lang="scss"> // Do not scope
  #app {
    width: 100%;
    height: 100%;
    position: relative;
    overflow-x: hidden;
    overflow-y: scroll;
    display: flex;
    justify-content: center;

    .spinner {
      margin: 0 auto;
      align-self: center;
      transform: scale(1.25);
    }

    .install-wallet,
    .unsupported-network {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      grid-gap: 30px;

      > h1 {
        font-size: 12px;
        text-transform: uppercase;
      }
    }
  }
</style>
