/**
 * Hedera Token Service (HTS) Utilities
 *
 * This module provides utilities for creating and managing custom tokens
 * on Hedera for the marketplace. Future enhancement: marketplace token.
 */

const {
  Client,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
  PrivateKey
} = require("@hashgraph/sdk");

/**
 * Create a fungible marketplace token for trading
 * @param {Client} client - Hedera client instance
 * @param {string} operatorAccountId - Token treasury account
 * @param {PrivateKey} operatorKey - Private key for signing
 * @returns {Promise<string>} Token ID
 */
async function createMarketplaceToken(client, operatorAccountId, operatorKey) {
  try {
    const tokenCreateTx = await new TokenCreateTransaction()
      .setTokenName("Sentinel Intelligence Token")
      .setTokenSymbol("SIT")
      .setTokenType(TokenType.FungibleCommon)
      .setDecimals(2)
      .setInitialSupply(1000000) // 1 million tokens
      .setTreasuryAccountId(operatorAccountId)
      .setSupplyType(TokenSupplyType.Finite)
      .setMaxSupply(10000000) // 10 million max
      .setAdminKey(operatorKey)
      .setSupplyKey(operatorKey)
      .freezeWith(client);

    const signedTx = await tokenCreateTx.sign(operatorKey);
    const txResponse = await signedTx.execute(client);
    const receipt = await txResponse.getReceipt(client);
    const tokenId = receipt.tokenId;

    console.log(` Marketplace token created: ${tokenId.toString()}`);
    return tokenId.toString();

  } catch (error) {
    console.error("L Error creating marketplace token:", error.message);
    throw error;
  }
}

/**
 * Get token information
 * @param {Client} client - Hedera client instance
 * @param {string} tokenId - Token ID to query
 */
async function getTokenInfo(client, tokenId) {
  try {
    const query = new TokenInfoQuery()
      .setTokenId(tokenId);

    const tokenInfo = await query.execute(client);

    return {
      tokenId: tokenInfo.tokenId.toString(),
      name: tokenInfo.name,
      symbol: tokenInfo.symbol,
      decimals: tokenInfo.decimals,
      totalSupply: tokenInfo.totalSupply.toString(),
      treasury: tokenInfo.treasuryAccountId.toString()
    };

  } catch (error) {
    console.error("L Error getting token info:", error.message);
    throw error;
  }
}

/**
 * Transfer marketplace tokens between accounts
 * @param {Client} client - Hedera client instance
 * @param {string} tokenId - Token ID
 * @param {string} fromAccount - Sender account ID
 * @param {string} toAccount - Recipient account ID
 * @param {number} amount - Amount to transfer
 */
async function transferTokens(client, tokenId, fromAccount, toAccount, amount) {
  try {
    const transaction = await new TokenAssociateTransaction()
      .setAccountId(toAccount)
      .setTokenIds([tokenId])
      .execute(client);

    await transaction.getReceipt(client);

    const transferTx = await new TransferTransaction()
      .addTokenTransfer(tokenId, fromAccount, -amount)
      .addTokenTransfer(tokenId, toAccount, amount)
      .execute(client);

    const receipt = await transferTx.getReceipt(client);

    console.log(` Token transfer successful: ${amount} SIT from ${fromAccount} to ${toAccount}`);
    return receipt.status.toString();

  } catch (error) {
    console.error("L Error transferring tokens:", error.message);
    throw error;
  }
}

module.exports = {
  createMarketplaceToken,
  getTokenInfo,
  transferTokens
};
