require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { Client, TopicCreateTransaction, TopicMessageSubmitTransaction, PrivateKey } = require("@hashgraph/sdk");
const { StateGraph, END } = require("@langchain/langgraph");
const { runHunter } = require("../agents/hunter");
const { runGuardian } = require("../agents/guardian");
const { AgentState } = require("./state");

class ThreatMarketplace {
  constructor() {
    this.listings = [];
    this.transactions = [];
    this.topicId = null;
    this.client = null;
  }

  async initialize() {
    // Initialize Hedera client
    this.client = Client.forTestnet().setOperator(
      process.env.HEDERA_ACCOUNT_ID,
      PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY)
    );

    // Create HCS topic for marketplace
    const topicTx = await new TopicCreateTransaction()
      .setSubmitKey(PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY))
      .setTopicMemo("Hedera Sentinel Threat Intelligence Marketplace")
      .execute(this.client);

    const receipt = await topicTx.getReceipt(this.client);
    this.topicId = receipt.topicId;
    console.log(`✅ Marketplace HCS Topic created: ${this.topicId.toString()}`);

    return this.topicId;
  }

  async publishThreat(threat) {
    const listing = {
      id: `threat-${Date.now()}`,
      ...threat,
      timestamp: new Date().toISOString(),
      status: 'available'
    };

    this.listings.push(listing);

    // Publish to HCS topic
    if (this.topicId) {
      try {
        const message = JSON.stringify({
          type: 'NEW_LISTING',
          data: listing
        });

        await new TopicMessageSubmitTransaction()
          .setTopicId(this.topicId)
          .setMessage(message)
          .execute(this.client);

        console.log(`📢 Published threat to HCS: ${listing.id}`);
      } catch (error) {
        console.error('Error publishing to HCS:', error.message);
      }
    }

    return listing;
  }

  async purchaseThreat(listingId, buyerAccountId) {
    const listing = this.listings.find(l => l.id === listingId && l.status === 'available');

    if (!listing) {
      throw new Error('Listing not found or already sold');
    }

    const transaction = {
      id: `tx-${Date.now()}`,
      listingId,
      buyer: buyerAccountId,
      seller: listing.seller,
      amount: listing.price,
      timestamp: new Date().toISOString()
    };

    listing.status = 'sold';
    this.transactions.push(transaction);

    // Publish purchase to HCS
    if (this.topicId) {
      try {
        const message = JSON.stringify({
          type: 'PURCHASE',
          data: transaction
        });

        await new TopicMessageSubmitTransaction()
          .setTopicId(this.topicId)
          .setMessage(message)
          .execute(this.client);

        console.log(`💰 Purchase recorded on HCS: ${transaction.id}`);
      } catch (error) {
        console.error('Error publishing purchase to HCS:', error.message);
      }
    }

    return transaction;
  }

  getAvailableThreats() {
    return this.listings.filter(l => l.status === 'available');
  }

  getTransactionHistory() {
    return this.transactions;
  }

  getStats() {
    return {
      totalListings: this.listings.length,
      availableListings: this.listings.filter(l => l.status === 'available').length,
      soldListings: this.listings.filter(l => l.status === 'sold').length,
      totalTransactions: this.transactions.length,
      totalVolume: this.transactions.reduce((sum, tx) => sum + tx.amount, 0),
      topicId: this.topicId?.toString()
    };
  }
}

// Multi-agent workflow
const workflow = new StateGraph({
  channels: AgentState,
});

workflow.addNode("hunter", runHunter);
workflow.addNode("guardian", runGuardian);

workflow.setEntryPoint("hunter");

workflow.addConditionalEdges(
  "hunter",
  (state) => {
    const lastMessage = state.messages.slice(-1)[0];
    if (lastMessage?.content?.includes("New threat data available")) {
      return "guardian";
    }
    return END;
  },
  {
    guardian: "guardian",
    [END]: END,
  }
);
workflow.addEdge("guardian", END);

const app = workflow.compile();

module.exports = { ThreatMarketplace, app };
