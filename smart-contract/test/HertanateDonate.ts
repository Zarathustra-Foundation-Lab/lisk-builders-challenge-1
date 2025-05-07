import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import type { MockERC20 } from "../typechain-types";

const ADDITIONAL_OWNERS: string[] = [
  "0xdE6c731777BB5554903438e8964042057621DbFA",
]; // Replace with actual additional owner addresses

describe("HertanateDonate", function () {
  async function deployContract() {
    const [owner, creator1, donor1, owner2] = await ethers.getSigners();

    // Deploy mock token
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    const token = (await MockERC20.deploy("Test Token", "TTK")) as MockERC20;
    await token.waitForDeployment();

    const contract = await ethers.deployContract("HertanateDonate", [
      await token.getAddress(),
      ADDITIONAL_OWNERS,
    ]);
    await contract.waitForDeployment();

    return { contract, owner, creator1, donor1, token };
  }

  describe("Deployment", function () {
    it("Should set a valid token address", async function () {
      const { contract } = await loadFixture(deployContract);
      const tokenAddress = await contract.token();
      expect(tokenAddress).to.be.properAddress;
      expect(tokenAddress).to.not.equal(ethers.ZeroAddress);
    });

    it("Should set initial owners", async function () {
      const { contract, owner } = await loadFixture(deployContract);
      expect(await contract.owners(0)).to.equal(owner.address);
      expect(await contract.owners(1)).to.equal(ADDITIONAL_OWNERS[0]);
    });

    it("Should set initial fee to 5%", async function () {
      const { contract } = await loadFixture(deployContract);
      expect(await contract.fee()).to.equal(5);
    });
  });

  describe("Creator Registration", function () {
    it("Should allow signup with unique username", async function () {
      const { contract, creator1 } = await loadFixture(deployContract);

      await expect(
        contract
          .connect(creator1)
          .signupCreator(
            "creator1",
            "John Doe",
            "Artist",
            "twitter.com/creator1"
          )
      )
        .to.emit(contract, "CreatorRegistered")
        .withArgs(creator1.address, "creator1");

      const creator = await contract.creators(creator1.address);
      expect(creator.username).to.equal("creator1");
      expect(creator.detail.name).to.equal("John Doe");
      expect(creator.isActive).to.be.true;
    });

    it("Should reject duplicate username", async function () {
      const { contract, creator1, donor1 } = await loadFixture(deployContract);

      await contract
        .connect(creator1)
        .signupCreator(
          "creator1",
          "John Doe",
          "Artist",
          "twitter.com/creator1"
        );

      await expect(
        contract
          .connect(donor1)
          .signupCreator(
            "creator1",
            "Jane Doe",
            "Musician",
            "twitter.com/creator2"
          )
      ).to.be.revertedWith("Username taken");
    });

    it("Should reject already registered address", async function () {
      const { contract, creator1 } = await loadFixture(deployContract);

      await contract
        .connect(creator1)
        .signupCreator(
          "creator1",
          "John Doe",
          "Artist",
          "twitter.com/creator1"
        );

      await expect(
        contract
          .connect(creator1)
          .signupCreator(
            "creator2",
            "John Doe",
            "Artist",
            "twitter.com/creator1"
          )
      ).to.be.revertedWith("Already registered");
    });
  });

  describe("Donations", function () {
    it("Should process donation and distribute fee", async function () {
      const { contract, creator1, donor1, token } = await loadFixture(
        deployContract
      );

      // Mint tokens to donor first
      await token.mint(donor1.address, ethers.parseEther("1000"));
      // Approve contract to spend donor's tokens
      await token
        .connect(donor1)
        .approve(contract.getAddress(), ethers.parseEther("1000"));

      // Register creator
      await contract
        .connect(creator1)
        .signupCreator(
          "creator1",
          "John Doe",
          "Artist",
          "twitter.com/creator1"
        );

      // Donate and verify event emitted with correct parameters
      const tx = contract
        .connect(donor1)
        .donateToCreator(
          creator1.address,
          ethers.parseEther("100"),
          "Great work!"
        );

      await expect(tx).to.emit(contract, "DonationSent").withArgs(
        donor1.address,
        creator1.address,
        ethers.parseEther("95"), // amount after 5% fee
        ethers.parseEther("5"), // fee amount
        "Great work!",
        anyValue // timestamp
      );
    });

    it("Should fail when token transfer fails", async function () {
      const { contract, creator1, donor1, token } = await loadFixture(
        deployContract
      );

      // Register creator but don't give donor any tokens
      await contract
        .connect(creator1)
        .signupCreator(
          "creator1",
          "John Doe",
          "Artist",
          "twitter.com/creator1"
        );

      await expect(
        contract
          .connect(donor1)
          .donateToCreator(
            creator1.address,
            ethers.parseEther("100"),
            "Great work!"
          )
      ).to.be.reverted; // Should fail due to insufficient balance

      // Verify balances unchanged
      expect(await token.balanceOf(donor1.address)).to.equal(0);
      expect(await token.balanceOf(contract.getAddress())).to.equal(0);
    });

    it("Should reject donation to unregistered creator", async function () {
      const { contract, creator1, donor1 } = await loadFixture(deployContract);

      await expect(
        contract
          .connect(donor1)
          .donateToCreator(
            creator1.address,
            ethers.parseEther("100"),
            "Great work!"
          )
      ).to.be.revertedWith("Creator not found");
    });

    it("Should reject zero amount donation", async function () {
      const { contract, creator1, donor1 } = await loadFixture(deployContract);

      await contract
        .connect(creator1)
        .signupCreator(
          "creator1",
          "John Doe",
          "Artist",
          "twitter.com/creator1"
        );

      await expect(
        contract
          .connect(donor1)
          .donateToCreator(creator1.address, 0, "Great work!")
      ).to.be.revertedWith("Amount must be positive");
    });
  });

  describe("Fee Management", function () {
    it("Should allow owner to update fee", async function () {
      const { contract, owner } = await loadFixture(deployContract);

      await contract.connect(owner).setFee(10);
      expect(await contract.fee()).to.equal(10);
    });

    it("Should reject fee update from non-owner", async function () {
      const { contract, creator1 } = await loadFixture(deployContract);

      await expect(contract.connect(creator1).setFee(10)).to.be.revertedWith(
        "Only owner"
      );
    });

    it("Should reject fee >= 100", async function () {
      const { contract, owner } = await loadFixture(deployContract);

      await expect(contract.connect(owner).setFee(100)).to.be.revertedWith(
        "Fee too high"
      );
    });

    it("Should reject zero fee", async function () {
      const { contract, owner } = await loadFixture(deployContract);

      await expect(contract.connect(owner).setFee(0)).to.be.revertedWith(
        "Fee too high"
      );
    });
  });

  describe("Creator Info", function () {
    it("Should return correct creator info", async function () {
      const { contract, creator1 } = await loadFixture(deployContract);

      await contract
        .connect(creator1)
        .signupCreator(
          "creator1",
          "John Doe",
          "Artist",
          "twitter.com/creator1"
        );

      const [username, name, bio, socials, totalReceived] =
        await contract.getCreator(creator1.address);
      expect(username).to.equal("creator1");
      expect(name).to.equal("John Doe");
      expect(bio).to.equal("Artist");
      expect(socials).to.equal("twitter.com/creator1");
      expect(totalReceived).to.equal(0);
    });

    it("Should reject info request for unregistered creator", async function () {
      const { contract, creator1 } = await loadFixture(deployContract);

      await expect(contract.getCreator(creator1.address)).to.be.revertedWith(
        "Creator not found"
      );
    });
  });
});
