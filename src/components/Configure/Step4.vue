<template>
  <div class="step4">
    <div class="step4-content">
      <span class="step-label">Step 4 / 4 : Configure Royalty Overrides</span>
      <h2>Token Contract Default Royalty</h2>
      <span class="text">Set a default policy for all tokens on this contract.</span>
      <div class="bar default-royalty-bar">
        <selectable-number-field
          class="right-align"
          label="Royalty Basis Points"
          placeholder="0"
          :integer="true"
          :model="defaultBPS"
          @change="defaultBPS = $event"
        />
        <span>BPS</span>
      </div>
      <button class="full">Save Default Royalty</button>
      <h2>Per Token Royalties</h2>
      <span class="text">Fetch and Configure Overrides by Token ID.</span>
      <div class="bar token-id-fetch-bar">
        <selectable-number-field
          label="Fetch Token ID"
          placeholder="0"
          :model="defaultBPS"
          @change="defaultBPS = $event"
        />
        <button>
          <img src="@/assets/images/icons/go.svg" />
        </button>
      </div>
      <div class="token-id-overrides">
        <div class="bar token-id-override-bar">
          <selectable-number-field
            disabled
            label="Token ID"
            :model="'1'"
          />
          <selectable-field
            label="Recipient Address"
            placeholder="0x0123456789abcdef"
            fontsize="22"
            :model="'0x0123456789abcdef'"
          />
          <selectable-number-field
            label="Royalty Basis Points"
            class="right-align"
            placeholder="0"
            :model="'1'"
          />
          <button>Save</button>
        </div>
        <div class="bar token-id-override-bar">
          <selectable-number-field
            disabled
            label="Token ID"
            :model="'1'"
          />
          <selectable-field
            label="Recipient Address"
            placeholder="0x0123456789abcdef"
            fontsize="22"
            :model="'0x0123456789abcdef'"
          />
          <selectable-number-field
            label="Royalty Basis Points"
            class="right-align"
            placeholder="0"
            :integer="true"
            :model="'1'"
          />
          <button>Save</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator"
  import SelectableField from "@/components/common/SelectableField.vue"
  import SelectableNumberField from "@/components/common/SelectableNumberField.vue"

  @Component({
    components: {
      SelectableField,
      SelectableNumberField
    }
  })
  export default class Step4 extends Vue {
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
          border-left: 1px solid #ddd;
          background: white;

          img {
            transform: translateY(3px);
          }
        }
      }
    }
  }
</style>
