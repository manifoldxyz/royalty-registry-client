import { ethers } from "ethers"
import { EIP2981RoyaltyOverrideABI } from "@/abi/EIP2981RoyaltyOverride.json"
import { EIP2981RoyaltyOverrideFactoryABI } from "@/abi/EIP2981RoyaltyOverrideFactory.json"

const RoyaltyOverrideFactoryAddresses: Map<number, string> = new Map([
  [1, '0x4Cc22d43bC646C1e496D4F739A5a0d875eB968C4'],
  [5, '0x6C544f8AcfA8368c454654E7013F7b8eBf5ba0cc'],
  [10, '0x3C7FcDbbe53C21647FCA40eCa2e499bCcE0D23cF'],
  [137, '0x5Fc888dFBAB81e890Ef314e390Cb612c4c0c6d6c'],
  [8453, '0x3C7FcDbbe53C21647FCA40eCa2e499bCcE0D23cF'],
  [80001, '0x5Fc888dFBAB81e890Ef314e390Cb612c4c0c6d6c'],
  [11155111, '0x644611f32769aaecceadec6462c9495b23b40520']
])

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
   * Create an override contract
   */
  public async createOverrideContract() {
    return (await this._getContractInstance()).createOverride()
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
