<template>
  <div class="step step4">
    <div :class="{show: loaded}" class="step4-content">
      <span class="step-label">Step 4 / 4 : Configure Royalty Overrides</span>

      <h2>Token Contract Default Royalty</h2>
      <span class="text">Set a default policy for all tokens on this contract.</span>
      <div class="bar default-royalty-bar">
        <selectable-field
          :tabindex="active ? 0 : -1"
          :class="{error: defaultRoyalty.error}"
          :disabled="transaction.identifier == 'default'"
          label="Recipient Address"
          placeholder="0"
          :integer="true"
          :model="defaultRoyalty.recipient"
          @change="setRecipient($event, defaultRoyalty)"
        />
        <selectable-number-field
          :tabindex="active ? 1 : -1"
          :disabled="transaction.identifier == 'default'"
          class="right-align"
          label="Royalty Basis Points"
          placeholder="0"
          :integer="true"
          :model="defaultRoyalty.bps"
          @change="setBps($event, defaultRoyalty)"
        />
        <span :class="{disabled: transaction.identifier == 'default'}">BPS</span>
      </div>
      <button
        :disabled="defaultRoyalty.disabled || pendingTx"
        class="full"
        :tabindex="active ? 2 : -1"
        @click="setDefaultBPS"
      >
        <template v-if="transaction.identifier == 'default'">
          <template v-if="transaction.state == 'confirmed'">
            Saved
          </template>
          <template v-else-if="transaction.state == 'error'">
            Error
          </template>
          <span v-else class="spinner"></span>
        </template>
        <template v-else>
          Save Default Royalty
        </template>
      </button>

      <h2>Per Token Royalties</h2>
      <span class="text">Fetch and Configure Overrides by Token ID.</span>
      <div class="bar token-id-fetch-bar">
        <selectable-field
          :tabindex="active ? 3 : -1"
          label="Fetch Token ID"
          placeholder="0"
          :class="{error: fetchTokenIdFieldError}"
          :model="fetchTokenIdField"
          @change="fetchTokenIdField = $event"
        />
        <button
          :disabled="fetchTokenIdFieldError || !fetchTokenIdField || perTokenId.id == fetchTokenIdField"
          :tabindex="active ? 4 : -1"
          @click="fetchTokenId"
        >
          <img src="@/assets/images/icons/go.svg" />
        </button>
      </div>

      <div class="token-id-overrides">
        <div class="bar token-id-override-bar" v-if="perTokenId.id">
          <selectable-field
            :tabindex="active ? 6 : -1"
            :class="{error: perTokenId.error}"
            label="Recipient Address"
            placeholder="0x0123456789abcdef"
            fontsize="22"
            :model="perTokenId.recipient"
            @change="setRecipient($event, perTokenId[idx])"
          />
          <selectable-number-field
            :tabindex="active ? 7 : -1"
            label="Royalty Basis Points"
            class="right-align"
            placeholder="0"
            :model="perTokenId.bps"
            @change="setBps($event, perTokenId)"
          />
          <button
            :tabindex="active ? 8 : -1"
            :disabled="perTokenId.disabled || pendingTx"
            @click="setPerTokenIdBPS(idx)"
          >
            <template v-if="transaction.identifier == perTokenId.id">
              <template v-if="transaction.state == 'confirmed' || transaction.state == 'error'">
                {{ transaction.state }}
              </template>
              <span v-else class="spinner"></span>
            </template>
            <template v-else>
              Save
            </template>
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
  import { RoyaltyInfo, EIP2981RoyaltyOverride } from "@/lib/EIP2981RoyaltyOverride"
  import StepMixin from "@/mixins/StepMixin"
  import SelectableField from "@/components/common/SelectableField.vue"
  import SelectableNumberField from "@/components/common/SelectableNumberField.vue"

  type SetBPSFields = {
    id?: string;
    error: boolean;
    recipient: string;
    bps:  string;
    disabled: boolean;
  }

  type Transaction = {
    identifier: string;
    state: string;
  }

  @Component({
    components: {
      SelectableField,
      SelectableNumberField
    }
  })
  export default class Step4 extends mixins(StepMixin) {
    defaultRoyalty: SetBPSFields = {
      error: false,
      recipient: "",
      bps:  "",
      disabled: false
    }
    fetchTokenIdFieldError: boolean = false
    fetchTokenIdField: string = ""
    perTokenId: Partial<SetBPSFields> = {}
    tokenAddress: string = ""
    overrideAddress: string = ""
    overrideContract: EIP2981RoyaltyOverride
    transaction: Transaction = {
      identifier: "",
      state: ""
    }

    setRecipient(value, obj) {
      obj.recipient = value
      if (!obj.recipient) {
        obj.error = false
      }
      else if (!ethers.utils.isAddress(obj.recipient)) {
        obj.error = true
      } else {
        obj.error = false
      }
      if (!obj.error && !!obj.recipient && !!obj.bps) {
        obj.disabled = false
      } else {
        obj.disabled = true
      }
    }

    setBps(value, obj) {
      obj.bps = value

      if (!obj.error && !!obj.recipient && !!obj.bps) {
        obj.disabled = false
      } else {
        obj.disabled = true
      }
    }


    get pendingTx() {
      return this.transaction.state.length > 0
    }

    async activate() {
      //@ts-ignore
      this.tokenAddress = this.$parent.tokenAddress
      //@ts-ignore
      this.engine = this.$parent.engine
      //@ts-ignore
      this.overrideAddress = this.$parent.overrideAddress
      //@ts-ignore
      this.overrideContract = new EIP2981RoyaltyOverride(window.ethereum, this.overrideAddress)

      const royaltyInfo: RoyaltyInfo | null = await this.overrideContract.getDefaultRoyalty()
      if (royaltyInfo != null) {
        this.defaultRoyalty.recipient = royaltyInfo.recipient != undefined ? royaltyInfo.recipient : ""
        this.defaultRoyalty.bps = royaltyInfo.bps != undefined ? royaltyInfo.bps.toString() : ""
      }

      this.loaded = true
    }

    async waitTransaction(pendingTx) {
      try {
        this.transaction.state = "confirming"
        const receipt = await pendingTx.wait()

        if (receipt.status == 0) {
          this.transaction.state = "error"
        }

        this.transaction.state = "confirmed"
      } catch (e) {
        if (process.env.NODE_ENV == "development") {
          console.log(e)
        }
        this.transaction.state = "error"
      }

      setTimeout(() => {
        this.transaction.state = ""
        this.transaction.identifier = ""
      }, 2000)
    }

    async setDefaultBPS() {
      this.transaction.identifier = "default"
      this.waitTransaction(await this.overrideContract.setDefaultRoyalty(this.defaultRoyalty.recipient, parseInt(this.defaultRoyalty.bps)))
    }

    @Watch("fetchTokenIdField")
    fetchTokenIdHandler(value) {
      if (!value.match(/^[1-9][0-9]+$/)) {
        this.fetchTokenIdFieldError = true
      } else {
        this.fetchTokenIdFieldError = false
      }
    }

    async fetchTokenId() {
      const royaltyData = await this.engine.getRoyalty(this.tokenAddress, this.fetchTokenIdField, ethers.BigNumber.from("10000"))

      if (royaltyData.length > 0) {
        this.perTokenId = {
          id: this.fetchTokenIdField.toString(),
          error: false,
          recipient: royaltyData[0].recipient,
          bps: royaltyData[0].amount.toString(),
          disabled: true
        }
      }
    }

    async setPerTokenIdBPS(idx) {
      this.transaction.identifier = this.perTokenId.id!
      this.waitTransaction(await this.overrideContract.setTokenRoyalty(this.perTokenId.id!, this.perTokenId.recipient!, parseInt(this.perTokenId.bps!)))
    }
  }
</script>
<style lang="scss">
  .step4 {
    .step4-content {
      button {
        &:disabled {
          pointer-events: none;

          > * {
            opacity: 0.25;
          }
        }

        .spinner {
          transform: scale(0.5) !important;
        }
      }

      .default-royalty-bar {
        grid-template-columns: 1fr 136px auto;
        margin-top: 40px;

        .selectable-field {
          &:first-child {
            border-right: var(--border);
          }

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

          &.disabled {
            background: var(--bg);
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

      .token-id-overrides {
        margin-top: 40px;

        .token-id-override-bar {
          grid-template-columns: 1fr 136px 74px;
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

            &:disabled {
              > * {
                opacity: 0.5;
              }
            }
          }

          &:first-child {
            overflow: visible;
            margin-top: 0;
          }
        }
      }
    }
  }
</style>
