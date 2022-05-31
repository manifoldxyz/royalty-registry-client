<script lang="ts">
  import { mixins } from 'vue-class-component'
  import { Component, Watch, Prop } from 'vue-property-decorator'
  import SelectableField from "./SelectableField.vue"

  @Component
  export default class SelectableNumberField extends mixins(SelectableField) {
    @Prop({ type: Boolean, default: false }) integer: boolean

    @Watch('model_')
    handler(value, oldValue) {
      if (value.length) {
        if (!this.integer) {
          if (value.match(/^[0-9]*.?[0-9]*$/)) {
            this.model_ = value.toString()
          } else {
            this.model_ = oldValue
          }
        } else {
          if (value.match(/^[0-9][0-9]*$/)) {
            this.model_ = value.toString()
          } else {
            this.model_ = oldValue
          }
        }
      } else {
        this.model_ = value.toString()
      }

      this.$emit('change', this.model_)
    }
  }
</script>
