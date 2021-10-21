<template>
  <div class="step step1" :class="{loaded}">
    <div class="step1-content-container" :class="{show: loaded}">
      <div class="step1-content">
        <span class="step-label">Step 1 / 5 : Enter Token Address</span>
        <h2>Enter Token Address</h2>
        <div class="token-address-bar">
          <selectable-field
            :tabindex="active ? 0 : -1"
            label="Token Address"
            placeholder="0x0123456789abcdef"
            :class="{error}"
            :model="address"
            @change="address = $event"
          />
          <button
            @click="submit"
            :disabled="disabled"
            :tabindex="active && !disabled ? 1 : -1"
          >
            <img src="@/assets/images/icons/go.svg" />
          </button>
        </div>
      </div>
    </div>
    <load-screen v-if="!loaded" />
  </div>
</template>
<script lang="ts">
  import { ethers } from "ethers"
  import { mixins } from "vue-class-component"
  import { Component, Watch } from "vue-property-decorator"
  import StepMixin from "@/mixins/StepMixin"
  import LoadScreen from "@/components/LoadScreen.vue"
  import SelectableField from "@/components/common/SelectableField.vue"

  @Component({
    components: {
      SelectableField
    }
  })
  export default class Step1 extends mixins(StepMixin) {
    address: string = ""
    error: boolean = false
    disabled: boolean = true

    async activate() {
      this.loaded = true
    }

    @Watch('address')
    addressHandler(value, oldValue) {
      if (!value.length) {
        this.error = false
        this.disabled = false
      }
      else if (!ethers.utils.isAddress(value)) {
        this.error = true
        this.disabled = true
      } else {
        this.error = false
        this.disabled = false
      }
    }

    submit() {
      if (!this.disabled) {
        this.$emit('next', this.address)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .step1 {
    padding: 0 !important;
    background: white !important;

    &.loaded {
      background: var(--bg) !important;
    }

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

            &:disabled {
              img {
                opacity: 0.25;
              }
            }

            img {
              transform: translateY(3px);
            }
          }
        }
      }
    }
  }
</style>
