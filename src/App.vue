<template>
  <div id="app">
    <template v-if="hasWallet">
      <template v-if="supportedNetwork">
        <app-header />
        <router-view></router-view>
      </template>
      <template v-else>
        <div class="unsupported-network">
          <div class="inner">
            <h1>RoyaltyRegistry.eth</h1>
            <span>Only Mainnet, Kovan, Ropsten, Rinkeby, Polygon Matic and Mumbai chains are supported.</span>
            <collaborators />
            <faq />
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="install-wallet">
        <div class="inner">
          <h1>RoyaltyRegistry.eth</h1>
          <span>Please Install a Wallet</span>
          <collaborators />
          <faq />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
  import { ethers } from "ethers"
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import AppHeader from "@/components/AppHeader.vue"
  import Collaborators from "@/components/Collaborators.vue"
  import Faq from "@/components/FAQ.vue"
  import { RoyaltyRegistryAddresses } from "@/lib/RoyaltyRegistry"

  @Component({
    components: {
      AppHeader,
      Collaborators,
      Faq,
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
      if (RoyaltyRegistryAddresses.has(chainId)) {
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

      .inner {
        width: 100%;
        height: auto;
        max-height: 100%;
        overflow-y: scroll;
        padding: 50px 0;

        > *:not(.built-in-collaboration-with) {
          display: block;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
        }

        > h1 {
          font-size: 11px;
          text-transform: uppercase;
          padding: 0 10px;
          margin-bottom: 10px;
        }

        > span {
          font-size: 18px;
          padding: 0 10px 30px;
          margin-bottom: 45px;
          border-bottom: var(--border);
        }

        .built-in-collaboration-with {
          padding: 50px 10px;
          border-bottom: var(--border);
          margin-bottom: 30px;
        }
      }
    }
  }
</style>
