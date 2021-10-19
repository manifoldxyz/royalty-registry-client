<template>
  <div class="bar-field">
    <label>
      {{ label }}
    </label>
    <input type="text" :placeholder="placeholder" :value="model_" @keyup="model_ = $event.target.value" @paste="model_ = $event.target.value" @focus="selectAll" />
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

  @Component
  export default class SelectableField extends Vue {
    @Prop({ type: String, required: true }) label: string
    @Prop({ type: String, required: true }) model: string
    @Prop({ type: String, required: true }) placeholder: string
    model_: string | undefined = ""

    created() {
      this.model_ = this.model
    }

    @Watch('model_')
    handler(value, oldValue) {
      this.$emit('change', this.model_)
    }

    selectAll(e) {
      e.target.setSelectionRange(0, e.target.value.length)
    }
  }
</script>
<style lang="scss" scoped>
  .bar-field {
    display: block;
    overflow: visible;
    position: relative;

    label {
      position: absolute;
      top: -16px;
      left: 12px;
      text-transform: uppercase;
      text-align: left;
      font-size: 10px;
    }

    input {
      width: 100%;
      height: 100%;
      font-size: 24px;
      padding: 0 12px;
      -moz-appearance: textfield;

      &::placeholder {
        color: #0002;
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    &.error {
      input {
        outline: 1px solid rgba(255, 0, 0, 0.25);
        color: rgba(255, 0, 0, 0.75);
      }
    }
  }
</style>
