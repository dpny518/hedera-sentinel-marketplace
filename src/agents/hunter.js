const { ChatGroq } = require("@langchain/groq");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { Client, PrivateKey } = require("@hashgraph/sdk");
const { AIMessage } = require("@langchain/core/messages");

// Simulated threat intelligence data
const THREAT_DATABASE = [
  {
    name: "Ransomware Variant XZ-47",
    severity: "critical",
    description: "New ransomware strain targeting healthcare systems. Uses advanced encryption and double extortion tactics.",
    indicators: ["Hash: 8f7d9e2a...", "C2 Server: 185.220.101.42", "Port: 8443"],
    price: 50 // in tinybar (0.00000050 HBAR for demo)
  },
  {
    name: "Phishing Campaign PH-2024",
    severity: "high",
    description: "Large-scale phishing operation impersonating major cloud providers. Targets corporate credentials.",
    indicators: ["Domain: cloudsecurity-verify.com", "Email pattern: noreply@*"],
    price: 30
  },
  {
    name: "Malware Loader ML-883",
    severity: "medium",
    description: "Polymorphic malware loader detected in supply chain attacks. Capable of deploying multiple payloads.",
    indicators: ["Hash: 3a9f8c1b...", "Registry key: HKLM\\Software\\SysUpdate"],
    price: 40
  },
  {
    name: "Zero-Day Exploit CVE-2024-XXXX",
    severity: "critical",
    description: "Remote code execution vulnerability in widely-used web framework. Active exploitation detected.",
    indicators: ["Affected versions: 3.x - 4.2", "Exploit signature: %7B%7B..."],
    price: 100
  },
  {
    name: "Botnet Command Server BS-901",
    severity: "high",
    description: "Command and control server for IoT botnet. Controls over 50,000 compromised devices.",
    indicators: ["IP: 203.0.113.15", "Port: 6667", "Protocol: IRC-based"],
    price: 60
  }
];

let threatIndex = 0;
let marketplace = null;

function setMarketplace(mp) {
  marketplace = mp;
}

async function runHunter(state) {
  console.log("\n🔍 HUNTER AGENT: Scanning for threats...");

  // Simulate discovering a new threat
  const threat = THREAT_DATABASE[threatIndex % THREAT_DATABASE.length];
  threatIndex++;

  const threatData = {
    ...threat,
    seller: process.env.HEDERA_ACCOUNT_ID,
    discoveredAt: new Date().toISOString()
  };

  console.log(`\n🎯 Discovered: ${threat.name}`);
  console.log(`   Severity: ${threat.severity.toUpperCase()}`);
  console.log(`   Price: ${threat.price} tinybar`);
  console.log(`   Description: ${threat.description}`);

  // Publish to marketplace
  if (marketplace) {
    try {
      const listing = await marketplace.publishThreat(threatData);
      console.log(`✅ Published to marketplace: ${listing.id}`);

      // Create response message for the agent
      const response = new AIMessage(
        `New threat data available: ${threat.name} (Severity: ${threat.severity}, Price: ${threat.price} tinybar). ` +
        `Listing ID: ${listing.id}. Available for purchase on the marketplace.`
      );

      return {
        messages: [response],
        lastListing: listing
      };
    } catch (error) {
      console.error("❌ Error publishing threat:", error.message);
    }
  }

  const response = new AIMessage(
    `Analyzed threat: ${threat.name}. Marketplace not initialized.`
  );

  return {
    messages: [response]
  };
}

function createHunterAgent() {
  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama3-8b-8192",
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are a cybersecurity threat hunter AI. Your job is to discover, analyze, and monetize threat intelligence data. " +
      "When you find a threat, you publish it to the Hedera Sentinel Marketplace where security teams can purchase it to protect their systems."
    ],
    ["human", "{input}"],
    new AIMessage(""),
  ]);

  return { model, prompt };
}

module.exports = { runHunter, setMarketplace, createHunterAgent };
