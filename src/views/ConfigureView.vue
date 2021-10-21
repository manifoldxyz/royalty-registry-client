<template>
  <div id="configure-view">
    <div id="configure-view-inner" :style="{'transform': `translateY(-${step - 1}00vh)`}">
      <step-1 :active="step == 1" @next="tokenAddress = $event" />
      <step-2 :active="step == 2" @create="step = 3" @configure="configureOverride" />
      <step-3 :active="step == 3" @next="configureOverride" />
      <step-4 :active="step == 4" />
    </div>
    <button
      v-show="step > 0"
      @click="startOver"
      class="start-over"
    >
      <img src="@/assets/images/icons/top.svg" />
      <span>Start Over</span>
    </button>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator"
  import { RoyaltyRegistry } from "@/lib/RoyaltyRegistry"
  import { RoyaltyInfo, RoyaltyEngineV1 } from "@/lib/RoyaltyEngineV1"
  import { RoyaltySpecChecker } from "@/lib/RoyaltySpecChecker"
  import { getCookie } from "@/lib/cookies"
  import { PENDING_CONFIGURATION_TOKEN_ADDRESS, PENDING_NEW_CONTRACT_TX, PENDING_SET_OVERRIDE_TX } from "@/constants"
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
    tokenAddress: string = ""
    overrideAddress: string = ""

    created() {
      //@ts-ignore
      this.registry = new RoyaltyRegistry(window.ethereum)
      //@ts-ignore
      this.engine = new RoyaltyEngineV1(window.ethereum)
      //@ts-ignore
      this.specChecker = new RoyaltySpecChecker(window.ethereum)
    }

    mounted() {
      setTimeout(() => {
        if (getCookie(PENDING_CONFIGURATION_TOKEN_ADDRESS)) {
          this.tokenAddress = getCookie(PENDING_CONFIGURATION_TOKEN_ADDRESS)
          this.step = 3
        } else {
          this.step++
        }
      }, 1000)
    }

    @Watch("tokenAddress")
    tokenAddressHandler(value) {
      if(this.step != 3) {
        this.step = 2
      }
    }

    configureOverride(overrideAddress) {
      this.overrideAddress = overrideAddress
      this.step = 4
    }

    startOver() {
      this.tokenAddress = ""
      this.overrideAddress = ""
      this.step = 1
    }
  }
</script>
<style lang="scss">
  #configure-view {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background: red;

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
      transition: transform 0.75s ease-in-out;

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
    }
  }

</style>
