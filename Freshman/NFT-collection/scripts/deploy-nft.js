const hre = require("hardhat");

const wLContractAddress = "0x7D115d3416bb3B4bf4F410281D40754F91D18279";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const nftContract = await hre.ethers.deployContract("CryptoDevs", [
    wLContractAddress,
  ]);

  await nftContract.waitForDeployment();
  console.log("NFT Contract Address:", nftContract.target);

  await sleep(30 * 1000);

  // Verify the contract on etherscan
  await hre.run("verify:verify", {
    address: nftContract.target,
    constructorArguments: [wLContractAddress],
  });
}
