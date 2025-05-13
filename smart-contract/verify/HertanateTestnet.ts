import { run } from "hardhat";

import {
  _initialAllowedTokens,
  _initialOwners,
  initialForwarder,
} from "../ignition/modules/HertanateDonateTestnet";

async function main() {
  await run("verify:verify", {
    address: "0x180C2174E2f01CeF4E4b5A88B85dB442E3095A2c",
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
