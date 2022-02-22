import { ethers } from "ethers"
import { RoyaltyEngineV1ABI } from "../abi/RoyaltyEngineV1.json"

export const RoyaltyEngineV1Addresses: Map<number, string> = new Map([
   [1, '0x0385603ab55642cb4dd5de3ae9e306809991804f'],
   [3, '0xa54939F6c97198EdD3E63a43df5ff201f20e3b20'],
   [4, '0x8d17687ea9a6bb6efA24ec11DcFab01661b2ddcd'],
   [137, '0x28EdFcF0Be7E86b07493466e7631a213bDe8eEF2'],
   [80001, '0x0a01E11887f727D1b1Cd81251eeEE9BEE4262D07'],
])

export interface RoyaltyInfo {
  recipient: string,
  amount: ethers.BigNumber
}

export class RoyaltyEngineV1 {
  private engineContract_: ethers.Contract | null = null
  private ethersProvider_: ethers.providers.Web3Provider
  
  public constructor(provider: any) {
    this.ethersProvider_ = new ethers.providers.Web3Provider(provider)
    //@ts-ignore
    this.ethersProvider_.provider.on("chainChanged", () => { this.engineContract_ = null })
  }

  /**
   * Helper to get a contract instance
   * 
   * @returns ethers.Contract
   */
  private async _getContractInstance(): Promise<ethers.Contract> {
    const network = await this.ethersProvider_.getNetwork()
    const contractAddress = RoyaltyEngineV1Addresses.get(network.chainId)
    if (!contractAddress) throw new Error("Network not supported")
    if (!this.engineContract_) {
      this.engineContract_ = new ethers.Contract(contractAddress!, RoyaltyEngineV1ABI as ethers.ContractInterface, this.ethersProvider_)
    }
    return this.engineContract_
  }

  /**
   * Get the royalties of a given token
   * 
   * @param tokenAddress - The token contract address
   * @param tokenId      - The token id
   * @param amount       - The amount to get the royalty for
   * @returns Location of royalty lookup
   */
  public async getRoyalty(tokenAddress: string, tokenId: string, amount: ethers.BigNumber): Promise<RoyaltyInfo[]> {
    const contract = await this._getContractInstance()
    const result = await contract.getRoyaltyView(tokenAddress, tokenId, amount)
    const royalties: RoyaltyInfo[] = []
    for (let i = 0; i < result[0].length; i++) {
      let recipient = result[0][i]
      // ENS lookup
      try {
        const _recipient = await this.ethersProvider_.lookupAddress(recipient)
        if (_recipient) {
          recipient = _recipient
        }
      } catch {
        // Do nothing, no ENS name is ok
      }
      royalties.push({recipient:recipient, amount:result[1][i]})
    }
    return royalties
  }


}
