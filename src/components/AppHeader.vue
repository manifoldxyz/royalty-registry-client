<template>
  <header>
    <h1>RoyaltyRegistry.eth</h1>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="2" height="2" fill="#110011" />
      <rect y="4" width="2" height="2" fill="#110011" />
      <rect x="4" width="2" height="2" fill="#110011" />
      <rect x="4" y="4" width="2" height="2" fill="#110011" />
    </svg>
    <nav>
      <router-link to="/">Lookup</router-link>
      <a class="disabled">Configure<span>Coming Soon</span></a>
      <a href="#faq">FAQ</a>
    </nav>
    <div class="header-networks">
      <span>Mainnet</span>
      <span>Rinkeby</span>
      <span>Ropsten</span>
    </div>
  </header>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class AppHeader extends Vue {}
</script>
<style lang="scss" scoped>
  header {
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    grid-gap: 18px;
    padding: calc(var(--padding) + 10px);
    overflow: visible;

    * {
      font-size: 12px;
      text-transform: uppercase;
    }

    nav,
    .header-networks {
      display: flex;
      grid-gap: 18px;
      overflow: visible;

      a.disabled {
        opacity: 0.25;
        cursor: default;
        position: relative;
        overflow: visible;

        span {
          font-size: 75%;
          position: absolute;
          top: 200%;
          left: 50%;
          transform: translate(-50%, calc(-50% - 10px));
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.25s, transform 0.25s;
        }

        &:hover {
          span {
            opacity: 1;
            transform: translate(-50%, calc(-50%));
          }
        }
      }
    }

    .header-networks {
      display: none;
      margin-left: auto;
    }
  }
</style>
