<template>
  <div id="configure-view">
    <div id="configure-view-inner">
      <step-1 />
      <step-2 />
      <step-3 />
      <step-4 />
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator"
  import Step1 from "@/components/Configure/Step1.vue"
  import Step2 from "@/components/Configure/Step2.vue"
  import Step3 from "@/components/Configure/Step3.vue"
  import Step4 from "@/components/Configure/Step4.vue"

  @Component({
    components: {
      Step1,
      Step2,
      Step3,
      Step4,
    }
  })
  export default class ConfigureView extends Vue {}
</script>
<style lang="scss">
  #configure-view {
    width: 100%;
    height: 100%;

    #configure-view-inner {
      width: 100%;
      height: 400vh;
      transform: translateY(-300vh);

      .step-label {
        display: block;
        text-transform: uppercase;
        font-size: 10px;
        padding: 0 10px;
      }

      h2 {
        font-size: 24px;
        display: block;
        margin-top: 60px;
        margin-bottom: 24px;
        padding: 0 10px;
      }

      span.text {
        display: block;
        font-size: 14px;
        line-height: 21px;
        height: auto;
        white-space: wrap;
        padding: 0 10px;
      }

      button.full {
        width: 100%;
        height: 60px;
        border: 1px solid #ddd;
        text-transform: uppercase;
        font-size: 10px;
        margin-top: 10px;
        transition: background 0.25s;

        &:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        &:active {
          background: rgba(0, 0, 0, 1);
          color: white;
        }
      }

      h2 + button.full {
        margin-top: 0;
      }

      > div {
        width: 100%;
        height: 100vh;
        position: relative;

        &:not(.step1) {
          padding: 0 var(--padding);
          display: grid;
          align-items: center;
          overflow-y: scroll;

          > div {
            width: 100%;
            max-width: 900px;
            height: min-content;
            margin: 120px auto;
            display: grid;
            align-items: center;
          }
        }
      }
    }
  }

</style>
