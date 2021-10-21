export const getEtherscanAddressUrl = function(network, address) {
  if (network == 1) {
    return `https://etherscan.io/address/${address}`
  } else if (network == 3) {
    return `https://ropsten.etherscan.io/address/${address}`
  } else if (network == 4) {
    return `https://rinkeby.etherscan.io/address/${address}`
  }
}

export const getEtherscanTokenUrl = function(network, address, id) {
  if (network == 1) {
    return `https://etherscan.io/token/${address}?a=${id}`
  } else if (network == 3) {
    return `https://ropsten.etherscan.io/token/${address}?a=${id}`
  } else if (network == 4) {
    return `https://rinkeby.etherscan.io/token/${address}?a=${id}`
  }
}

export const getEtherscanTxUrl = function(network, hash) {
  if (network == 1) {
    return `https://etherscan.io/tx/${hash}`
  } else if (network == 3) {
    return `https://ropsten.etherscan.io/tx/${hash}`
  } else if (network == 4) {
    return `https://rinkeby.etherscan.io/tx/${hash}`
  }
}
