<template>
  <div id="app">
    <template v-if="loaded">
      <template v-if="hasWallet">
        <app-header />
        <router-view></router-view>
      </template>
      <template v-else>
        <div class="install-wallet">
          <h1>RoyaltyRegistry.eth</h1>
          <span>Please Install a Wallet</span>
        </div>
      </template>
    </template>
    <template v-else>
      <span class="spinner"></span>
    </template>
  </div>
</template>

<script lang="ts">
  import { ethers } from "ethers"
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import AppHeader from "@/components/AppHeader.vue"
  import LandingView from "@/views/LandingView.vue"

  @Component({
    components: {
      AppHeader,
      LandingView
    }
  })
  export default class App extends Vue {
    loaded: boolean = false
    hasWallet: boolean = false
    ethersProvider: any

    async created() {
      //@ts-ignore
      if (window.ethereum) {
        this.hasWallet = true
        //@ts-ignore
        this.ethersProvider = new ethers.providers.Web3Provider(window.ethereum)
        this.ethersProvider.provider.on("chainChanged", (chainId) => {
          this.$store.commit('setNetwork', parseInt(chainId))
          this.$router.push('/')
        })
        this.$store.commit('setNetwork', (await this.ethersProvider.getNetwork()).chainId)
      }
    }

    mounted() {
      setTimeout(() => {
        this.loaded = true
      }, 1000)
    }

    async handleConnection() {

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

    .spinner {
      margin: 0 auto;
      align-self: center;
      transform: scale(1.25);
    }

    .install-wallet {
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
