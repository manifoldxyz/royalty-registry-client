<template>
  <div class="selectable-field">
    <label>
      {{ label }}
    </label>
    <input
      type="text"
      :tabindex="tabindex"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="model_"
      :style="{'font-size': `${fontsize}px`}"
      @keyup="model_ = $event.target.value"
      @paste="model_ = $event.target.value"
      @focus="selectAll"
    />
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

  @Component
  export default class SelectableField extends Vue {
    @Prop({ type: String, required: true }) label: string
    @Prop({ type: String, required: true }) model: string
    @Prop({ type: String, required: false, default: '' }) placeholder: string
    @Prop({ type: String, required: false, default: "24" }) fontsize: string
    @Prop({ type: Number, required: false, default: -1 }) tabindex: number
    @Prop({ type: Boolean, required: false, default: false }) disabled: boolean
    model_: string | undefined = ""

    created() {
      this.model_ = this.model
    }

    @Watch('model_')
    handler(value, oldValue) {
      this.$emit('change', value)
    }

    selectAll(e) {
      e.target.setSelectionRange(0, e.target.value.length)
    }
  }
</script>
<style lang="scss" scoped>
  .selectable-field {
    display: block;
    overflow: visible;
    position: relative;
    background: white;

    label {
      position: absolute;
      top: -16px;
      left: 10px;
      text-transform: uppercase;
      text-align: left;
      font-size: 10px;
    }

    input {
      width: 100%;
      height: 100%;
      padding: 0 10px;
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

    &.right-align {
      position: relative;

      label {
        left: auto !important;
        right: 10px;
        text-align: right !important;
      }

      input {
        text-align: right;
      }
    }
  }
</style>
