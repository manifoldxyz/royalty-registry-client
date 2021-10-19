<template>
  <selectable-field
    label="Search By URL"
    placeholder="https://example.org/0x0123456789abcdef/1"
    :class="{error}"
    :model="address"
    @change="address = $event"
  />
</template>
<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import SelectableField from "./SelectableField.vue"

  @Component({
    components: {
      SelectableField,
    }
  })
  export default class LookupByURL extends Vue {
    error: boolean = false

    @Watch('address')
    parseAdderss(url) {
      // TODO
      this.error = true
    }
  }
</script>
