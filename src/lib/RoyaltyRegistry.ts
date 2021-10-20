import { ethers } from "ethers"
import { RoyaltyRegistryABI } from "../abi/RoyaltyRegistry.json"

export const RoyaltyRegistryAddresses: Map<number, string> = new Map([
   [1, '0xad2184fb5dbcfc05d8f056542fb25b04fa32a95d'],
   [3, '0x9cac159ec266E76ed7377b801f3b5d2cC7bcf40d'],
   [4, '0xc9198CbbB57708CF31e0caBCe963c98e60d333c3'],
])

export class RoyaltyRegistry {
  private registryContract_: ethers.Contract | null = null
  private registryContractReadOnly_: ethers.Contract | null = null
  private ethersProvider_: ethers.providers.Web3Provider
  private ethersProviderWallet_: string

  public constructor(provider: any) {
    this.ethersProvider_ = new ethers.providers.Web3Provider(provider)
    //@ts-ignore
    this.ethersProvider_.provider.on("accountsChanged", async() => { await this._updateWallet() })
    //@ts-ignore
    this.ethersProvider_.provider.on("chainChanged", () => {
      this.registryContract_ = null
      this.registryContractReadOnly_ = null
     })
  }

  /**
   * Helper to get a contract instance
   * 
   * @param withSigner - Whether or not we need a contract instance that can sign transactions
   * @returns ethers.Contract
   */
  private async _getContractInstance(withSigner = false): Promise<ethers.Contract> {
    const network = await this.ethersProvider_.getNetwork()
    const contractAddress = RoyaltyRegistryAddresses.get(network.chainId)
    if (!contractAddress) throw new Error("Network not supported")

    if (!withSigner) {
      if (!this.registryContractReadOnly_) {
        this.registryContractReadOnly_ = new ethers.Contract(contractAddress!, RoyaltyRegistryABI as ethers.ContractInterface, this.ethersProvider_)
      }
      return this.registryContractReadOnly_
    } else {
      if (!this.registryContract_) {
        this.registryContract_ = new ethers.Contract(contractAddress!, RoyaltyRegistryABI as ethers.ContractInterface, this.ethersProvider_)
        this.registryContract_.connect(this.ethersProvider_.getSigner())
        await this._updateWallet()
      }
      return this.registryContract_
    }
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
   * The location of where royalties should be refrenced from for a given token address
   * 
   * @param tokenAddress - The token contract address
   * @returns Location of royalty lookup
   */
  public async getRoyaltyLookupAddress(tokenAddress: string): Promise<string> {
    const contract = await this._getContractInstance()
    return await contract.getRoyaltyLookupAddress(tokenAddress)
  }

  /**
   * Check if the current connected wallet can override royalties for the given token address
   * 
   * @param tokenAddress - The token contract address
   * @returns True/False
   */
  public async overrideAllowed(tokenAddress: string): Promise<boolean> {
    const contract = await this._getContractInstance(true)
    if (!this.ethersProviderWallet_) throw new Error('No wallet address to check')
    return await contract.overrideAllowed(tokenAddress, {from: this.ethersProviderWallet_})
  }

  /**
   * Set royalty override address
   * 
   * @param tokenAddress  - The token contract address
   * @param overrideAddress - The royalty override address
   * @returns Transaction reponse
   */
  public async setRoyaltyLookupAddress(tokenAddress: string, overrideAddress: string) {
    const contract = await this._getContractInstance(true)
    if (!this.ethersProviderWallet_) throw new Error('No wallet connected')
    return await contract.setRoyaltyLookupAddress(tokenAddress, overrideAddress, {from: this.ethersProviderWallet_})
  }


}
