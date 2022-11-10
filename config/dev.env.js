'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"http://192.168.120.7:18000"',
  CHAIN_RPC: '"http://192.168.120.160:28102"',
  CONTRACT_ADDRESS: '"0x7D6e930A802f484dE9733Ed7583aD87Fe9B4427A"'
})
