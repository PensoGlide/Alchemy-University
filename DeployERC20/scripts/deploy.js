const { ethers } = require('hardhat');
require('dotenv').config();

async function main() {
  const provider = ethers.getDefaultProvider(process.env.ALCHEMY_URL);
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const weiAmount = (await provider.getBalance(deployer.address)).toString();
  console.log("Account balance:", (await ethers.formatEther(weiAmount)));

  // make sure to replace the "GoofyGoober" reference with your own ERC-20 name!
  /*
  const Token = await ethers.getContractFactory("GoofyGoober");
  const token = await Token.deploy();

  console.log("Token address:", token.target);
  */
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
