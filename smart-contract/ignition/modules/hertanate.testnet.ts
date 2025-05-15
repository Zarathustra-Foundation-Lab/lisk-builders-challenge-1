// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

import { HertanateConfig } from "../../constants/constructor-hertanate";

const HertanateDonateTestnetModule = buildModule("Hertanate", (m) => {
  // load config
  const { _initialAllowedTokens, _initialOwners, initialForwarder } =
    HertanateConfig.testnet();

  // deploy contract
  const hertanate = m.contract(
    "HertanateContract",
    [initialForwarder, _initialAllowedTokens, _initialOwners],
    {}
  );

  console.info(`Hertanate Deployment Result : \n\n`);
  console.log(hertanate);

  return { hertanate };
});

export default HertanateDonateTestnetModule;
