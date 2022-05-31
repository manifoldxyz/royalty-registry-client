<template>
  <div class="bar lookup-bar">
    <lookup-toggle :lookup-by-id="lookupById" @toggle="lookupById = !lookupById" />
    <lookup-by-id v-if="lookupById" @values="setValues($event)" />
    <lookup-by-url v-else @values="setValues($event)" />
    <selectable-number-field
      class="right-align"
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
  import SelectableNumberField from "@/components/common/SelectableNumberField.vue"
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
    lookupById: boolean = true
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
        ethers.utils.isAddress(this.address) &&
        this.id.length &&
        parseFloat(this.amount) > 0
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
      this.$router.push(`/${this.address}/${this.id}`).catch(()=>{});
    }
  }
</script>
<style lang="scss" scoped>
  .lookup-bar {
    background: #ddd;
    grid-template-columns: 100px auto 114px 60px;
    grid-gap: 1px;

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
