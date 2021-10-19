<template>
  <div class="lookup-bar">
    <lookup-toggle :lookup-by-id="lookupById" @toggle="lookupById = !lookupById" />
    <lookup-by-id v-if="lookupById" @values="setValues($event)" />
    <lookup-by-url v-else @values="setValues($event)" />
    <selectable-number-field
      :class="'lookup-eth-value'"
      label="Eth Value"
      placeholder="0000"
      :model="amount"
      @change="amount = $event"
    />
    <button :disabled="disabled" @click="submit">
      <img src="@/assets/images/icons/search.svg" />
    </button>
  </div>
</template>
<script lang="ts">
  import { ethers } from "ethers"
  import { Component, Vue, Watch } from "vue-property-decorator"
  import { isAddress } from "@/lib/addressValidation"
  import SelectableNumberField from "./SelectableNumberField.vue"
  import LookupToggle from "./LookupToggle.vue"
  import LookupById from "./LookupById.vue"
  import LookupByUrl from "./LookupByURL.vue"
  import { getCookie, setCookie } from "@/lib/cookies"

  @Component({
    components: {
      SelectableNumberField,
      LookupToggle,
      LookupById,
      LookupByUrl
    }
  })
  export default class LookupBar extends Vue {
    lookupById: boolean = false
    address: string = ''
    id: string = ''
    amount: string = "1"
    disabled: boolean = true

    created() {
      const lookupBy = getCookie('lookupBy')

      if (lookupBy) {
        if (lookupBy == 'id') {
          this.lookupById = true
        } else {
          this.lookupById = false
        }
      }
    }

    @Watch('lookupById')
    lookupHandler(value, oldValue) {
      if (value) {
        setCookie('lookupBy', 'id', 10)
      } else {
        setCookie('lookupBy', 'url', 10)
      }
    }

    @Watch('amount')
    ethHandler(value, oldValue) {
      this.validate()
    }

    setValues(values) {
      this.address = values.address
      this.id = values.id
      this.validate()
    }

    selectAll(e) {
      e.target.setSelectionRange(0, e.target.value.length)
    }

    validate() {
      if (
        this.address &&
        this.id &&
        this.amount &&
        isAddress(this.address) &&
        this.id.length &&
        parseInt(this.amount) > 0
      ) {
        this.disabled = false
      }
      else {
        this.disabled = true
      }
    }

    submit() {
      this.$emit('submit', {
        address: this.address,
        id: this.id,
        amount: ethers.utils.parseEther(this.amount)
      })
    }
  }
</script>
<style lang="scss" scoped>
  .lookup-bar {
    width: 100%;
    max-width: 900px;
    min-height: 60px;
    border: 1px solid #ddd;
    background: #ddd;
    display: grid;
    grid-template-columns: 100px auto 114px 60px;
    grid-template-rows: 1fr;
    grid-gap: 1px;
    overflow: visible;
    transition: box-shadow 0.25s;

    &:hover {
      box-shadow: 0 4px 10px -2px rgba(0, 0, 0, 0.1);
    }

    > div {
      overflow: visible;
    }

    button {
      background: white;
      transition: background 0.25s;

      img {
        transform: translateX(-1.5px);
        transition: opacity 0.25s;
      }

      &[disabled] {
        pointer-events: none;

        img {
          opacity: 0.25;
        }
      }

      &:not([disabled]) {
        pointer-events: initial;

        &:hover {
          background: #f7f7f7;

          img {
            opacity: 1;
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .lookup-eth-value {
    position: relative;

    label {
      left: auto !important;
      right: 12px;
      text-align: right !important;
    }

    input {
      text-align: right;
    }
  }
</style>
