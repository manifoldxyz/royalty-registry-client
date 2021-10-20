import { ethers } from "ethers"
import { RoyaltyRegistryABI } from "../abi/RoyaltyRegistry.json"

const ERC165ABI = [
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const RoyaltySpecs: Map<string, string> = new Map([
  ['0xbb3bafd6', 'Manifold'],
  ['0xb7799584', 'RaribleV1'],
  ['0xcad96cca', 'RaribleV2'],
  ['0x2a55205a', 'EIP2981'],
])

export class RoyaltySpecChecker {
  private ethersProvider_: ethers.providers.Web3Provider

  public constructor(provider: any) {
    this.ethersProvider_ = new ethers.providers.Web3Provider(provider)
  }

  /**
   * Check the royalty interface that a given contract supports
   * 
   * @param tokenAddress - The token contract address
   * @returns Location of royalty lookup
   */
  public async getRoyaltySpec(tokenAddress: string): Promise<string|null> {
    const contract = await new ethers.Contract(tokenAddress, ERC165ABI as ethers.ContractInterface, this.ethersProvider_)
    try {
      for (const [interfaceId, spec] of RoyaltySpecs.entries()) {
        if (await contract.supportsInterface(interfaceId)) {
          return spec
        }
      }
    } catch {
      return null
    }
    return null
  }

}
