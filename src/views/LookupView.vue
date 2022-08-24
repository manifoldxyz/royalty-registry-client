<template>
  <div id="lookup-view" :class="{results: showResultsLayout}">
    <div class="lookup-view-head">
      <h2>Providing Access to On-Chain Royalties</h2>
      <lookup-bar @submit="lookup($event)" />
    </div>
    <div class="lookup-view-body">
      <template v-if="showResultsLayout">
        <template v-if="!resultsErrorMsg">
          <div class="token-details-container">
            <template v-if="loadingResults">
              <span class="spinner"></span>
            </template>
            <template v-else>
              <token-details :values="tokenDetails" :royalty-spec="royaltySpec" />
            </template>
          </div>
          <div class="token-royalties-container">
            <template v-if="loadingResults">
              <span class="spinner"></span>
            </template>
            <template v-else>
              <token-royalties :royalty-data="royaltyData" :amount="tokenDetails.amount" />
            </template>
          </div>
        </template>
        <template v-else>
          <div class="error-container">
            <h3>Error: {{ resultsErrorMsg }}.</h3>
          </div>
        </template>
      </template>
      <collaborators />
      <faq />
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { RoyaltyRegistry } from "@/lib/RoyaltyRegistry"
  import { RoyaltyInfo, RoyaltyEngineV1 } from "@/lib/RoyaltyEngineV1"
  import { RoyaltySpecChecker } from "@/lib/RoyaltySpecChecker"
  import LookupBar from "@/components/Lookup/LookupBar.vue"
  import TokenDetails from "@/components/Lookup/TokenDetails.vue"
  import TokenRoyalties from "@/components/Lookup/TokenRoyalties.vue"
  import Collaborators from "@/components/Collaborators.vue"
  import Faq from "@/components/FAQ.vue"
  import { ethers } from "ethers"

  @Component({
    components: {
      LookupBar,
      TokenDetails,
      TokenRoyalties,
      Collaborators,
      Faq
    }
  })
  export default class LookupView extends Vue {
    loadingResults: boolean = false
    showResultsLayout: boolean = false
    resultsErrorMsg: string = ""
    tokenDetails: object = {}
    royaltyData: RoyaltyInfo[] = []
    royaltyOverrideAddress: string | null = null
    royaltySpec: string | null = null
    registry: RoyaltyRegistry
    engine: RoyaltyEngineV1
    specChecker: RoyaltySpecChecker

    created() {
      //@ts-ignore
      this.registry = new RoyaltyRegistry(window.ethereum)
      //@ts-ignore
      this.engine = new RoyaltyEngineV1(window.ethereum)
      //@ts-ignore
      this.specChecker = new RoyaltySpecChecker(window.ethereum)

      const tokenAddress = this.$route.params?.tokenAddress
      const tokenId = this.$route.params?.tokenId

      if (tokenAddress && tokenId) {
        this.lookup({
          address: tokenAddress,
          id: tokenId,
          amount: ethers.utils.parseEther('1')
        })
      }
    }

    async lookup(values) {
      this.resultsErrorMsg = ""
      this.royaltyOverrideAddress = null
      this.royaltySpec = null
      this.loadingResults = true
      this.showResultsLayout = true
      this.tokenDetails = values
      try {
        const lookupAddress = await this.registry.getRoyaltyLookupAddress(values.address)
        if (lookupAddress.toLowerCase() != values.address.toLowerCase()) {
          this.royaltyOverrideAddress = lookupAddress
          this.royaltySpec = await this.specChecker.getRoyaltySpec(lookupAddress)
        } else {
          this.royaltySpec = await this.specChecker.getRoyaltySpec(values.address)
        }

        const data = await this.engine.getRoyalty(values.address, values.id, values.amount)

        if (!this.royaltySpec && data.length == 0) {
          this.resultsErrorMsg = 'No on-chain royalties configured'
        } else {
          this.royaltyData = data
        }


      } catch (e) {
        this.resultsErrorMsg = 'Address not recognized'
      }
      this.loadingResults = false
    }
  }
</script>
<style lang="scss">
  #lookup-view {
    width: 100%;
    height: min-content;

    .lookup-view-head {
      width: 100%;
      height: 50vh;
      background: white;
      border-bottom: var(--border);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      overflow: visible;
      position: relative;
      padding: 0 var(--padding);
      transition: height 0.5s;
      transition-delay: 0.25s;

      h2 {
        display: block;
        width: 100%;
        max-width: 900px;
        font-size: 28px;
        padding: 10px;
        margin: 0 auto;
        margin-bottom: 10px;
      }

      .lookup-bar {
        margin: 0 auto;
        transform: translate(0, 50%);
        z-index: 1;
      }
    }

    .lookup-view-body {
      padding: 130px var(--padding);

      .error-container {
        max-width: 900px;
        min-height: 300px;
        margin: 0 auto;
        margin-bottom: 130px;
        padding: 10px;

        h3 {
          text-align: center;
        }
      }

      .error-container,
      .token-details-container,
      .token-royalties-container {
        display: grid;
        align-items: center;
      }

      .token-details-container {
        min-height: 201px;
        margin-bottom: 50px;
      }

      .token-royalties-container {
        min-width: 100%;
        min-height: 148px;
        margin-bottom: 130px;
      }

      .built-in-collaboration-with {
        margin-bottom: 130px;
      }
    }

    &.results {
      .lookup-view-head {
        height: 180px;

        h2 {
          display: none;
        }@keyframes moveLookupBar {
          0% {
            margin-left: auto;
            transform: translate(0, 50%);
            opacity: 1;
            z-index: 1;
          }

          25% {
            transform: translate(0, 50%);
            opacity: 0;
          }

          75% {
            margin-left: 0;
            transform: translate(-2px, 50%);
            opacity: 0;
          }

          100% {
            margin-left: 0;
            transform: translate(-2px, 50%);
            opacity: 1;
          }
        }

        .lookup-bar {
          animation: moveLookupBar 1s linear 0s 1 normal;
          animation-fill-mode: forwards;
        }
      }

      .lookup-view-body {
        padding: 70px var(--padding);
      }
    }
  }
</style>
