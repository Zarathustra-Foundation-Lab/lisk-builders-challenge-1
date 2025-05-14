import { run } from "hardhat";

import { HertanateConfig } from "../../constants/constructor-hertanate";

async function main() {
  const { initialForwarder, _initialAllowedTokens, _initialOwners } =
    HertanateConfig.testnet();

  await run("verify:verify", {
    address: process.env.DEPLOY_CONTRACT_ADDRESS as string,
    constructorArguments: [
      initialForwarder, // initialForwarder
      _initialAllowedTokens, // alowance initial token
      _initialOwners, // account 1
    ],
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
