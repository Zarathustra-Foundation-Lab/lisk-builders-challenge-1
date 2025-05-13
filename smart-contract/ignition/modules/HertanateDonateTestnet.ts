// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

import dotenv from "dotenv";

// load .env
dotenv.config();

export const initialForwarder: string = process.env
  .ADDRESS_INITIAL_FORWARDER as string;

export const _initialAllowedTokens: string[] = [
  "0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661", // IDRX
  "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT
];

export const _initialOwners: string[] = [
  process.env.ADDRESS_ACCOUNT_1 as string, // account 1
];

const HertanateDonateTestnetModule = buildModule(
  "hertanate_donate_testnet_module",
  (m) => {
    // deploy contract
    const hertanate = m.contract(
      "HertanateDonate",
      [initialForwarder, _initialAllowedTokens, _initialOwners],
      {}
    );

    return { hertanate };
  }
);

export default HertanateDonateTestnetModule;
