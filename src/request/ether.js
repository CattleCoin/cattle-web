import Web3 from 'web3'
import contractAbi from '../../abi.json'

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.CHAIN_RPC))
const contractAddress = process.env.CONTRACT_ADDRESS
const myContract = new web3.eth.Contract(contractAbi, contractAddress)

export function connectWallet () {
  return new Promise((resolve, reject) => {
    window.ethereum.enable().then((res) => {
      resolve(res[0])
    }).catch(e => {
      reject(e)
    })
  })
}

export function betting (address, value) {
  return new Promise((resolve, reject) => {
    window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: address,
            to: contractAddress,
            value: value, // 10 matic
            data: myContract.methods.betting().encodeABI(),
            chainId: 20220108
          }
        ]
      })
      .then((txHash) => resolve)
      .catch((error) => {
        reject(error)
      })
  })
}

export function pledge (address, value) {
  return new Promise((resolve, reject) => {
    window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: address,
            to: contractAddress,
            value: '0x' + value.toString(16), // 1/1000 matic
            data: myContract.methods.pledge().encodeABI()
          }
        ]
      })
      .then((txHash) => {
        resolve(txHash)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
