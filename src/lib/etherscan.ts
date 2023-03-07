export const getEtherscanAddressUrl = function(network, address) {
  if (network == 1) {
    return `https://etherscan.io/address/${address}`
  } else if (network == 3) {
    return `https://ropsten.etherscan.io/address/${address}`
  } else if (network == 5) {
    return `https://goerli.etherscan.io/address/${address}`
  } else if (network == 42) {
    return `https://kovan.etherscan.io/address/${address}`
  } else if (network == 137) {
    return `https://polygonscan.com/address/${address}`
  } else if (network == 80001) {
    return `https://mumbai.polygonscan.com/address/${address}`
  }
}

export const getEtherscanTokenUrl = function(network, address, id) {
  if (network == 1) {
    return `https://etherscan.io/token/${address}?a=${id}`
  } else if (network == 3) {
    return `https://ropsten.etherscan.io/token/${address}?a=${id}`
  } else if (network == 5) {
    return `https://goerli.etherscan.io/token/${address}?a=${id}`
  } else if (network == 42) {
      return `https://kovan.etherscan.io/token/${address}?a=${id}`
  } else if (network == 137) {
    return `https://polygonscan.com/token/${address}?a=${id}`
  } else if (network == 80001) {
    return `https://mumbai.polygonscan.com/token/${address}?a=${id}`
  }
}

export const getEtherscanTxUrl = function(network, hash) {
  if (network == 1) {
    return `https://etherscan.io/tx/${hash}`
  } else if (network == 3) {
    return `https://ropsten.etherscan.io/tx/${hash}`
  } else if (network == 5) {
    return `https://goerli.etherscan.io/tx/${hash}`
  } else if (network == 42) {
    return `https://kovan.etherscan.io/tx/${hash}`
  } else if (network == 137) {
    return `https://polygonscan.com/tx/${hash}`
  } else if (network == 80001) {
    return `https://mumbai.polygonscan.com/tx/${hash}`
  }
}
