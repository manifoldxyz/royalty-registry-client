<template>
  <selectable-field
    label="Search By URL"
    placeholder="https://example.org/0x0123456789abcdef/1"
    :class="{error}"
    :model="url"
    @change="url = $event"
  />
</template>
<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import SelectableField from "./SelectableField.vue"

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

    @Watch('url')
    parseAddress(url) {
      const re_tests = [
        this.re_opensea,
        this.re_opensea_api,
        this.re_rarible,
        this.re_etherscan
      ]
      const network = this.$store.state.network
      let showWrongNetworkWarning = false
      let showError = true
      let address = ''
      let id = ''

      if (
        (network == 1 && (url.toLowerCase().indexOf('rinkeby') >= 0 || url.toLowerCase().indexOf('testnet') >= 0)) ||
        (network == 3 && url.toLowerCase().indexOf('ropsten')) ||
        (network == 4 && url.toLowerCase().indexOf('rinkeby') < 0 && url.toLowerCase().indexOf('testnet') < 0)
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

      this.warning = showWrongNetworkWarning
      this.error = showError

      this.$emit('values', {
        address: address,
        id: id
      })
    }
  }
</script>
