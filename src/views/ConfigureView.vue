<template>
  <div id="configure-view">
    <div id="configure-view-inner" :style="{'transform': `translateY(-${step}00vh)`}">
      <step-1 />
      <step-2 />
      <step-3 />
      <step-4 />
    </div>
    <button
      @click="next"
      class="start-over"
    >
      <img src="@/assets/images/icons/top.svg" />
      <span>Start Over</span>
    </button>
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
  export default class ConfigureView extends Vue {
    step: number = 0

    next() {
      if (this.step < 3) {
        this.step++
      }
    }
  }
</script>
<style lang="scss">
  #configure-view {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    button.start-over {
      position: absolute;
      bottom: var(--padding);
      right: var(--padding);
      z-index: 1;
      border: var(--border);
      display: flex;
      align-items: center;
      grid-gap: 15px;
      padding: 15px;

      span {
        font-size: 10px;
        text-transform: uppercase;
      }
    }

    #configure-view-inner {
      width: 100%;
      height: 400vh;
      position: relative;
      z-index: 0;
      transition: transform 0.5s;

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
        border: var(--border);
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
