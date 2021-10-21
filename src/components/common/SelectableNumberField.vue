<script lang="ts">
  import { mixins } from 'vue-class-component'
  import { Component, Watch, Prop } from 'vue-property-decorator'
  import SelectableField from "./SelectableField.vue"

  @Component
  export default class SelectableNumberField extends mixins(SelectableField) {
    @Prop({ type: Boolean, default: false }) integer: boolean

    @Watch('model_')
    handler(value, oldValue) {
      // REDO

      if (value.length) {
        if (value[value.length - 1] == ".") {
          let test
          if (this.integer) {
            this.model_ = oldValue
            return
          } else {
            test = parseFloat(value.slice(0, value.length - 1))
          }
          if (!isNaN(test)) {
            this.model_ = value.toString()
          } else {
            this.model_ = oldValue
          }
        } else {
          if (this.integer) {
            value = parseInt(value)
          } else {
            value = parseFloat(value)
          }

          if (!isNaN(value)) {
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
