const NETWORK_DOMAINS: {[key: number]: string} = {
  1: 'https://etherscan.io/',
  11155111: 'https://sepolia.etherscan.io/',
  10: 'https://optimistic.etherscan.io/',
  56: 'https://bscscan.com/',
  137: 'https://polygonscan.com/',
  8453: 'https://basescan.org/',
  42161: 'https://arbiscan.io/',
  43114: 'https://snowtrace.io/',
  80001: 'https://mumbai.polygonscan.com/'
}

export const getEtherscanAddressUrl = function(network, address) {
  return `${NETWORK_DOMAINS[network] || ''}address/${address}`
}

export const getEtherscanTokenUrl = function(network, address, id) {
  return `${NETWORK_DOMAINS[network] || ''}token/${address}?a=${id}`
}

export const getEtherscanTxUrl = function(network, hash) {
  return `${NETWORK_DOMAINS[network] || ''}tx/${hash}`
}
