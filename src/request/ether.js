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

export function betting (address, data) {
  return new Promise((resolve, reject) => {
    window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: address,
            to: contractAddress,
            value: data.amount, // 10 matic
            data: myContract.methods.betting(data.game_number, data.choice).encodeABI(),
            chainId: 20220108
          }
        ]
      })
      .then((txHash) => {
        console.log('bet hash: ', txHash)
        resolve(txHash)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function createGame (address, data) {
  return new Promise((resolve, reject) => {
    window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: address,
            to: contractAddress,
            data: myContract.methods.createCustomGame(data.name, data.cover, data.duration).encodeABI(),
            chainId: 20220108
          }
        ]
      })
      .then((txHash) => {
        console.log('bet hash: ', txHash)
        resolve(txHash)
      })
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
        console.log('pledge hash: ', txHash)
        resolve(txHash)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
