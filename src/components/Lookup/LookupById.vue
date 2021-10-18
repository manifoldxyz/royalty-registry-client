<template>
  <div id="lookup-by-id">
    <div class="bar-field" :class="{error}">
      <label>
        Search By Token Address
      </label>
      <input type="text" placeholder="0x0123456789abcdef" v-model="address" @focus="selectAll" />
    </div>
    <div class="bar-field">
      <label>
        Token ID
      </label>
      <input type="text" placeholder="0000" v-model="id" @focus="selectAll" />
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import { isAddress } from "@/lib/addressValidation"

  @Component
  export default class LookupById extends Vue {
    error: boolean = false
    address: string = ''
    id: string = '1'

    @Watch('address')
    addressHandler(value, oldValue) {
      if (!isAddress(value)) {
        this.error = true
      } else {
        this.error = false
      }
      this.setValues()
    }

    @Watch('id')
    idHandler(value, oldValue) {
      if (value.length == 0) {
        this.id = '1'
        this.setValues()
        return
      }

      if (!isNaN(parseInt(value))) {
        this.id = parseInt(value).toString()
      } else {
        this.id = oldValue
      }
      this.setValues()
    }

    setValues() {
      if (!this.error) {
        if (
          this.address &&
          this.id &&
          this.address.length &&
          this.id.length
        ) {
          this.$emit('values', {
            address: this.address,
            id: this.id
          })
        }
      }
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
