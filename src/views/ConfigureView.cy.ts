import ConfigureView from './ConfigureView.vue'
import { mock, resetMocks } from '@depay/web3-mock'
import { mount } from 'cypress/vue2'


describe('<ConfigureView />', () => {
  const blockchain = 'ethereum'
  const accounts = ['0xd8da6bf26964af9d7eed9e03e53415d37aa96045']
  beforeEach(resetMocks)
  beforeEach(() => mock({ blockchain, accounts: { return: accounts } }))

  it('it should load step 1', () => {
    mount(ConfigureView)
    cy.get('[class=step-label]').should('contain.text', 'Step 1 / 3 : Enter Token Address')
    cy.get('h2').should('contain.text', 'Enter Token Address')
  })

  it('it should follow the flow of the new contract override for supported token', () => {
    // Mock step 2 
    mock({
      blockchain: 'ethereum',
      request: {
        to: '0xad2184fb5dbcfc05d8f056542fb25b04fa32a95d',
        api: [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "address", "name": "tokenAddress", "type": "address" }, { "indexed": false, "internalType": "address", "name": "royaltyAddress", "type": "address" }], "name": "RoyaltyOverride", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }], "name": "getRoyaltyLookupAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }], "name": "overrideAllowed", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "address", "name": "royaltyLookupAddress", "type": "address" }], "name": "setRoyaltyLookupAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
        method: 'overrideAllowed',
        params: '0xa0bed124a09ac2bd941b10349d8d224fe3c955eb',
        return: true
      }
    })
    mock({
      blockchain: 'ethereum',
      request: {
        to: '0xad2184fb5dbcfc05d8f056542fb25b04fa32a95d',
        api: [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "address", "name": "tokenAddress", "type": "address" }, { "indexed": false, "internalType": "address", "name": "royaltyAddress", "type": "address" }], "name": "RoyaltyOverride", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }], "name": "getRoyaltyLookupAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }], "name": "overrideAllowed", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "address", "name": "royaltyLookupAddress", "type": "address" }], "name": "setRoyaltyLookupAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
        method: 'getRoyaltyLookupAddress',
        params: '0xa0bed124a09ac2bd941b10349d8d224fe3c955eb',
        return: '0xa0bed124a09ac2bd941b10349d8d224fe3c955eb',
      }
    })
    mock({
      blockchain: 'ethereum',
      transaction: {
        to: '0x734513f61a65b3745fc7bb574adfe18379355a1c',
        api: [{ "inputs": [{ "internalType": "address", "name": "singleOrigin", "type": "address" }, { "internalType": "address", "name": "multiOrigin", "type": "address" }, { "internalType": "address payable", "name": "royaltySplitterOrigin", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "InvalidRoyaltyRegistryAddress", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "newEIP2981RoyaltyOverride", "type": "address" }], "name": "EIP2981RoyaltyOverrideCreated", "type": "event" }, { "inputs": [], "name": "MULTI_RECIPIENT_ORIGIN_ADDRESS", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ROYALTY_SPLITTER_ORIGIN_ADDRESS", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "SINGLE_RECIPIENT_ORIGIN_ADDRESS", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "royaltyRegistry", "type": "address" }, { "internalType": "address", "name": "tokenAddress", "type": "address" }, { "components": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint16", "name": "bps", "type": "uint16" }], "internalType": "struct IEIP2981RoyaltyOverride.TokenRoyalty", "name": "defaultRoyalty", "type": "tuple" }], "name": "createOverrideAndRegister", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "royaltyRegistry", "type": "address" }, { "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint16", "name": "defaultBps", "type": "uint16" }, { "components": [{ "internalType": "address payable", "name": "recipient", "type": "address" }, { "internalType": "uint16", "name": "bps", "type": "uint16" }], "internalType": "struct Recipient[]", "name": "defaultRecipients", "type": "tuple[]" }], "name": "createOverrideAndRegister", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "nonpayable", "type": "function" }],
        method: 'createOverrideAndRegister',
        params: {
          royaltyRegistry: "0xad2184fb5dbcfc05d8f056542fb25b04fa32a95d",
          tokenAddress: "0xa0bed124a09ac2bd941b10349d8d224fe3c955eb",
          defaultRoyalty: [
            "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
            "100",
          ]
        },
        return: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      }
    })

    cy.mount(ConfigureView)
    // Make sure step 2 is rendered
    cy.get('[placeholder=0x0123456789abcdef]').type('0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb')
    cy.get('[class=token-address-bar]').find('button').click()
    cy.get('[class=step-label]').should('contain.text', 'Step 2 / 3 : Token Royalties')

    // Go to step 3
    cy.get('[class="step2-content show"]').find('button').contains('Create New Override').click()

    cy.get('[class=step-label]').should('contain.text', 'Step 3 / 3 : Configure Royalty Overrides And Deploy The Override Contract')
    cy.get('h2').should('contain.text', 'Token Contract Default Royalty')
    cy.get('[class=selectable-field]').find('label').contains('Recipient Address').parent().children().last().type('0xd8da6bf26964af9d7eed9e03e53415d37aa96045')
    cy.get('[class="selectable-field right-align"]').find('label').contains('Royalty Basis Points').parent().children().last().type('100')

    // Deploy the new contract override
    cy.get('[class="step3-content show"]').find('button').contains('Deploy The Override Contract With The Default Royalty').click()

    // cy.reload()
    // Step 3 after deployment
    // cy.get('[class=step-label]').should('contain.text', 'Step 3 / 3 : Configure Royalty Overrides')
  })

  it('it shouldn\'t proceed if token isn\'t supported', () => {
    // Mock step 2 
    mock({
      blockchain: 'ethereum',
      request: {
        to: '0xad2184fb5dbcfc05d8f056542fb25b04fa32a95d',
        api: [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "address", "name": "tokenAddress", "type": "address" }, { "indexed": false, "internalType": "address", "name": "royaltyAddress", "type": "address" }], "name": "RoyaltyOverride", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }], "name": "getRoyaltyLookupAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }], "name": "overrideAllowed", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "address", "name": "royaltyLookupAddress", "type": "address" }], "name": "setRoyaltyLookupAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
        method: 'overrideAllowed',
        params: '0xa0bed124a09ac2bd941b10349d8d224fe3c955eb',
        return: false,
      }
    })
    mock({
      blockchain: 'ethereum',
      request: {
        to: '0xad2184fb5dbcfc05d8f056542fb25b04fa32a95d',
        api: [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "address", "name": "tokenAddress", "type": "address" }, { "indexed": false, "internalType": "address", "name": "royaltyAddress", "type": "address" }], "name": "RoyaltyOverride", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }], "name": "getRoyaltyLookupAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }], "name": "overrideAllowed", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "address", "name": "royaltyLookupAddress", "type": "address" }], "name": "setRoyaltyLookupAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
        method: 'getRoyaltyLookupAddress',
        params: '0xa0bed124a09ac2bd941b10349d8d224fe3c955eb',
        return: '0xa0bed124a09ac2bd941b10349d8d224fe3c955eb',
      }
    })

    cy.mount(ConfigureView)
    // Make sure step 2 is rendered
    cy.get('[placeholder=0x0123456789abcdef]').type('0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb')
    cy.get('[class=token-address-bar]').find('button').click()
    cy.get('[class=step-label]').should('contain.text', 'Step 2 / 3 : Token Royalties')

    // Attempt to go to step 3
    cy.get('[class="step2-content show"]').find('button').contains('Create New Override').click()
    cy.get('[class=step-label]').should('contain.text', 'Step 2 / 3 : Token Royalties')
    cy.get('[class="step2-content show"]').find('button').contains('Create New Override').trigger('mouseover')
    cy.get('[class="step2-content show"]').find('button').contains('Create New Override').get('[class="full disabled"]')
  })
})