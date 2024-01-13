const hre = require("hardhat");

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const wLContract = await hre.ethers.deployContract("Whitelist", [10]);

  await wLContract.waitForDeployment();

  console.log("WhiteList contract address:", wLContract.target);

  // Sleep for 30 seconds while Etherscan indexes the new contract deployment
  await sleep(30 * 1000);

  await hre.run("verify:verify", {
    address: wLContract.target,
    constructorArgument: [10],
  });
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
