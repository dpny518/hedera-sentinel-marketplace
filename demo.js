/**
 * DEMO MODE - Hedera Sentinel Marketplace
 *
 * This version simulates all Hedera interactions for demo purposes.
 * No real Hedera credentials required!
 */

const { AIMessage } = require("@langchain/core/messages");

console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║        🔒 HEDERA SENTINEL MARKETPLACE 🔒                      ║
║                                                               ║
║     AI-Powered Threat Intelligence Marketplace                ║
║     Built on Hedera Hashgraph                                 ║
║                     [DEMO MODE]                               ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`);

// Simulated threat database
const THREAT_DATABASE = [
  {
    name: "Ransomware Variant XZ-47",
    severity: "critical",
    description: "New ransomware strain targeting healthcare systems. Uses advanced encryption and double extortion tactics.",
    indicators: ["Hash: 8f7d9e2a1c4b5d6e...", "C2 Server: 185.220.101.42", "Port: 8443"],
    price: 50
  },
  {
    name: "Zero-Day Exploit CVE-2024-XXXX",
    severity: "critical",
    description: "Remote code execution vulnerability in widely-used web framework. Active exploitation detected.",
    indicators: ["Affected versions: 3.x - 4.2", "Exploit signature: %7B%7B...", "CVSS Score: 9.8"],
    price: 100
  },
  {
    name: "Botnet Command Server BS-901",
    severity: "high",
    description: "Command and control server for IoT botnet. Controls over 50,000 compromised devices.",
    indicators: ["IP: 203.0.113.15", "Port: 6667", "Protocol: IRC-based"],
    price: 60
  },
  {
    name: "Phishing Campaign PH-2024",
    severity: "high",
    description: "Large-scale phishing operation impersonating major cloud providers. Targets corporate credentials.",
    indicators: ["Domain: cloudsecurity-verify.com", "Email pattern: noreply@*", "Domains: 47 active"],
    price: 30
  },
  {
    name: "Malware Loader ML-883",
    severity: "medium",
    description: "Polymorphic malware loader detected in supply chain attacks. Capable of deploying multiple payloads.",
    indicators: ["Hash: 3a9f8c1b2d7e4f5a...", "Registry key: HKLM\\Software\\SysUpdate"],
    price: 40
  }
];

// Simulated marketplace
class DemoMarketplace {
  constructor() {
    this.listings = [];
    this.transactions = [];
    this.topicId = "0.0.4858602"; // Demo topic ID
  }

  async initialize() {
    console.log("🚀 Initializing Hedera Sentinel Marketplace...\n");

    // Simulate HCS topic creation
    await this.sleep(1000);
    console.log(`✅ Marketplace HCS Topic created: ${this.topicId}`);
    console.log("✅ Marketplace initialized successfully!");
    console.log(`📍 HCS Topic ID: ${this.topicId}\n`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    return this.topicId;
  }

  async publishThreat(threat) {
    const listing = {
      id: `threat-${Date.now()}`,
      ...threat,
      timestamp: new Date().toISOString(),
      status: 'available',
      seller: '0.0.1234567' // Demo seller account
    };

    this.listings.push(listing);

    // Simulate HCS publishing
    await this.sleep(500);
    console.log(`📢 Published threat to HCS: ${listing.id}`);

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

    // Simulate HBAR transfer
    await this.sleep(500);
    console.log(`💸 HBAR Transfer Status: SUCCESS`);

    // Simulate HCS recording
    await this.sleep(300);
    console.log(`💰 Purchase recorded on HCS: ${transaction.id}`);

    return transaction;
  }

  getAvailableThreats() {
    return this.listings.filter(l => l.status === 'available');
  }

  getStats() {
    return {
      totalListings: this.listings.length,
      availableListings: this.listings.filter(l => l.status === 'available').length,
      soldListings: this.listings.filter(l => l.status === 'sold').length,
      totalTransactions: this.transactions.length,
      totalVolume: this.transactions.reduce((sum, tx) => sum + tx.amount, 0),
      topicId: this.topicId
    };
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Demo agents
let threatIndex = 0;
const marketplace = new DemoMarketplace();

async function runHunterDemo() {
  console.log("\n🔍 HUNTER AGENT: Scanning for threats...");

  await marketplace.sleep(500);

  const threat = THREAT_DATABASE[threatIndex % THREAT_DATABASE.length];
  threatIndex++;

  const threatData = {
    ...threat,
    seller: '0.0.1234567', // Demo account
    discoveredAt: new Date().toISOString()
  };

  console.log(`\n🎯 Discovered: ${threat.name}`);
  console.log(`   Severity: ${threat.severity.toUpperCase()}`);
  console.log(`   Price: ${threat.price} tinybar`);
  console.log(`   Description: ${threat.description}`);

  const listing = await marketplace.publishThreat(threatData);
  console.log(`✅ Published to marketplace: ${listing.id}`);

  return listing;
}

async function runGuardianDemo() {
  console.log("\n🛡️  GUARDIAN AGENT: Monitoring marketplace...");

  await marketplace.sleep(500);

  const availableThreats = marketplace.getAvailableThreats();

  if (availableThreats.length === 0) {
    console.log("📭 No threats available for purchase");
    return null;
  }

  const criticalThreats = availableThreats.filter(t => t.severity === 'critical');
  const highThreats = availableThreats.filter(t => t.severity === 'high');
  const targetThreat = criticalThreats[0] || highThreats[0] || availableThreats[0];

  console.log(`\n💡 Evaluating threat: ${targetThreat.name}`);
  console.log(`   Severity: ${targetThreat.severity.toUpperCase()}`);
  console.log(`   Price: ${targetThreat.price} tinybar`);
  console.log(`   Decision: ${targetThreat.severity === 'critical' || targetThreat.severity === 'high' ? 'PURCHASE' : 'EVALUATE'}`);

  if (targetThreat.severity === 'critical' || targetThreat.severity === 'high') {
    const transaction = await marketplace.purchaseThreat(
      targetThreat.id,
      '0.0.7654321' // Demo buyer account
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

    return transaction;
  }

  return null;
}

async function main() {
  await marketplace.initialize();

  console.log(`🎬 Starting marketplace simulation (5 cycles)...\n`);
  console.log("   Hunter Agent: Discovers and publishes threat intelligence");
  console.log("   Guardian Agent: Monitors and purchases critical threats\n");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  for (let cycle = 1; cycle <= 5; cycle++) {
    console.log(`\n┌─────────────────────────────────────────────────────────────┐`);
    console.log(`│ CYCLE ${cycle}/5                                                    │`);
    console.log(`└─────────────────────────────────────────────────────────────┘`);

    // Run Hunter
    await runHunterDemo();

    // Wait before Guardian runs
    await marketplace.sleep(2000);

    // Run Guardian
    await runGuardianDemo();

    // Display stats
    const stats = marketplace.getStats();
    console.log("\n" + "─".repeat(63));
    console.log("📊 MARKETPLACE STATISTICS");
    console.log("─".repeat(63));
    console.log(`   Total Listings:      ${stats.totalListings}`);
    console.log(`   Available:           ${stats.availableListings}`);
    console.log(`   Sold:                ${stats.soldListings}`);
    console.log(`   Total Transactions:  ${stats.totalTransactions}`);
    console.log(`   Total Volume:        ${stats.totalVolume} tinybar`);
    console.log("─".repeat(63));

    // Wait before next cycle
    if (cycle < 5) {
      await marketplace.sleep(2000);
    }
  }

  // Final summary
  console.log("\n\n" + "═".repeat(63));
  console.log("🏁 SIMULATION COMPLETE");
  console.log("═".repeat(63));

  const finalStats = marketplace.getStats();
  console.log("\n📈 FINAL RESULTS:");
  console.log(`   Threats Discovered:  ${finalStats.totalListings}`);
  console.log(`   Threats Purchased:   ${finalStats.soldListings}`);
  console.log(`   Total Volume:        ${finalStats.totalVolume} tinybar`);
  console.log(`   HCS Topic:           ${finalStats.topicId}`);

  console.log("\n📋 TRANSACTION HISTORY:");
  marketplace.transactions.forEach((tx, i) => {
    const listing = marketplace.listings.find(l => l.id === tx.listingId);
    console.log(`   ${i + 1}. ${listing?.name || 'Unknown'}`);
    console.log(`      Amount: ${tx.amount} tinybar | ${tx.timestamp}`);
  });

  console.log("\n✨ All marketplace data has been recorded on Hedera Consensus Service!");
  console.log(`   View your transactions at: https://hashscan.io/testnet/topic/${finalStats.topicId}`);
  console.log("\n📝 NOTE: This is a demo simulation. In production, real HBAR transfers");
  console.log("   and HCS messages would be recorded on the Hedera network.");
  console.log("\n👋 Thank you for using Hedera Sentinel Marketplace!\n");
}

// Run the demo
main().catch(console.error);
