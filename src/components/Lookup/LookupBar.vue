<template>
  <div class="lookup-bar">
    <lookup-toggle :selected="lookupBy" @toggle="lookupBy = $event" />
    <lookup-by-id v-if="lookupBy == 'id'" @values="setValues($event)" />
    <lookup-by-url v-if="lookupBy == 'url'" @values="setValues($event)" />
    <div class="lookup-eth-value bar-field">
      <label>Eth Value</label>
      <input type="text" placeholder="0000" v-model="ethValue" @focus="selectAll" />
    </div>
    <button :disabled="disabled">
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="1">
          <circle cx="12.5" cy="12.5" r="8.33883" transform="rotate(-45 12.5 12.5)" stroke="black" />
          <path d="M18.4896 17.9688L23.1771 22.6563" stroke="black" />
        </g>
      </svg>
    </button>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator"
  import LookupToggle from "./LookupToggle.vue"
  import LookupById from "./LookupById.vue"
  import LookupByUrl from "./LookupByURL.vue"
  import { getCookie, setCookie } from "@/lib/cookies"

  @Component({
    components: {
      LookupToggle,
      LookupById,
      LookupByUrl
    }
  })
  export default class LookupBar extends Vue {
    lookupBy: string = 'url'
    address: string = ''
    id: string = ''
    ethValue: number = 1
    disabled: boolean = true

    created() {
      const _lookupBy = getCookie('lookupBy')
      if (_lookupBy) {
        this.lookupBy = _lookupBy
      }
    }

    @Watch('lookupBy')
    lookupHandler(value, oldValue) {
      setCookie('lookupBy', value, 10)
    }

    @Watch('ethValue')
    ethHandler(value, oldValue) {
      if (value.length == 0) {
        this.ethValue = 1
        this.validate()
        return
      }
      if (!isNaN(parseInt(value))) {
        this.ethValue = parseInt(value)
      } else {
        this.ethValue = oldValue
      }
      this.validate()
      return
    }

    setValues(values) {
      this.address = values.address
      this.id = values.id
      this.validate()
    }

    selectAll(e) {
      e.target.setSelectionRange(0, e.target.value.length)
    }

    validate() {
      if (
        this.address &&
        this.id &&
        this.address.length &&
        this.id.length &&
        this.ethValue &&
        this.ethValue > 0
      ) {
        this.disabled = false
      }
      else {
        this.disabled = true
      }
    }
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
      transition: background 0.25s;

      svg {
        transform: translateX(-1.5px);

        g {
          transition: opacity 0.25s;
        }
      }

      &[disabled] {
        pointer-events: none;

        svg {
          g {
            opacity: 0.25;
          }
        }
      }

      &:not([disabled]) {
        &:hover {
          background: #f7f7f7;

          svg {
            g {
              opacity: 1;
            }
          }
        }
      }
    }
  }
</style>
