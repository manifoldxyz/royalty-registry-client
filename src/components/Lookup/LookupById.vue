<template>
  <div id="lookup-by-id">
    <selectable-field
      :class="{error}"
      label="Search By Token Address"
      placeholder="0x0123456789abcdef"
      :model="address"
      @change="address = $event"
    />
    <selectable-number-field
      label="Token ID"
      placeholder="0000"
      :model="id"
      @change="id = $event"
    />
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import { isAddress } from "@/lib/addressValidation"
  import SelectableField from "./SelectableField.vue"
  import SelectableNumberField from "./SelectableNumberField.vue"

  @Component({
    components: {
      SelectableField,
      SelectableNumberField
    }
  })
  export default class LookupById extends Vue {
    error: boolean = false
    address: string = ''
    id: string = '1'

    @Watch('address')
    addressHandler(value, oldValue) {
      if (!value.length) {
        this.error = false
      }
      else if (!isAddress(value)) {
        this.error = true
      } else {
        this.error = false
      }
      this.setValues()
    }

    @Watch('id')
    idHandler(value, oldValue) {
      this.setValues()
    }

    setValues() {
      this.$emit('values', {
        address: this.address,
        id: this.id
      })
    }

    selectAll(e) {
      e.target.setSelectionRange(0, e.target.value.length)
    }
  }
</script>
<style lang="scss">
  #lookup-by-id {
    width: 100%;
    height: 100%;
    background: #ddd;
    display: grid;
    grid-template-columns: 1fr 120px;
    grid-gap: 1px;
    overflow: visible;

    > div {
      background: white;

      &.error {
        input {
          outline: 1px solid rgba(255, 0, 0, 0.25);
          color: rgba(255, 0, 0, 0.75);
        }
      }
    }
  }
</style>
