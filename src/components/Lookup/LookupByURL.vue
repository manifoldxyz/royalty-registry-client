<template>
  <div id="lookup-by-url">
    <selectable-field
      label="Search By URL"
      placeholder="https://example.org/0x0123456789abcdef/1"
      :class="{error}"
      :model="url"
      @change="url = $event"
    />
    <div class="warning" :class="{show: warning}">
      <span>Mismatch between connected network and listing URL</span>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import SelectableField from "@/components/common/SelectableField.vue"

  @Component({
    components: {
      SelectableField,
    }
  })
  export default class LookupByURL extends Vue {
    error: boolean = false
    warning: boolean = false
    url: string = ""
    re_opensea: RegExp = new RegExp('([^]+)?opensea.io/assets/(0x[0-9a-fA-F]+)/([0-9]+)')
    re_opensea_api: RegExp = new RegExp('([^]+)?api.opensea.io/asset/(0x[0-9a-fA-F]+)/([0-9]+)')
    re_rarible: RegExp = new RegExp('([^]+)?rarible.com/token/(0x[0-9a-fA-F]+):([0-9]+)')
    re_etherscan: RegExp = new RegExp('([^]+)?etherscan.io/token/(0x[0-9a-fA-F]+)\\?a=([0-9]+)')
    re_foundation: RegExp = new RegExp('([^]+)?foundation.app/(0x[0-9a-fA-F]+)/[a-zA-Z]+/([0-9]+)$')
    re_coinbase: RegExp = new RegExp(('([^]+)?nft.coinbase.com/nft/ethereum/(0x[0-9a-fA-F]+)/[a-zA-Z]+/([0-9]+)$'))

    @Watch('url')
    parseAddress(url) {
      const re_tests = [
        this.re_opensea,
        this.re_opensea_api,
        this.re_rarible,
        this.re_etherscan,
        this.re_foundation
      ]
      const network = this.$store.state.network
      let showWrongNetworkWarning = false
      let showError = true
      let address = ''
      let id = ''

      if (url.length) {
        if (
          (network == 1 && (url.toLowerCase().indexOf('testnet') >= 0)) ||
          (network == 3 && url.toLowerCase().indexOf('ropsten') < 0 && url.toLowerCase().indexOf('testnet') < 0) ||
          (network == 69 && url.toLowerCase().indexOf('kovan') < 0 && url.toLowerCase().indexOf('testnet') < 0)
        ){
          showWrongNetworkWarning = true
        }

        for (let i = 0; i < re_tests.length; i++) {
          const result = re_tests[i].exec(url)

          if (result !== null) {
            showError = false
            address = result[2]
            id = result[3]
            break
          }
        }
      }

      this.warning = showWrongNetworkWarning
      this.error = showError

      this.$emit('values', {
        address: address,
        id: id
      })
    }
  }
</script>
<style lang="scss" scoped>
  #lookup-by-url {
    width: 100%;
    height: 100%;
    background: #ddd;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1px;
    overflow: visible;
    position: relative;

    > div:first-child {
      background: white;

      &.error {
        input {
          outline: 1px solid rgba(255, 0, 0, 0.25);
          color: rgba(255, 0, 0, 0.75);
        }
      }
    }

    .warning {
      position: absolute;
      display: flex;
      align-items: center;
      padding: 0 10px;
      top: 100%;
      left: 0;
      width: 100%;
      height: 30px;
      background: #d8b53c11;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s;

      span {
        color: #c1990d;
        text-transform: uppercase;
        font-size: 11px;
      }

      &.show {
        opacity: 1;
      }
    }
  }
</style>
