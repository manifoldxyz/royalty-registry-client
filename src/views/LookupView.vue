<template>
  <div id="lookup-view" :class="{results: showResults}">
    <div class="lookup-view-head">
      <h2>Providing Access to On-Chain Royalties</h2>
      <lookup-bar />
    </div>
    <div class="lookup-view-body">
      <template v-if="showResults">
        <token-details />
        <token-royalties />
      </template>
      <collaborators />
      <faq />
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
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
    showResults: boolean = true
  }
</script>
<style lang="scss">
  #lookup-view {
    width: 100%;
    height: auto;

    .lookup-view-head {
      width: 100%;
      height: 50vh;
      background: white;
      border-bottom: 1px solid #ddd;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      overflow: visible;
      position: relative;
      padding: 0 var(--padding);

      h2 {
        display: block;
        width: 100%;
        max-width: 900px;
        font-size: 28px;
        padding: 10px;
        margin-bottom: 10px;
      }

      .lookup-bar {
        transform: translate(0, 50%);
        z-index: 1;
      }
    }

    .lookup-view-body {
      padding: 130px var(--padding);

      .token-details {
        margin-bottom: 50px;
      }

      .token-royalties {
        margin-bottom: 130px;
      }

      .built-in-collaboration-with {
        margin-bottom: 130px;
      }
    }

    &.results {
      .lookup-view-head {
        height: 130px;
        align-items: flex-start;

        h2 {
          display: none;
        }

        .lookup-bar {
          transform: translate(-2px, 50%);
        }
      }

      .lookup-view-body {
        padding: 70px var(--padding);
      }
    }
  }
</style>
