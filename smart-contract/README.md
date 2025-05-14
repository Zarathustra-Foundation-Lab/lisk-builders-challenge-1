# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

---

# How to Deploy and Verifying

## **prerequisite:**

Change filename **example.env** to **.env** and fill the configration:

- **ADDRESS_ACCOUNT_1**
- **EOA_DEPLOYER_PRIVATE_KEY**
- **ADDRESS_INITIAL_FORWARDER**

**With your own configration.**

## 1. deploy on Lisk Sepolia Testnet

**Deploy contracts HertanateDonate**

```console
npx hardhat ignition deploy ./ignition/modules/hertanate.testnet.ts --network lisk_sepolia_testnet
```

after successfully deployed, it will show the address of contract, take that and fill **.env** in **DEPLOY_CONTRACT_ADDRESS** with that address.

**Verifying the contract**

```console
   npx hardhat run ./ignition/verify/hertanate.testnet.ts --network lisk_sepolia_testnet
```

after successfully verify it will give you the link to contract deployed, copy that and open the browser with that link, so you can know the contract information.
