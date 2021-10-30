<template>
  <div id="faq" class="faq">
    <h2>Frequently Asked Questons</h2>

    <details>
      <summary>
        <h3>How do on-chain Royalties work?</h3>
      </summary>
      <div>
        <p>
          Whenever an NFT sale occurs in a marketplace, it is up to the marketplace to hold back part of the proceeds of the sale to distribute to the original content creator. But how does the marketplace know how much to hold back and where to send the royalties to? That’s where on-chain Royalties come in.
        </p>
        <p>
          On-chain royalties are royalty configurations that are baked into the original token contract. They provide a way for marketplaces to ask those contracts what the appropriate royalty amount is and who the royalty recipient should be for any token in that contract.
        </p>
        <p>
          There are a number of token specs out there, including EIP2981, SuperRare, Rarible and Manifold.  While they all do similar things (i.e. provide a royalty amount and recipient address per token), they have slightly different implementations.  This makes it difficult for marketplaces to adhere to all the royalty specs, and is problematic for older tokens to add on-chain royalty configurations (i.e. tokens that may have launched on OpenSea with royalties set up off-chain).
        </p>
      </div>
    </details>
    <details>
      <summary>
        <h3>What is the Royalty Registry?</h3>
      </summary>
      <div>
        <p>
          The goal of the Royalty Registry is twofold:
        </p>
        <ul>
          <li>
            Make it easy for marketplaces to use the appropriate on-chain royalty configurations
          </li>
          <li>
            Make it possible for contracts that did not originally support on-chain royalties to add them
          </li>
        </ul>
        <p>
          The Royalty Registry is composed of two parts: the Royalty Registry and the Royalty Engine. The code can be found here: <a target="_blank" href="https://github.com/manifoldxyz/royalty-registry-solidity">https://github.com/manifoldxyz/royalty-registry-solidity</a>
        </p>
        <p>
          <strong>The Royalty Registry</strong> is an on chain contract that is responsible for storing Royalty configuration overrides.  The address for the registry is royaltyregistry.eth (<a target="_blank" :href="getEtherscanAddressUrl(1, registry.get(1))">{{ registry.get(1) }}</a>).
        </p>
        <p>
          It provides the ability for contracts which did not originally support any of the on-chain Royalty specifications to add this functionality to their smart contract. A reference EIP2981 override implementation can be found here: <a target="_blank" href="https://github.com/manifoldxyz/royalty-registry-solidity/blob/main/contracts/overrides/RoyaltyOverride.sol">https://github.com/manifoldxyz/royalty-registry-solidity/blob/main/contracts/overrides/RoyaltyOverride.sol</a>.
        </p>
        <p>
          To set an override, you can simply click the 'Configure' section at the top of the page which will guide you through deploying an override contract and configuring it.
        </p>
        <p>
          If you want to use custom override logic beyond the reference implementation, you will need to deploy an instance of your royalty override contract, set the appropriate royalty values, then call the Royalty Registry’s <strong><em>setRoyaltyLookupAddress</em></strong> function. Only the original contract owner or contract admins can set an override for their contract.
        </p>
        <p>
          <strong>The Royalty Engine</strong> is a contract that provides an easy way for any marketplace to look up royalties for any given token contract. If a token contract has set an override in the Royalty Registry, it will use that information. Otherwise, it will attempt to use royalty information from any of the supported specs:
        </p>
        <ul>
          <li>EIP2981</li>
          <li>Manifold and Foundation</li>
          <li>Rarible</li>
          <li>SuperRare</li>
          <li>Zora (limited functionality)</li>
        </ul>
        <p>
          You can use the deployed Royalty Engine at engine-v1.royaltyregistry.eth (<a target="_blank" :href="getEtherscanAddressUrl(1, engine.get(1))">{{ engine.get(1) }}</a>) or you can fork the engine and include it in your marketplace.
        </p>
      </div>
    </details>
    <details>
      <summary>
        <h3>Who built the Royalty Registry?</h3>
      </summary>
      <div>
        <p>
          Manifold.xyz built the Royalty Registry in collaboration with Foundation, Nifty Gateway, OpenSea, Rarible and SuperRare. We all believe that it’s important to ensure creators get their fair share of every sale.
        </p>
      </div>
    </details>
    <details>
      <summary>
        <h3>Source Code</h3>
      </summary>
      <div>
        <p>
          All the code is opens sourced and free to for anyone to explore and contribute.  The github repositories are:
        </p>
        <ul>
          <li>Solidity Contracts: <a href="https://github.com/manifoldxyz/royalty-registry-solidity">https://github.com/manifoldxyz/royalty-registry-solidity</a></li>
          <li>Website: <a href="https://github.com/manifoldxyz/royalty-registry-client">https://github.com/manifoldxyz/royalty-registry-client</a></li>
        </ul>
      </div>
    </details>
    <details>
      <summary>
        <h3>For Creators</h3>
      </summary>
      <div>
        <p>
          If your token contract already supports EIP2981 or is a Manifold, Rarible or Zora based contract, you’re all good to go!  If you have a token created from Foundation, Rarible or SuperRare, they are supported and you can manage your royalties on their respective websites.
        </p>
        <p>
          If none of the above apply, not to worry! Simply click 'Configure' at the top of this page to deploy your own on-chain royalty configuration for your old token contracts.  Creators whose token contract was provided by another platform may want to contact the platform or contract owner for support with this operation.
        </p>
      </div>
    </details>
    <details>
      <summary>
        <h3>For Developers and Marketplaces</h3>
      </summary>
      <div>
        <p>
          If you are a developer and wish to use the Royalty Engine for royalty lookups, the abi is <a href="https://github.com/manifoldxyz/royalty-registry-client/blob/main/src/abi/RoyaltyEngineV1.json">here</a> and the Royalty Engine locations are:
        </p>
        <ul>
          <li>Mainnet: {{ engine.get(1) }}.</li>
          <li>Rinkeby: {{ engine.get(4) }}.</li>
          <li>Ropsten: {{ engine.get(3) }}.</li>
          <li>Polygon: {{ engine.get(137) }}.</li>
          <li>Mumbai: {{ engine.get(80001) }}.</li>
        </ul>
        <p>
          If you would like to access the Royalty Registry directly to build your own lookup engine, the abi is <a href="https://github.com/manifoldxyz/royalty-registry-client/blob/main/src/abi/RoyaltyRegistry.json">here</a> and the Royalty Registry locations are:
        </p>
        <ul>
          <li>Mainnet: {{ registry.get(1) }}.</li>
          <li>Rinkeby: {{ registry.get(4) }}.</li>
          <li>Ropsten: {{ registry.get(3) }}.</li>
          <li>Polygon: {{ registry.get(137) }}.</li>
          <li>Mumbai: {{ registry.get(80001) }}.</li>
        </ul>
      </div>
    </details>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { RoyaltyRegistryAddresses } from "@/lib/RoyaltyRegistry"
  import { RoyaltyEngineV1Addresses } from "@/lib/RoyaltyEngineV1"
  import { getEtherscanAddressUrl } from "@/lib/etherscan"

  @Component
  export default class Faq extends Vue {
    registry: Map<number, string> = new Map()
    engine: Map<number, string> = new Map()
    getEtherscanAddressUrl: Function = getEtherscanAddressUrl

    created() {
      this.registry = RoyaltyRegistryAddresses
      this.engine = RoyaltyEngineV1Addresses
    }
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
      border-bottom: var(--border);

      &:first-of-type {
        border-top: var(--border);
      }

      summary {
        padding: 20px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        -webkit-appearance: none;
        position: relative;

        &::-webkit-details-marker {
          display: none;
        }

        h3 {
          font-size: 20px;
        }

        &::after {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          display: block;
          content: '';
          width: 10px;
          height: 5px;
          background: url('data:image/svg+xml;utf8,<svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 5L10 -4.76837e-07L-5.1656e-07 -1.35107e-06L5 5Z" fill="black" /></svg>');
        }
      }

      > div {
        padding: 0 10px 20px 10px;

        * {
          font-size: 16px;
          line-height: 1.5;
          color: #666;

          strong {
            font-size: inherit;
            font-weight: 900;
          }

          em {
            font-size: inherit;
            font-style: italic;
          }

          a {
            text-decoration: underline;
          }
        }

        > * {
          margin-bottom: 1rem;

          &:last-child {
            margin-bottom: 0;
          }
        }

        ul {
          list-style-type: square;
          list-style-position: inside;

          li {
            width: calc(100% - 5px);
            margin-left: 5px;
          }
        }
      }

      &[open] {
        summary {
          &::after {
            transform: rotate(180deg) translateY(50%) !important;
          }
        }
      }
    }
  }
</style>
