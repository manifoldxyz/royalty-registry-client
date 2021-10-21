<template>
  <div class="step step4">
    <div :class="{show: loaded}" class="step4-content">
      <span class="step-label">Step 4 / 4 : Configure Royalty Overrides</span>
      <h2>Token Contract Default Royalty</h2>
      <span class="text">Set a default policy for all tokens on this contract.</span>
      <div class="bar default-royalty-bar">
        <selectable-number-field
          :tabindex="active ? 0 : -1"
          class="right-align"
          label="Royalty Basis Points"
          placeholder="0"
          :integer="true"
          :model="defaultBPS"
          @change="defaultBPS = $event"
        />
        <span>BPS</span>
      </div>
      <button class="full" :tabindex="active ? 1 : -1">Save Default Royalty</button>
      <h2>Per Token Royalties</h2>
      <span class="text">Fetch and Configure Overrides by Token ID.</span>
      <div class="bar token-id-fetch-bar">
        <selectable-number-field
          :tabindex="active ? 2 : -1"
          label="Fetch Token ID"
          placeholder="0"
          :model="defaultBPS"
          @change="defaultBPS = $event"
        />
        <button :tabindex="active ? 3 : -1">
          <img src="@/assets/images/icons/go.svg" />
        </button>
      </div>
      <div class="token-id-overrides">
        <div class="bar token-id-override-bar">
          <selectable-number-field
            :tabindex="active ? 4 : -1"
            disabled
            label="Token ID"
            :model="'1'"
          />
          <selectable-field
            :tabindex="active ? 5 : -1"
            label="Recipient Address"
            placeholder="0x0123456789abcdef"
            fontsize="22"
            :model="'0x0123456789abcdef'"
          />
          <selectable-number-field
            :tabindex="active ? 6 : -1"
            label="Royalty Basis Points"
            class="right-align"
            placeholder="0"
            :model="'1'"
          />
          <button :tabindex="active ? 7 : -1">Save</button>
        </div>
      </div>
    </div>
    <load-screen v-if="!loaded" />
  </div>
</template>
<script lang="ts">
  import { mixins } from "vue-class-component"
  import { Component, Watch } from "vue-property-decorator"
  import StepMixin from "@/mixins/StepMixin"
  import SelectableField from "@/components/common/SelectableField.vue"
  import SelectableNumberField from "@/components/common/SelectableNumberField.vue"

  @Component({
    components: {
      SelectableField,
      SelectableNumberField
    }
  })
  export default class Step4 extends mixins(StepMixin) {
    defaultBPS: string = ""

  }
</script>
<style lang="scss">
  .step4 {
    .step4-content {
      .default-royalty-bar {
        grid-template-columns: 1fr auto;
        margin-top: 40px;

        .selectable-field {
          label {
            left: 10px !important;
            right: auto !important;
          }
        }

        > span {
          padding: 0 25px 0 15px;
          line-height: 60px;
          background: white;
          font-size: 14px;
          color: #aaa;
        }
      }

      .token-id-overrides {
        margin-top: 40px;

        .token-id-override-bar {
          grid-template-columns: 100px 1fr 136px 74px;
          grid-gap: 1px;
          background: #ddd;
          overflow: hidden;
          margin-top: -1px;

          &:hover {
            box-shadow: none;
          }

          button {
            background: white;
            font-size: 10px;
            text-transform: uppercase;
          }

          &:first-child {
            overflow: visible;
            margin-top: 0;
          }
        }
      }

      .token-id-fetch-bar {
        margin-top: 40px;
        grid-template-columns: 1fr 74px;

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
</style>
