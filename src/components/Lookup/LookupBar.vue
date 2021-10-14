<template>
  <div class="lookup-bar">
    <lookup-toggle />
    <lookup-by-id />
    <div class="lookup-eth-value bar-field">
      <label>Eth Value</label>
      <input type="number" placeholder="0000" />
    </div>
    <button>
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.25">
          <circle cx="12.5" cy="12.5" r="8.33883" transform="rotate(-45 12.5 12.5)" fill="#C4C4C4" fill-opacity="0.01" stroke="black" />
          <path d="M18.4896 17.9688L23.1771 22.6563" stroke="black" />
        </g>
      </svg>
    </button>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import LookupToggle from "./LookupToggle.vue"
  import LookupById from "./LookupById.vue"

  @Component({
    components: {
      LookupToggle,
      LookupById
    }
  })
  export default class LookupBar extends Vue {

  }
</script>
<style lang="scss" scoped>
  .lookup-bar {
    width: 100%;
    max-width: 900px;
    min-height: 60px;
    border: 1px solid #ddd;
    background: #ddd;
    display: grid;
    grid-template-columns: 100px auto 114px 60px;
    grid-template-rows: 1fr;
    grid-gap: 1px;
    overflow: visible;
    transition: box-shadow 0.25s;

    &:hover {
      box-shadow: 0 4px 10px -2px rgba(0, 0, 0, 0.1);
    }

    > div {
      overflow: visible;
    }

    .lookup-eth-value {
      position: relative;

      label {
        left: auto;
        right: 12px;
        text-align: right;
      }

      input {
        text-align: right;
      }
    }

    button {
      background: white;

      svg {
        transform: translateX(-1.5px);
      }
    }
  }
</style>
