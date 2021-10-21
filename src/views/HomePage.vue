<template>
  <load-screen />
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import LoadScreen from "@/components/LoadScreen.vue"

  @Component({
    components: {
      LoadScreen
    }
  })
  export default class HomePage extends Vue {
    mounted() {
      setTimeout(() => {
        this.$router.push('/lookup')
      }, 1000)
    }
  }
</script>
