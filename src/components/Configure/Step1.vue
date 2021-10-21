<template>
  <div class="step1">
    <div class="step1-content-container">
      <div class="step1-content">
        <span class="step-label">Step 1 / 5 : Enter Token Address</span>
        <h2>Enter Token Address</h2>
        <div class="token-address-bar">
          <selectable-field
            label="Token Address"
            placeholder="0x0123456789abcdef"
            :class="{error: tokenAddressError}"
            :model="tokenAddress"
            @change="tokenAddress = $event"
          />
          <button>
            <img src="@/assets/images/icons/go.svg" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator"
  import { ethers } from "ethers"
  import SelectableField from "@/components/common/SelectableField.vue"

  @Component({
    components: {
      SelectableField
    }
  })
  export default class Step1 extends Vue {
    tokenAddress: string = ""
    tokenAddressError: boolean = false

    @Watch('tokenAddress')
    addressHandler(value, oldValue) {
      if (!value.length) {
        this.tokenAddressError = false
      }
      else if (!ethers.utils.isAddress(value)) {
        this.tokenAddressError = true
      } else {
        this.tokenAddressError = false
      }
    }
  }
</script>
<style lang="scss" scoped>
  .step1 {
    padding: 0 !important;

    .step1-content-container {
      width: 100%;
      min-height: calc(120px + 201px);
      height: calc(50vh + 100px - 30px);
      overflow: visible;
      background: white;
      border-bottom: var(--border);
      padding: 120px var(--padding) 0;
      display: grid;
      align-items: flex-end;

      .step1-content {
        width: 100%;
        max-width: 900px;
        height: 201px;
        transform: translateY(30px);
        margin: 0 auto;

        .token-address-bar {
          width: 100%;
          max-width: 900px;
          height: 60px;
          display: grid;
          grid-template-columns: 1fr 74px;
          border: var(--border);
          overflow: visible;
          margin-top: 40px;

          button {
            border-left: var(--border);
            background: white;

            img {
              transform: translateY(3px);
            }
          }
        }
      }
    }
  }
</style>
