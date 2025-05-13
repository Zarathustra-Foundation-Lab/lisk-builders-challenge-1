import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import dotenv from "dotenv";

dotenv.config();

const ACCOUNT = process.env.EOA_PRIVATE_KEY as string;

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    lisk_sepolia_testnet: {
      url: "https://rpc.sepolia-api.lisk.com",
      accounts: [ACCOUNT],
      chainId: 4202,
    },

    lisk_mainnet: {
      url: "https://rpc.api.lisk.com",
      accounts: [ACCOUNT],
      chainId: 1135,
    },
  },
};

export default config;
