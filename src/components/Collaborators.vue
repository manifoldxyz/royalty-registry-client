<template>
  <div class="built-in-collaboration-with">
    <span>Built in Collaboration with</span>
    <div class="built-in-collaboration-with-logos">
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component
  export default class Collaborators extends Vue {

  }
</script>
<style lang="scss" scoped>
  .built-in-collaboration-with {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    grid-gap: 40px;
    max-width: 900px;
    margin: 0 auto;

    span {
      font-size: 10px;
      text-transform: uppercase;
      display: inline-block;
      width: min-content;
      white-space: nowrap;
    }

    .built-in-collaboration-with-logos {
      display: flex;
      grid-gap: 35px;
      justify-content: center;
      align-items: center;

      i {
        width: 38px;
        height: 38px;
        border-radius: 10px;
        background: lightgrey;
      }
    }
  }
</style>
