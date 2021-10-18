<template>
  <div id="lookup-view" :class="{results: showResults}">
    <div class="lookup-view-head">
      <h2>Providing Access to On-Chain Royalties</h2>
      <lookup-bar @submit="lookup($event)" />
    </div>
    <div class="lookup-view-body">
      <template v-if="showResults">
        <div class="token-details-container">
          <template v-if="loadingResults">
            <span class="spinner"></span>
          </template>
          <template v-else>
            <token-details :values="tokenDetails" />
          </template>
        </div>
        <div class="token-royalties-container">
          <template v-if="loadingResults">
            <span class="spinner"></span>
          </template>
          <template v-else>
            <token-royalties />
          </template>
        </div>
      </template>
      <collaborators />
      <faq />
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import { RoyaltyInfo, RoyaltyEngineV1 } from "@/lib/RoyaltyEngineV1"
  import LookupBar from "@/components/Lookup/LookupBar.vue"
  import TokenDetails from "@/components/Lookup/TokenDetails.vue"
  import TokenRoyalties from "@/components/Lookup/TokenRoyalties.vue"
  import Collaborators from "@/components/Collaborators.vue"
  import Faq from "@/components/FAQ.vue"

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
    showResults: boolean = false
    tokenDetails: object = {}
    royaltyData: object[] = []

    created() {

    }

    async lookup(values) {
      this.showResults = true
      this.loadingResults = true
      this.tokenDetails = values

      setTimeout(() => {
        this.loadingResults = false
      }, 1000)
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
      border-bottom: 1px solid #ddd;
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
        height: 130px;

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
