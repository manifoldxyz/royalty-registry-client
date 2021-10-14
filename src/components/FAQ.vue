<template>
  <div class="faq">
    <h2>Frequently Asked Questons</h2>

    <details>
      <summary>
        <h3>How do on-chain Royalties work?</h3>
        <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 5L10 -4.76837e-07L-5.1656e-07 -1.35107e-06L5 5Z" fill="black" />
        </svg>
      </summary>
      <div>
        <p>
          Whenever an NFT sale occurs in a marketplace, it is up to the marketplace to hold back part of the proceeds of the sale to distribute to the original content creator. But how does the marketplace know how much to hold back and where to send the royalties to? That’s where on-chain Royalties come in.
        </p>
      </div>
    </details>

    <details>
      <summary>
        <h3>How do on-chain Royalties work?</h3>
        <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 5L10 -4.76837e-07L-5.1656e-07 -1.35107e-06L5 5Z" fill="black" />
        </svg>
      </summary>
      <div>
        <p>
          Whenever an NFT sale occurs in a marketplace, it is up to the marketplace to hold back part of the proceeds of the sale to distribute to the original content creator. But how does the marketplace know how much to hold back and where to send the royalties to? That’s where on-chain Royalties come in.
        </p>
      </div>
    </details>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component
  export default class Faq extends Vue {

  }
</script>
<style lang="scss" scoped>
  .faq {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;

    h2 {
      display: block;
      width: 100%;
      font-size: 24px;
      padding: 10px;
      margin-bottom: 30px;
    }

    details {
      border-bottom: 1px solid #ddd;

      &:first-of-type {
        border-top: 1px solid #ddd;
      }

      summary {
        padding: 20px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h3 {
          font-size: 20px;
        }
      }

      > div {
        padding: 0 10px 20px 10px;

        p {
          font-size: 16px;
          line-height: 1.5;
        }
      }

      &[open] {
        summary {
          svg {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
</style>
