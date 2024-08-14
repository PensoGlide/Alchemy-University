const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Faucet', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const [owner] = await ethers.getSigners();

    const Faucet = await ethers.getContractFactory('Faucet');
    const depositAmount = ethers.parseUnits("1.0", "ether");
    const faucet = await Faucet.deploy({ value: depositAmount });

    console.log('Signer 1 address: ', owner.address);
    return { faucet, owner };
  }

  it('should deploy and set the owner correctly', async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  it('should restrict withdrawAll to the owner', async function () {
    const [, alice, bob] = await ethers.getSigners();
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    await expect(faucet.connect(alice).withdrawAll()).to.be.reverted;
    await expect(faucet.connect(bob).withdrawAll()).to.be.reverted;
    await expect(faucet.connect(owner).withdrawAll()).to.not.reverted;
  });

  it('should not allow withdrawals above .1 ETH at a time', async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    let withdrawAmount = ethers.parseUnits("1.0", "ether");

    await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
  });

  it('should not allow users to destroy contract', async function () {
    const [, alice, bob] = await ethers.getSigners();
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    const withdrawAmount = ethers.parseUnits("1.0", "ether");

    const ownerBalance = await ethers.provider.getBalance(owner.getAddress());
    let faucetBalance = await ethers.provider.getBalance(faucet.getAddress());
    const uncertainty = ethers.parseEther("0.0005409542974762"); // +/- 1 USD

    expect(faucetBalance).to.be.greaterThan(0);
    await expect(faucet.connect(alice).destroyFaucet()).to.be.reverted;
    await expect(faucet.connect(owner).destroyFaucet()).to.not.reverted;

    // After contract selfdestroyed
    const finalOwnerBalance = await ethers.provider.getBalance(owner.getAddress());
    faucetBalance = await ethers.provider.getBalance(faucet.getAddress());
    expect(faucetBalance).to.equal(0);
    expect(finalOwnerBalance).to.closeTo(ownerBalance + withdrawAmount, uncertainty);
  });
});
