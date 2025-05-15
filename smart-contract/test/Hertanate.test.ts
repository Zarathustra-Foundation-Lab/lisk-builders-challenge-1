import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import type { HertanateContract, MockERC20 } from "../typechain-types";

describe("HertanateContract", function () {
  async function deployHertanateFixture() {
    const [owner, creator1, donor1, donor2] = await ethers.getSigners();

    // Deploy mock ERC20 token
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    const token = (await MockERC20.deploy(
      "Test Token",
      "TST",
      ethers.parseEther("1000")
    )) as MockERC20;

    // Deploy Hertanate contract
    const Hertanate = await ethers.getContractFactory("HertanateContract");
    const hertanate = (await Hertanate.deploy(
      ethers.ZeroAddress, // trusted forwarder
      [await token.getAddress()], // allowed tokens
      [owner.address] // owners
    )) as HertanateContract;

    return { hertanate, token, owner, creator1, donor1, donor2 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { hertanate, owner } = await loadFixture(deployHertanateFixture);
      expect(await hertanate.owners(0)).to.equal(owner.address);
    });

    it("Should have initial allowed token", async function () {
      const { hertanate, token } = await loadFixture(deployHertanateFixture);
      expect(await hertanate.allowedTokens(await token.getAddress())).to.be
        .true;
    });
  });

  describe("Creator Registration", function () {
    it("Should allow creator signup", async function () {
      const { hertanate, creator1 } = await loadFixture(deployHertanateFixture);

      await expect(
        hertanate
          .connect(creator1)
          .signupCreator(
            "creator1",
            "Creator One",
            "image1.jpg",
            "Bio for creator",
            "twitter.com/creator1"
          )
      ).to.emit(hertanate, "CreatorRegistered");
    });

    it("Should prevent duplicate usernames", async function () {
      const { hertanate, creator1, donor1 } = await loadFixture(
        deployHertanateFixture
      );

      await hertanate
        .connect(creator1)
        .signupCreator(
          "creator1",
          "Creator One",
          "image1.jpg",
          "Bio for creator",
          "twitter.com/creator1"
        );

      await expect(
        hertanate
          .connect(donor1)
          .signupCreator(
            "creator1",
            "Creator Two",
            "image2.jpg",
            "Another bio",
            "twitter.com/creator2"
          )
      ).to.be.revertedWith("Username taken");
    });
  });

  describe("Donations", function () {
    it("Should process donations correctly", async function () {
      const { hertanate, token, creator1, donor1 } = await loadFixture(
        deployHertanateFixture
      );

      // Setup
      await hertanate
        .connect(creator1)
        .signupCreator(
          "creator1",
          "Creator One",
          "image1.jpg",
          "Bio for creator",
          "twitter.com/creator1"
        );

      // Transfer tokens to donor first
      const amount = ethers.parseEther("1");
      await token.transfer(donor1.address, amount);

      // Approve token transfer
      await token.connect(donor1).approve(await hertanate.getAddress(), amount);

      // Test donation
      await expect(
        hertanate
          .connect(donor1)
          .donateToCreator(
            creator1.address,
            amount,
            await token.getAddress(),
            "Test donation"
          )
      ).to.emit(hertanate, "DonationSent");
    });

    it("Should distribute fees correctly", async function () {
      const { hertanate, token, creator1, donor1, owner } = await loadFixture(
        deployHertanateFixture
      );

      // Setup
      await hertanate
        .connect(creator1)
        .signupCreator(
          "creator1",
          "Creator One",
          "image1.jpg",
          "Bio for creator",
          "twitter.com/creator1"
        );

      // Transfer tokens to donor first
      const amount = ethers.parseEther("1");
      await token.transfer(donor1.address, amount);

      // Approve token transfer
      await token.connect(donor1).approve(await hertanate.getAddress(), amount);

      // Get initial balances
      const creatorInitialBalance = await token.balanceOf(creator1.address);
      const ownerInitialBalance = await token.balanceOf(owner.address);

      // Make donation
      await hertanate
        .connect(donor1)
        .donateToCreator(
          creator1.address,
          amount,
          await token.getAddress(),
          "Test donation"
        );

      // Check balances after donation
      const creatorFinalBalance = await token.balanceOf(creator1.address);
      const ownerFinalBalance = await token.balanceOf(owner.address);

      // 5% fee (default)
      const expectedFee = (amount * 5n) / 100n;
      const expectedCreatorAmount = amount - expectedFee;

      expect(creatorFinalBalance - creatorInitialBalance).to.equal(
        expectedCreatorAmount
      );
      expect(ownerFinalBalance - ownerInitialBalance).to.equal(expectedFee);
    });
  });

  describe("Profile Management", function () {
    it("Should allow profile updates", async function () {
      const { hertanate, creator1 } = await loadFixture(deployHertanateFixture);

      await hertanate
        .connect(creator1)
        .signupCreator(
          "creator1",
          "Creator One",
          "image1.jpg",
          "Bio for creator",
          "twitter.com/creator1"
        );

      const newName = "Updated Name";
      const newBio = "Updated bio";

      await expect(
        hertanate
          .connect(creator1)
          .editCreatorProfile(
            newName,
            "newimage.jpg",
            newBio,
            "instagram.com/creator1"
          )
      ).to.emit(hertanate, "CreatorProfileUpdated");

      const creator = await hertanate.getCreatorByAddress(creator1.address);
      expect(creator.detail.name).to.equal(newName);
      expect(creator.detail.bio).to.equal(newBio);
    });

    it("Should allow username changes", async function () {
      const { hertanate, creator1 } = await loadFixture(deployHertanateFixture);

      await hertanate
        .connect(creator1)
        .signupCreator(
          "creator1",
          "Creator One",
          "image1.jpg",
          "Bio for creator",
          "twitter.com/creator1"
        );

      const newUsername = "newusername";
      await expect(
        hertanate.connect(creator1).changeUsername(newUsername)
      ).to.emit(hertanate, "UsernameChanged");

      const creator = await hertanate.getCreatorByAddress(creator1.address);
      expect(creator.username).to.equal(newUsername);
    });
  });

  describe("Admin Functions", function () {
    it("Should allow fee changes by owner", async function () {
      const { hertanate, owner } = await loadFixture(deployHertanateFixture);

      const newFee = 10;
      await expect(hertanate.connect(owner).setFee(newFee))
        .to.emit(hertanate, "FeeChanged")
        .withArgs(5, newFee);

      expect(await hertanate.fee()).to.equal(newFee);
    });

    it("Should prevent fee changes by non-owner", async function () {
      const { hertanate, donor1 } = await loadFixture(deployHertanateFixture);

      await expect(hertanate.connect(donor1).setFee(10)).to.be.revertedWith(
        "Only Initial owner"
      );
    });

    it("Should allow adding new tokens by owner", async function () {
      const { hertanate, owner } = await loadFixture(deployHertanateFixture);

      const newToken = ethers.Wallet.createRandom().address;
      await expect(hertanate.connect(owner).addAllowedToken(newToken)).to.emit(
        hertanate,
        "AllowedTokenAdded"
      );

      expect(await hertanate.allowedTokens(newToken)).to.be.true;
    });
  });
});
