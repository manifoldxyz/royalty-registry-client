import { ethers } from "ethers"
import { EIP2981RoyaltyOverrideABI } from "@/abi/EIP2981RoyaltyOverride.json"
import { EIP2981RoyaltyOverrideFactoryABI } from "@/abi/EIP2981RoyaltyOverrideFactory.json"
import { SUPPORTED_NETWORKS } from "./SupportedNetworks"

const RoyaltyOverrideFactoryAddresses: Map<number, string> = new Map([
])

export const COMMON_OVERRIDE_FACTORY_ADDRESS = '0x734513F61a65B3745fC7BB574aDFe18379355a1C'

for (const network of SUPPORTED_NETWORKS) {
  if (!RoyaltyOverrideFactoryAddresses.has(network)) {
    RoyaltyOverrideFactoryAddresses.set(network, COMMON_OVERRIDE_FACTORY_ADDRESS)
  }
}

export interface RoyaltyInfo {
  recipient: string,
  bps: number
}

interface RoyaltyInfoConfig {
  tokenId: string,
  recipient: string,
  bps: number
}

export class EIP2981RoyaltyOverrideFactory {
  private factoryContract_: ethers.Contract | null = null
  private ethersProvider_: ethers.providers.Web3Provider

  public constructor(provider: any) {
    this.ethersProvider_ = new ethers.providers.Web3Provider(provider)
    //@ts-ignore
    this.ethersProvider_.provider.on("chainChanged", () => { this.factoryContract_ = null })
  }

  /**
   * Helper to get a contract instance
   * 
   * @returns ethers.Contract
   */
   private async _getContractInstance(): Promise<ethers.Contract> {
    const network = await this.ethersProvider_.getNetwork()
    const contractAddress = RoyaltyOverrideFactoryAddresses.get(network.chainId)
    if (!contractAddress) throw new Error("Network not supported")
    if (!this.factoryContract_) {
      this.factoryContract_ = new ethers.Contract(contractAddress!, EIP2981RoyaltyOverrideFactoryABI as ethers.ContractInterface, this.ethersProvider_)
      this.factoryContract_ = this.factoryContract_.connect(this.ethersProvider_.getSigner())
    }
    return this.factoryContract_
  }

  /**
   * Create an override contract and register it with the given default royalties
   *
   * @param royaltyRegistry - The royalty registry address to register the override with
   * @param tokenAddress    - The token contract address
   * @param recipient       - Royalty recipient
   * @param bps             - Royalty bps
   * @returns
   */
  public async createOverrideAndRegisterContract(royaltyRegistry: string, tokenAddress: string, recipient: string, bps: number) {
    const contract = await this._getContractInstance()
    const createOverrideAndRegister = contract['createOverrideAndRegister(address,address,(address,uint16))']
    return createOverrideAndRegister(royaltyRegistry, tokenAddress, [recipient, bps])
  }
}

export class EIP2981RoyaltyOverride {
  private overrideContract_: ethers.Contract | null = null
  private overrideAddress_: string
  private ethersProvider_: ethers.providers.Web3Provider
  private ethersProviderWallet_: string
  
  public constructor(provider: any, overrideAddress: string) {
    this.ethersProvider_ = new ethers.providers.Web3Provider(provider)
    //@ts-ignore
    this.ethersProvider_.provider.on("accountsChanged", async() => { await this._updateWallet() })
    //@ts-ignore
    this.ethersProvider_.provider.on("chainChanged", () => { this.overrideContract_ = null })
    this.overrideAddress_ = overrideAddress
  }

  /**
   * Helper to get a contract instance
   * 
   * @returns ethers.Contract
   */
  private async _getContractInstance(): Promise<ethers.Contract> {
    if (!this.overrideContract_) {
      this.overrideContract_ = new ethers.Contract(this.overrideAddress_, EIP2981RoyaltyOverrideABI as ethers.ContractInterface, this.ethersProvider_)
      this.overrideContract_ = this.overrideContract_.connect(this.ethersProvider_.getSigner())
      await this._updateWallet() 
    }
    return this.overrideContract_
  }

  private async _updateWallet() {
    if (this.ethersProvider_.provider.request) {
      const accounts = await this.ethersProvider_.provider.request({
        method: "eth_requestAccounts",
      })
      if (accounts.length) this.ethersProviderWallet_ = accounts[0]
    }
  }

  /**
   * Whether or not the contract is an implementation of IEIP2981RoyaltyOverride
   * 
   * @returns True/False
   */
  public async overrideSupported(): Promise<boolean> {
    const contract = await this._getContractInstance()
    return await contract.supportsInterface('0xc69dbd8f')
  }

  /**
   * Get the default royalty config
   * 
   * @returns Default royalty config if it exists, null otherwise
   */
  public async getDefaultRoyalty(): Promise<RoyaltyInfo | null> {
    const contract = await this._getContractInstance()
    const result = await contract.defaultRoyalty()
    if (result[0] == '0x0000000000000000000000000000000000000000') {
      return null
    }
    return {recipient: result[0], bps: result[1]}
  }

  /**
   * Set the default roylaty for this override contract
   * 
   * @param recipient - Royalty recipient
   * @param bps       - Royalty bps
   * @returns 
   */
  public async setDefaultRoyalty(recipient: string, bps: number) {
    const contract = await this._getContractInstance()
    if (!this.ethersProviderWallet_) throw new Error('No wallet connected')
    return await contract.setDefaultRoyalty([recipient, bps], {from: this.ethersProviderWallet_})
  }


  /**
   * Set the royalty for a given token
   * 
   * @param tokenId   - The tokenId to set the override for
   * @param recipient - Royalty recipient
   * @param bps       - Royalty bps
   * @returns 
   */
  public async setTokenRoyalty(tokenId: string, recipient: string, bps: number) {
    const contract = await this._getContractInstance()
    if (!this.ethersProviderWallet_) throw new Error('No wallet connected')
    return await contract.setTokenRoyalties([[tokenId, recipient, bps]], {from: this.ethersProviderWallet_})
  }

  /**
   * Batch set royalties for many tokens.  To delete a previous setting, pass in a config
   * with a recipient address of 0x0000000000000000000000000000000000000000
   * 
   * @param royaltyConfigs - List of RoyaltyInfoConfig
   */
  public async setTokenRoyalties(configs: RoyaltyInfoConfig[]) {
    const royaltyConfigs: any[] = []
    for (const config of configs) {
      royaltyConfigs.push([config.tokenId, config.recipient, config.bps])
    }
    const contract = await this._getContractInstance()
    if (!this.ethersProviderWallet_) throw new Error('No wallet connected')
    return await contract.setTokenRoyalties(royaltyConfigs, {from: this.ethersProviderWallet_})
  }

  /**
   * Get a list of current royalty token configs
   */
  public async getTokenRoyalties(): Promise<RoyaltyInfoConfig[]> {
    const contract = await this._getContractInstance()
    const count = await contract.getTokenRoyaltiesCount()
    const royaltyConfigs: RoyaltyInfoConfig[] = []
    for (let i = 0; i < count; i++) {
      const result = await contract.getTokenRoyaltyByIndex(i)
      royaltyConfigs.push({tokenId: result[0].toString(), recipient: result[1], bps: result[2]})
    }
    return royaltyConfigs

  }

}
