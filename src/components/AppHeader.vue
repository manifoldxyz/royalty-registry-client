<template>
  <header>
    <h1>RoyaltyRegistry.eth</h1>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="2" height="2" fill="#110011" />
      <rect y="4" width="2" height="2" fill="#110011" />
      <rect x="4" width="2" height="2" fill="#110011" />
      <rect x="4" y="4" width="2" height="2" fill="#110011" />
    </svg>
    <nav>
      <router-link to="/">Lookup</router-link>
      <router-link to="/configure">Configure</router-link>
      <a href="/lookup#faq">FAQ</a>
    </nav>
    <div class="header-networks">
      <span @click="changeNetworks(1)" :class="{selected: $store.state.network == 1}">Mainnet</span>
      <span @click="changeNetworks(3)" :class="{selected: $store.state.network == 3}">Ropsten</span>
      <span @click="changeNetworks(4)" :class="{selected: $store.state.network == 4}">Rinkeby</span>
      <span @click="changeNetworks(5)" :class="{selected: $store.state.network == 5}">Goerli</span>
      <span @click="changeNetworks(42)" :class="{selected: $store.state.network == 42}">Kovan</span>
      <span @click="changeNetworks(137)" :class="{selected: $store.state.network == 137}">Polygon</span>
      <span @click="changeNetworks(80001)" :class="{selected: $store.state.network == 80001}">Mumbai</span>
      <div class="header-networks-addresses" v-if="$store.state.network">
        <div><span>Registry:</span><a target="_blank" :href="getEtherscanAddressUrl($store.state.network, registry.get($store.state.network))">{{ registry.get($store.state.network) }}</a></div>
        <div><span>Engine:</span><a target="_blank" :href="getEtherscanAddressUrl($store.state.network, engine.get($store.state.network))">{{ engine.get($store.state.network) }}</a></div>
      </div>
    </div>
  </header>
</template>
<script lang="ts">
  import { ethers } from "ethers"
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import { RoyaltyRegistryAddresses } from "@/lib/RoyaltyRegistry"
  import { RoyaltyEngineV1Addresses } from "@/lib/RoyaltyEngineV1"
  import { getEtherscanAddressUrl } from "@/lib/etherscan"

  @Component
  export default class AppHeader extends Vue {
    provider: ethers.providers.Web3Provider
    registry: Map<number, string> = new Map()
    engine: Map<number, string> = new Map()
    getEtherscanAddressUrl: Function = getEtherscanAddressUrl

    created() {
      //@ts-ignore
      this.provider = this.$parent.ethersProvider
      this.registry = RoyaltyRegistryAddresses
      this.engine = RoyaltyEngineV1Addresses
      this.getEtherscanAddressUrl = getEtherscanAddressUrl
    }

    changeNetworks(networkId) {
      if (networkId != this.$store.state.network) {
        try {
          //@ts-ignore
          window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{
              chainId: `${'0x'+ networkId.toString(16)}`
            }]
          })
        } catch (e) {
          alert('An error occured while prompting a network change. Please change networks manually from your wallet.')
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  header {
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    grid-gap: 18px;
    padding: calc(var(--padding) + 10px);
    overflow: visible;

    * {
      font-size: 12px;
      text-transform: uppercase;
    }

    nav,
    .header-networks {
      display: flex;
      grid-gap: 18px;
      overflow: visible;
      position: relative;

      > span {
        cursor: pointer;
      }

      a.disabled {
        opacity: 0.25;
        cursor: default;
        position: relative;
        overflow: visible;

        span {
          font-size: 75%;
          position: absolute;
          top: 200%;
          left: 50%;
          transform: translate(-50%, calc(-50% - 10px));
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.25s, transform 0.25s;
        }

        &:hover {
          span {
            opacity: 1;
            transform: translate(-50%, calc(-50%));
          }
        }
      }
    }

    .header-networks {
      margin-left: auto;

      span.selected {
        &:nth-child(1) {
          color: #59b3ae;
        }

        &:nth-child(2) {
          color: #ec5a8d;
        }

        &:nth-child(3) {
          color: #efc45c;
        }

        &:nth-child(4) {
          color: #2585df;
        }

        &:nth-child(5) {
          color: #6e43e4;
        }

        &:nth-child(6) {
          color: #18099e;
        }

        &:nth-child(7) {
          color: #b345f3;
        }
      }

      .header-networks-addresses {
        position: absolute;
        top: 150%;
        right: 0;
        overflow: visible;

        > div {
          display: grid;
          grid-template-rows: 1fr;
          margin-bottom: 5px;
          position: relative;
          overflow: visible;

          span,
          a {
            font-size: 7.33px;

            &:first-child {
              color: #999;
              position: absolute;
              top: 0;
              right: calc(100% + 8px);
            }
          }

          a:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>
