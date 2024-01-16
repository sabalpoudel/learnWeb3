const hre = require("hardhat");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  // Deploy the NFT Contract
  const nftContract = await hre.ethers.deployContract("CryptoDevsNFT");
  await nftContract.waitForDeployment();
  console.log("CryptoDevsNFT deployed to:", nftContract.target);

  // Deploy the Fake Marketplace Contract
  const fakeNftMarketplaceContract = await hre.ethers.deployContract(
    "FakeNFTMarketplace"
  );
  await fakeNftMarketplaceContract.waitForDeployment();
  console.log(
    "FakeNFTMarketplace deployed to:",
    fakeNftMarketplaceContract.target
  );

  // Deploy the DAO Contract
  const amount = hre.ethers.parseEther("0.01"); // You can change this value from 1 ETH to something else
  const daoContract = await hre.ethers.deployContract(
    "CryptoDevsDAO",
    [fakeNftMarketplaceContract.target, nftContract.target],
    { value: amount }
  );
  await daoContract.waitForDeployment();
  console.log("CryptoDevsDAO deployed to:", daoContract.target);

  // Sleep for 30 seconds to let Etherscan catch up with the deployments
  await sleep(30 * 1000);

  // Verify the NFT Contract
  await hre.run("verify:verify", {
    address: nftContract.target,
    constructorArguments: [],
  });

  // Verify the Fake Marketplace Contract
  await hre.run("verify:verify", {
    address: fakeNftMarketplaceContract.target,
    constructorArguments: [],
  });

  // Verify the DAO Contract
  await hre.run("verify:verify", {
    address: daoContract.target,
    constructorArguments: [
      fakeNftMarketplaceContract.target,
      nftContract.target,
    ],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// CryptoDevsNFT deployed to: 0xD2174a32966F9985be3d40b5e238b70a4e484a6C
// FakeNFTMarketplace deployed to: 0xA9F4C79B6E50F5E718aF484b54a686860e8eb4f6
// CryptoDevsDAO deployed to: 0x7b252DBD73D5e67651b439ad451F65E69Dc04fA1

// Successfully verified contract CryptoDevsNFT on the block explorer.
// https://sepolia.etherscan.io/address/0xD2174a32966F9985be3d40b5e238b70a4e484a6C#code

// Successfully verified contract FakeNFTMarketplace on the block explorer.
// https://sepolia.etherscan.io/address/0xA9F4C79B6E50F5E718aF484b54a686860e8eb4f6#code

// Successfully verified contract CryptoDevsDAO on the block explorer.
// https://sepolia.etherscan.io/address/0x7b252DBD73D5e67651b439ad451F65E69Dc04fA1#code
