const hre = require("hardhat");

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const wLContract = await hre.ethers.deployContract("WhiteList", [10]);

  await wLContract.waitForDeployment();

  console.log("WhiteList contract address:", wLContract.target);

  // Sleep for 30 seconds while Etherscan indexes the new contract deployment
  await sleep(30 * 1000);

  await hre.run("verify:verify", {
    address: wLContract.target,
    constructorArguments: [10],
  });
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// WhiteList contract address: 0x93D2AD9b8B900755F5737522D9E11A96761510cD
