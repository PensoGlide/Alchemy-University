require('dotenv').config();
console.log(require('dotenv').config())
/*
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
*/
require("@nomicfoundation/hardhat-toolbox");

//console.log(process.env.PRIVATE_KEY)
//console.log(process.env.ALCHEMY_URL)

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
      goerli: {
        accounts: [process.env.PRIVATE_KEY],
	      url: process.env.ALCHEMY_URL,
      }
  }
};
