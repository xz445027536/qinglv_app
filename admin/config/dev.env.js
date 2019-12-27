'use strict'
const merge = require('webpack-merge')
const sitEnv = require('./sit.env')

module.exports = merge(sitEnv, 
    {
      NODE_ENV: '"development"',
      // BASE_API: '"https://public-gw-sit.sf-express.com/spsp-admin"'
      BASE_API: '"spsp-admin"',
      // GW_API: '"/spsp-admin"'
      GW_API: '"https://public-gw-sit.sf-express.com/spsp-admin"'
      
    }
)
