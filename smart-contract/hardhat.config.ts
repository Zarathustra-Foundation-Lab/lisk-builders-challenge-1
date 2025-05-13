import dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";

dotenv.config();

const ACCOUNT = process.env.EOA_DEPLOYER_PRIVATE_KEY as string;

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
  etherscan: {
    apiKey: {
      lisk_sepolia_testnet: "empty",
    },
    customChains: [
      {
        network: "lisk_sepolia_testnet",
        chainId: 4202,
        urls: {
          apiURL: "https://sepolia-blockscout.lisk.com/api",
          browserURL: "https://sepolia-blockscout.lisk.com",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
};

export default config;
