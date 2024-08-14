require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const apiKey = process.env.API_KEY;
const privateKey = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
	goerli: {
		url: apiKey,
		accounts: [`0x${privateKey}`],
	}
  }
};
