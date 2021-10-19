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
      <a class="disabled">Configure<span>Coming Soon</span></a>
      <a href="#faq">FAQ</a>
    </nav>
    <div class="header-networks">
      <span :class="{selected: $store.state.network == 1}">Mainnet</span>
      <span :class="{selected: $store.state.network == 3}">Ropsten</span>
      <span :class="{selected: $store.state.network == 4}">Rinkeby</span>
      <div class="header-networks-addresses" v-if="$store.state.network">
        <div><span>Engine:</span><a target="_blank" :href="getEtherscanUrl(engine.get($store.state.network))">{{ engine.get($store.state.network) }}</a></div>
        <div><span>Registry:</span><a target="_blank" :href="getEtherscanUrl(engine.get($store.state.network))">{{ registry.get($store.state.network) }}</a></div>
      </div>
    </div>
  </header>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import { RoyaltyRegistryAddresses } from "@/lib/RoyaltyRegistry"
  import { RoyaltyEngineV1Addresses } from "@/lib/RoyaltyEngineV1"

  @Component
  export default class AppHeader extends Vue {
    registry: Map<number, string> = new Map()
    engine: Map<number, string> = new Map()

    created() {
      this.registry = RoyaltyRegistryAddresses
      this.engine = RoyaltyEngineV1Addresses
    }
    getEtherscanUrl(address) {
      if (this.$store.state.network == 1) {
        return `https://etherscan.io/address/${address}`
      } else if (this.$store.state.network == 3) {
        return `https://ropsten.etherscan.io/address/${address}`
      } else if (this.$store.state.network == 4) {
        return `https://rinkeby.etherscan.io/address/${address}`
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
      }

      .header-networks-addresses {
        position: absolute;
        top: 150%;
        left: 0;
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
