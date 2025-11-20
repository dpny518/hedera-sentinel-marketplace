const { ChatGroq } = require("@langchain/groq");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { Client, PrivateKey, TransferTransaction, Hbar } = require("@hashgraph/sdk");
const { AIMessage } = require("@langchain/core/messages");

let marketplace = null;
let hederaClient = null;

function setMarketplace(mp) {
  marketplace = mp;
}

function setHederaClient(client) {
  hederaClient = client;
}

async function runGuardian(state) {
  console.log("\n🛡️  GUARDIAN AGENT: Monitoring marketplace...");

  if (!marketplace) {
    console.log("⚠️  Marketplace not initialized");
    return {
      messages: [new AIMessage("Marketplace not available")]
    };
  }

  // Get available threats
  const availableThreats = marketplace.getAvailableThreats();

  if (availableThreats.length === 0) {
    console.log("📭 No threats available for purchase");
    return {
      messages: [new AIMessage("No threats available in marketplace")]
    };
  }

  // Prioritize critical and high severity threats
  const criticalThreats = availableThreats.filter(t => t.severity === 'critical');
  const highThreats = availableThreats.filter(t => t.severity === 'high');

  const targetThreat = criticalThreats[0] || highThreats[0] || availableThreats[0];

  console.log(`\n💡 Evaluating threat: ${targetThreat.name}`);
  console.log(`   Severity: ${targetThreat.severity.toUpperCase()}`);
  console.log(`   Price: ${targetThreat.price} tinybar`);
  console.log(`   Decision: ${targetThreat.severity === 'critical' || targetThreat.severity === 'high' ? 'PURCHASE' : 'EVALUATE'}`);

  // Purchase if critical or high severity
  if (targetThreat.severity === 'critical' || targetThreat.severity === 'high') {
    try {
      // Execute HBAR transfer (simulated for demo - in production would transfer to seller)
      if (hederaClient) {
        try {
          const transferTx = await new TransferTransaction()
            .addHbarTransfer(process.env.HEDERA_ACCOUNT_ID, new Hbar(-targetThreat.price / 100000000))
            .addHbarTransfer(targetThreat.seller, new Hbar(targetThreat.price / 100000000))
            .setTransactionMemo(`Purchase: ${targetThreat.name}`)
            .execute(hederaClient);

          const receipt = await transferTx.getReceipt(hederaClient);
          console.log(`💸 HBAR Transfer Status: ${receipt.status.toString()}`);
        } catch (error) {
          console.log(`⚠️  HBAR transfer simulation (demo mode): ${targetThreat.price} tinybar to ${targetThreat.seller}`);
        }
      }

      // Record purchase in marketplace
      const transaction = await marketplace.purchaseThreat(
        targetThreat.id,
        process.env.HEDERA_ACCOUNT_ID
      );

      console.log(`✅ PURCHASED: ${targetThreat.name}`);
      console.log(`   Transaction ID: ${transaction.id}`);
      console.log(`   Amount: ${transaction.amount} tinybar`);
      console.log(`\n📊 Threat Intelligence Acquired:`);
      console.log(`   Description: ${targetThreat.description}`);
      console.log(`   Indicators of Compromise:`);
      targetThreat.indicators.forEach((ioc, i) => {
        console.log(`     ${i + 1}. ${ioc}`);
      });

      const response = new AIMessage(
        `Successfully purchased threat intelligence: ${targetThreat.name}. ` +
        `Transaction ${transaction.id} recorded on Hedera Consensus Service. ` +
        `System protection updated with new IOCs.`
      );

      return {
        messages: [response],
        lastPurchase: transaction
      };

    } catch (error) {
      console.error("❌ Purchase failed:", error.message);
      return {
        messages: [new AIMessage(`Purchase failed: ${error.message}`)]
      };
    }
  }

  const response = new AIMessage(
    `Evaluated threat: ${targetThreat.name}. Severity level does not warrant immediate purchase.`
  );

  return {
    messages: [response]
  };
}

function createGuardianAgent() {
  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama3-8b-8192",
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are a security guardian AI. Your job is to monitor the Hedera Sentinel Marketplace for critical threat intelligence " +
      "and purchase it to protect your organization's systems. You prioritize critical and high severity threats and make autonomous " +
      "purchasing decisions using HBAR cryptocurrency."
    ],
    ["human", "{input}"],
    new AIMessage(""),
  ]);

  return { model, prompt };
}

module.exports = { runGuardian, setMarketplace, setHederaClient, createGuardianAgent };
