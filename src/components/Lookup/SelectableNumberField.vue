<script lang="ts">
  import { mixins } from 'vue-class-component'
  import { Component, Watch } from 'vue-property-decorator'
  import SelectableField from "./SelectableField.vue"

  @Component
  export default class SelectableNumberField extends mixins(SelectableField) {
    @Watch('model_')
    handler(value, oldValue) {
      value = parseInt(value)

      if (value.length) {
        if (!isNaN(value)) {
          this.model_ = value.toString()
        } else {
          this.model_ = oldValue
        }
      }

      this.$emit('change', this.model_)
    }
  }
</script>
