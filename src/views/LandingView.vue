<template>
  <div id="landing-view">
    <div class="landing-view-head">
      <h2>Providing Access to On-Chain Royalties</h2>
    </div>
    <div class="landing-view-body">
      <collaborators />
      <faq />
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import LookupBar from "@/components/Lookup/LookupBar.vue"
  import Collaborators from "@/components/Collaborators.vue"
  import Faq from "@/components/FAQ.vue"

  @Component({
    components: {
      LookupBar,
      Collaborators,
      Faq
    }
  })
  export default class LookupView extends Vue {

  }
</script>
<style lang="scss">
  #landing-view {
    width: 100%;
    height: min-content;

    .landing-view-head {
      width: 100%;
      height: 30vh;
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
        // text-align: center;
      }

      .landing-bar {
        transform: translate(0, 50%);
        z-index: 1;
      }
    }

    .landing-view-body {
      padding: 80px var(--padding);

      .built-in-collaboration-with {
        margin-bottom: 100px;
      }
    }
  }
</style>
