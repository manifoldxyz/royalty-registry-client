import { ethers } from "ethers"
import { EIP2981RoyaltyOverrideABI } from "../abi/EIP2981RoyaltyOverride.json"


interface RoyaltyInfo {
  recipient: string,
  bps: number
}

class EIP2981RoyaltyOverride {
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
    return await contract.supportsInterface('0x3bea9a6a')
  }

  /**
   * Get the default royalty config
   * 
   * @returns Default royalty config if it exists, null otherwise
   */
  public async getDefaultRoyalty(): Promise<RoyaltyInfo | null> {
    const contract = await this._getContractInstance()
    const result = contract.defaultRoyalty()
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
    return await contract.setDefaultRoyalty(recipient, bps, {from: this.ethersProviderWallet_})
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
    return await contract.setTokenRoyalty(tokenId, recipient, bps, {from: this.ethersProviderWallet_})
  }

}