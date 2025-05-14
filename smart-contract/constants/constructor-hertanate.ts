import dotenv from "dotenv";

dotenv.config();

export const HertanateConfig = {
  testnet: () => {
    const initialForwarder: string = process.env
      .ADDRESS_INITIAL_FORWARDER as string;

    const _initialAllowedTokens: string[] = [
      "0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661", // IDRX
      "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT
    ];

    const _initialOwners: string[] = [
      process.env.ADDRESS_ACCOUNT_1 as string, // account 1
    ];

    // if has more owners
    const owner2 = process.env.ADDRESS_ACCOUNT_2 as string;
    const owner3 = process.env.ADDRESS_ACCOUNT_3 as string;

    // add owner 2 if exist
    if (owner2 != "") {
      _initialOwners.push(owner2);
    }

    // add owners 3 if exist
    if (owner3 != "") {
      _initialOwners.push(owner3);
    }

    return {
      initialForwarder,
      _initialAllowedTokens,
      _initialOwners,
    };
  },

  mainet: () => {
    const initialForwarder: string = process.env
      .ADDRESS_INITIAL_FORWARDER as string;

    const _initialAllowedTokens: string[] = [
      "0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661", // IDRX
      "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT
    ];

    const _initialOwners: string[] = [
      process.env.ADDRESS_ACCOUNT_1 as string, // account 1
    ];

    // if has more owners
    const owner2 = process.env.ADDRESS_ACCOUNT_2 as string;
    const owner3 = process.env.ADDRESS_ACCOUNT_3 as string;

    // add owner 2 if exist
    if (owner2 != "") {
      _initialOwners.push(owner2);
    }

    // do more owners if exist
    if (owner3 != "") {
      _initialOwners.push(owner3);
    }

    return {
      initialForwarder,
      _initialAllowedTokens,
      _initialOwners,
    };
  },
};
