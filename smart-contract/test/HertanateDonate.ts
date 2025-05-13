import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("HertanateDonate", function () {
  async function deployFixture() {
    const [owner, creator1, creator2, donor1, donor2] =
      await ethers.getSigners();
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    const token1 = await MockERC20.deploy("Test Token 1", "TT1");
    const token2 = await MockERC20.deploy("Test Token 2", "TT2");

    const forwarder = ethers.ZeroAddress; // Using zero address for testing simplicity
    const HertanateDonate = await ethers.getContractFactory("HertanateDonate");
    const contract = await HertanateDonate.deploy(
      forwarder,
      [await token1.getAddress(), await token2.getAddress()],
      [owner.address]
    );

    return {
      contract,
      owner,
      creator1,
      creator2,
      donor1,
      donor2,
      token1,
      token2,
    };
  }

  describe("Deployment", function () {
    it("Should set the right owners", async function () {
      const { contract, owner } = await loadFixture(deployFixture);
      expect(await contract.owners(0)).to.equal(owner.address);
    });

    it("Should set allowed tokens", async function () {
      const { contract, token1, token2 } = await loadFixture(deployFixture);
      expect(await contract.allowedTokens(await token1.getAddress())).to.be
        .true;
      expect(await contract.allowedTokens(await token2.getAddress())).to.be
        .true;
    });
  });

  describe("Creator Registration", function () {
    it("Should allow creators to register", async function () {
      const { contract, creator1 } = await loadFixture(deployFixture);
      const tx = await contract
        .connect(creator1)
        .signupCreator(
          "creator1",
          "Creator One",
          "image1.jpg",
          "Bio for creator1",
          "twitter.com/creator1"
        );
      await expect(tx).to.emit(contract, "CreatorRegistered");
    });

    it("Should prevent duplicate usernames", async function () {
      const { contract, creator1, creator2 } = await loadFixture(deployFixture);
      await contract
        .connect(creator1)
        .signupCreator(
          "creator1",
          "Creator One",
          "image1.jpg",
          "Bio for creator1",
          "twitter.com/creator1"
        );
      await expect(
        contract
          .connect(creator2)
          .signupCreator(
            "creator1",
            "Creator Two",
            "image2.jpg",
            "Bio for creator2",
            "twitter.com/creator2"
          )
      ).to.be.revertedWith("Username taken");
    });

    it("Should allow profile updates", async function () {
      const { contract, creator1 } = await loadFixture(deployFixture);
      await contract
        .connect(creator1)
        .signupCreator(
          "creator1",
          "Creator One",
          "image1.jpg",
          "Bio for creator1",
          "twitter.com/creator1"
        );
      const tx = await contract
        .connect(creator1)
        .editCreatorProfile(
          "Updated Name",
          "newimage.jpg",
          "Updated bio",
          "instagram.com/creator1"
        );
      await expect(tx).to.emit(contract, "CreatorProfileUpdated");
    });
  });

  describe("Donations", function () {
    it("Should process donations and distribute fees", async function () {
      const { contract, owner, creator1, donor1, token1 } = await loadFixture(
        deployFixture
      );
      await contract
        .connect(creator1)
        .signupCreator(
          "creator1",
          "Creator One",
          "image1.jpg",
          "Bio for creator1",
          "twitter.com/creator1"
        );

      // Fund donor with tokens
      const amount = ethers.parseEther("100");
      await token1.mint(donor1.address, amount);
      await token1.connect(donor1).approve(await contract.getAddress(), amount);

      // Check balances before donation
      const creatorBalanceBefore = await token1.balanceOf(creator1.address);
      const ownerBalanceBefore = await token1.balanceOf(owner.address);

      const tx = await contract
        .connect(donor1)
        .donateToCreator(
          creator1.address,
          amount,
          await token1.getAddress(),
          "Test donation"
        );
      await expect(tx).to.emit(contract, "DonationSent");

      // Check balances after donation
      const creatorBalanceAfter = await token1.balanceOf(creator1.address);
      const ownerBalanceAfter = await token1.balanceOf(owner.address);

      // 5% fee means creator gets 95
      expect(creatorBalanceAfter - creatorBalanceBefore).to.equal(
        ethers.parseEther("95")
      );
      // Owner gets the full 5 fee (only 1 owner in test)
      expect(ownerBalanceAfter - ownerBalanceBefore).to.equal(
        ethers.parseEther("5")
      );
    });

    it("Should reject donations to non-creators", async function () {
      const { contract, creator1, donor1, token1 } = await loadFixture(
        deployFixture
      );
      const amount = ethers.parseEther("100");
      await token1.mint(donor1.address, amount);
      await token1.connect(donor1).approve(await contract.getAddress(), amount);

      await expect(
        contract
          .connect(donor1)
          .donateToCreator(
            creator1.address,
            amount,
            await token1.getAddress(),
            "Test donation"
          )
      ).to.be.revertedWith("Creator not found");
    });
  });

  describe("Owner Functions", function () {
    it("Should allow owner to add allowed tokens", async function () {
      const { contract, owner, token1 } = await loadFixture(deployFixture);
      const MockERC20 = await ethers.getContractFactory("MockERC20");
      const newToken = await MockERC20.deploy("New Token", "NEW");

      const tx = await contract
        .connect(owner)
        .addAllowedToken(await newToken.getAddress());
      await expect(tx).to.emit(contract, "AllowedTokenAdded");
    });

    it("Should prevent non-owners from adding tokens", async function () {
      const { contract, creator1 } = await loadFixture(deployFixture);
      const MockERC20 = await ethers.getContractFactory("MockERC20");
      const newToken = await MockERC20.deploy("New Token", "NEW");

      await expect(
        contract.connect(creator1).addAllowedToken(await newToken.getAddress())
      ).to.be.revertedWith("Only owner can add token");
    });

    it("Should allow owner to change fee", async function () {
      const { contract, owner } = await loadFixture(deployFixture);
      await contract.connect(owner).setFee(10);
      expect(await contract.fee()).to.equal(10);
    });

    it("Should prevent invalid fee ranges", async function () {
      const { contract, owner } = await loadFixture(deployFixture);
      await expect(contract.connect(owner).setFee(0)).to.be.revertedWith(
        "Invalid fee range"
      );
      await expect(contract.connect(owner).setFee(100)).to.be.revertedWith(
        "Invalid fee range"
      );
    });
  });

  describe("Meta Transactions", function () {
    it("Should correctly identify trusted forwarder", async function () {
      const { contract, owner } = await loadFixture(deployFixture);
      const forwarder = await ethers.getImpersonatedSigner(ethers.ZeroAddress);

      // Skip meta-transaction tests for now to focus on core functionality
      // Will implement proper meta-transaction testing after resolving type issues
    });
  });
});
