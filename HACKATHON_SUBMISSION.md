# Hedera Hackathon 2024 - Submission Form

## Challenge Selection

### Challenge Theme
**Theme 1: AI & Agents**

### Challenge Description
This track challenges builders to explore the fusion of AI-driven agents with decentralized infrastructure by creating marketplaces, coordination layers, and tools where autonomous actors can think, transact, and collaborate—leveraging Hedera's fast, low-cost microtransactions and secure consensus to unlock the rise of transparent, autonomous economies.

### Challenge Statement
**3. Intermediate Problem Statement (AI & Agents)**

*Collaborative Multi-Agent Marketplace: Leverage Agent 2 Agent (A2A) protocol to create a network of AI agents that buy and sell digital goods or data.*

---

## Project Details

### Project Name
**Hedera Sentinel Marketplace**

### Is your submission built on top of existing project?
**No** - This is a new project built from scratch during the hackathon period.

### Existing Projects - List of Improvements Made
*N/A - New project*

---

### GitHub Repo Link
**Repository URL:** `https://github.com/dpny518/hedera-sentinel-marketplace`

**Direct Commit Link:** `https://github.com/dpny518/hedera-sentinel-marketplace/commits/main`

**Key Commits During Hackathon Period (Nov 3-21, 2024):**
- Initial project structure and multi-agent setup
- Implemented marketplace core with HCS integration
- Added Hunter agent with threat intelligence publishing
- Implemented Guardian agent with autonomous purchasing
- Created HBAR transfer functionality
- Built web dashboard UI
- Comprehensive documentation and README

---

### Project Description

**Overview (100 words):**

Hedera Sentinel Marketplace is an autonomous AI-powered threat intelligence trading platform where cybersecurity agents buy and sell security data using Hedera Hashgraph. The system features two intelligent agents: Hunter (discovers and sells threats) and Guardian (evaluates and purchases threats). All marketplace transactions are recorded on Hedera Consensus Service (HCS) for transparency, with payments executed via HBAR microtransactions. Built with LangGraph for multi-agent orchestration and Hedera Agent Kit for blockchain integration, the platform demonstrates real-world A2A protocol implementation solving critical cybersecurity intelligence distribution challenges through autonomous, trustless transactions on decentralized infrastructure.

**Tech Stack:**

**Blockchain Infrastructure:**
- Hedera Hashgraph (Testnet)
- Hedera Consensus Service (HCS) - Immutable event logging
- HBAR Cryptocurrency - Agent-to-agent payments
- Hedera SDK (@hashgraph/sdk v2.77.0)
- Hedera Agent Kit (v3.4.0) - AI/blockchain integration

**AI & Agent Framework:**
- LangGraph (v1.0.2) - Multi-agent workflow orchestration
- LangChain (v1.0.6) - Agent framework and tooling
- Groq + Llama 3 (8B) - Fast LLM inference for agent reasoning
- @langchain/core (v1.0.6) - Core agent primitives

**Backend & Runtime:**
- Node.js - JavaScript runtime
- dotenv (v17.2.3) - Environment configuration
- Native JavaScript - Core logic implementation

**Frontend:**
- HTML5/CSS3 - Responsive dashboard UI
- Vanilla JavaScript - Real-time data visualization
- Gradient UI design - Modern interface

**Development Tools:**
- Git/GitHub - Version control and collaboration
- npm - Package management
- ESLint/Prettier ready - Code quality (optional)

**Architecture Pattern:**
- Multi-agent system (Hunter + Guardian)
- Event-driven marketplace
- State machine workflow (LangGraph)
- Microservices architecture ready

**Key Integrations:**
- Hedera Agent Kit Plugins (Consensus, Queries, Account)
- HCS Topic messaging
- HBAR TransferTransaction API
- AI model tool calling

---

### Pitch Deck (PDF)
**File:** `Hedera_Sentinel_Marketplace_Pitch.pdf`

**Deck Structure:**
1. **Cover Slide**
   - Project name and tagline
   - Team information
   - Hackathon track

2. **Problem Statement**
   - Centralized threat intelligence is expensive
   - Lack of transparency in security data markets
   - Need for real-time, trustless threat sharing
   - Organizations can't verify data authenticity

3. **Solution Overview**
   - Autonomous AI marketplace for threat intelligence
   - Decentralized, transparent transactions on Hedera
   - Agent-to-agent trading protocol
   - Real-time threat discovery and distribution

4. **How It Works**
   - Hunter Agent discovers threats
   - Publishes to HCS marketplace topic
   - Guardian Agent monitors and evaluates
   - Autonomous purchasing with HBAR
   - Threat intelligence delivered instantly

5. **Technical Architecture**
   - System diagram showing Hunter, Guardian, Marketplace Core
   - Hedera integration (HCS, HBAR, SDK)
   - LangGraph multi-agent workflow
   - AI decision-making process

6. **Key Features**
   - ✅ Autonomous agent trading
   - ✅ HCS-based transparency
   - ✅ HBAR microtransactions
   - ✅ Real-time threat intelligence
   - ✅ Severity-based pricing
   - ✅ Complete audit trail

7. **Technology Stack**
   - Hedera Hashgraph + Agent Kit
   - LangGraph multi-agent system
   - Groq/Llama 3 for AI
   - Node.js backend

8. **Demo Highlights**
   - Live marketplace simulation
   - 5 different threat scenarios
   - Autonomous agent interactions
   - On-chain transaction verification
   - HashScan explorer view

9. **Innovation & Impact**
   - First AI-powered threat marketplace on Hedera
   - Real-world cybersecurity use case
   - Demonstrates A2A protocol viability
   - Production-ready architecture

10. **Business Model** (Future)
    - Transaction fees (1-2%)
    - Premium threat feeds
    - Enterprise agent licenses
    - Marketplace token (HTS)

11. **Competitive Advantages**
    - Hedera's speed (3-5 sec finality)
    - Low-cost transactions ($0.0001)
    - Immutable audit trail
    - AI-driven automation
    - Open marketplace vs. proprietary feeds

12. **Metrics & Results**
    - Successfully executed multi-agent trades
    - HCS topic creation and messaging
    - HBAR transfers functional
    - 5 threat types with IOCs
    - Complete transaction history

13. **Challenges Overcome**
    - Multi-agent state synchronization
    - LangGraph workflow coordination
    - HCS message formatting
    - Agent decision logic tuning
    - Real-time marketplace updates

14. **Future Roadmap**
    - **Phase 1 (Q1 2025):**
      - HTS marketplace token
      - Multi-seller support
      - Reputation system

    - **Phase 2 (Q2 2025):**
      - Smart contract escrow
      - Real CVE feed integration
      - WebSocket dashboard

    - **Phase 3 (Q3 2025):**
      - Mobile app
      - Enterprise API
      - Global agent network

    - **Phase 4 (Q4 2025):**
      - Mainnet deployment
      - Compliance framework
      - Partner integrations

15. **Key Learnings**
    - Hedera Agent Kit simplifies blockchain/AI integration
    - HCS perfect for marketplace event logging
    - LangGraph enables complex agent workflows
    - Low transaction costs enable micro-payments
    - Fast finality crucial for real-time trading

16. **Team & Contact**
    - Team members and roles
    - GitHub repository
    - Demo video link
    - Contact information

17. **Call to Action**
    - Try the demo
    - View on HashScan
    - Explore the code
    - Join the future of autonomous markets

18. **Thank You**
    - Acknowledgments
    - Hedera Hackathon 2024
    - Questions?

---

### Project Demo Link

**Live Demo:** `https://yourusername.github.io/hedera-sentinel-marketplace/`

**Alternative Demo Options:**

1. **Video Demo:** `[YouTube/Loom link to demo video]`
   - 3-5 minute walkthrough
   - Shows marketplace initialization
   - Demonstrates agent interactions
   - Shows HCS topic on HashScan
   - Displays transaction history

2. **Local Demo Instructions:**
   ```bash
   # Clone repository
   git clone https://github.com/dpny518/hedera-sentinel-marketplace
   cd hedera-sentinel-marketplace

   # Install dependencies
   npm install

   # Configure environment (see .env.example)
   cp .env.example .env
   # Edit .env with your Hedera testnet credentials

   # Run marketplace
   npm start

   # View dashboard
   open public/index.html
   ```

3. **Interactive Demo:**
   - Dashboard UI: `public/index.html`
   - View sample transactions and marketplace stats
   - See agent activity logs

**HashScan Explorer:**
After running the demo, view live transactions at:
`https://hashscan.io/testnet/topic/[YOUR_TOPIC_ID]`

*(Topic ID is displayed when you run `npm start`)*

---

## Additional Remarks

### Demo Account Access
**No login credentials required** - The application runs locally using your own Hedera testnet account.

### Setup Requirements

**1. Hedera Testnet Account:**
- Create free account at: https://portal.hedera.com/dashboard
- You'll receive testnet HBAR automatically
- Copy your Account ID and Private Key (ECDSA format)

**2. Groq API Key:**
- Get free API key at: https://console.groq.com/keys
- No credit card required
- Generous free tier for hackathon use

**3. Environment Variables:**
Add to `.env` file:
```bash
HEDERA_ACCOUNT_ID=0.0.xxxxx
HEDERA_PRIVATE_KEY=302e020100300506032b657004220420...
GROQ_API_KEY=gsk_...
```

### Testing Instructions

**Run the full simulation:**
```bash
npm start
```

**Expected behavior:**
- Initializes Hedera client
- Creates HCS marketplace topic
- Runs 5 marketplace cycles (8 seconds each)
- Hunter discovers and publishes threats
- Guardian evaluates and purchases critical threats
- Displays real-time statistics
- Shows final transaction summary
- Provides HashScan link for verification

**Success indicators:**
- ✅ HCS Topic created: `0.0.xxxxx`
- ✅ Threats published to HCS
- ✅ HBAR transfers executed
- ✅ Transactions recorded on-chain
- ✅ Complete audit trail available

### File Structure for Judges

```
hedera-sentinel-marketplace/
├── README.md                   # Comprehensive documentation
├── HACKATHON_SUBMISSION.md     # This file
├── index.js                    # Main application entry
├── package.json                # Dependencies
├── .env.example                # Environment template
├── public/
│   └── index.html              # Dashboard UI
└── src/
    ├── agents/                 # AI agents
    │   ├── hunter.js           # Threat seller
    │   └── guardian.js         # Threat buyer
    ├── core/                   # Core logic
    │   ├── marketplace.js      # Marketplace + HCS
    │   └── state.js            # Agent state
    └── tools/
        └── hedera.js           # HTS utilities
```

### Key Features for Evaluation

**1. Autonomous AI Agents:**
- Hunter: Discovers threats, sets prices, publishes listings
- Guardian: Monitors marketplace, evaluates threats, makes purchases
- Both agents use Groq/Llama 3 for decision-making

**2. Hedera Integration:**
- HCS Topic for marketplace transparency
- HBAR transfers for payments
- Hedera Agent Kit for seamless integration
- All transactions verifiable on HashScan

**3. Real-World Use Case:**
- Solves cybersecurity intelligence distribution
- 5 realistic threat scenarios (ransomware, zero-days, botnets)
- Severity-based pricing model
- Indicators of Compromise (IOCs) included

**4. Production Quality:**
- Error handling and validation
- Graceful shutdown
- Comprehensive logging
- Detailed documentation
- Clean code architecture

### Judging Criteria Alignment

**Innovation (25%):**
- Novel application of A2A protocol to cybersecurity
- First threat intelligence marketplace on Hedera
- Autonomous agent decision-making
- Real-time decentralized trading

**Technical Implementation (25%):**
- Full Hedera integration (HCS, HBAR, SDK)
- LangGraph multi-agent orchestration
- Production-ready code quality
- Extensible architecture (HTS ready)

**User Experience (25%):**
- Clear console output with emojis and formatting
- Interactive web dashboard
- Comprehensive README
- Easy setup process (3 steps)
- Real-time statistics and feedback

**Potential Impact (25%):**
- Addresses real cybersecurity problem
- Scalable to multiple agents
- Applicable to other data marketplaces
- Foundation for autonomous economies
- Open-source for community building

### Contact Information

**Team Lead:** [Your Name]
**Email:** [Your Email]
**GitHub:** [@dpny518](https://github.com/dpny518)
**Project Repository:** https://github.com/dpny518/hedera-sentinel-marketplace

### Video Demo Notes

**Recommended Demo Flow:**
1. Show project overview and architecture (30s)
2. Demonstrate environment setup (30s)
3. Run marketplace simulation (2-3 min)
   - Show Hunter discovering threats
   - Show Guardian making purchases
   - Highlight HCS topic updates
   - Display transaction statistics
4. Open HashScan to verify on-chain data (30s)
5. Show dashboard UI (30s)
6. Explain future roadmap (30s)

**Total duration:** 4-5 minutes

---

## Verification Checklist

Before final submission, ensure:

- ✅ All code committed to GitHub (no commits after deadline)
- ✅ README.md is comprehensive and clear
- ✅ .env.example provided (not .env with secrets)
- ✅ Demo video recorded and uploaded
- ✅ Pitch deck created (PDF format)
- ✅ Repository is public
- ✅ All dependencies listed in package.json
- ✅ Project runs with `npm start`
- ✅ Dashboard UI is functional
- ✅ Documentation is accurate and complete

---

## Quick Start for Judges

```bash
# 1. Clone and setup
git clone https://github.com/dpny518/hedera-sentinel-marketplace
cd hedera-sentinel-marketplace
npm install

# 2. Configure (use your own Hedera testnet account)
cp .env.example .env
# Edit .env with your credentials

# 3. Run demo
npm start

# 4. View dashboard
open public/index.html
```

**Estimated setup time:** 5 minutes
**Demo runtime:** 40 seconds (5 cycles × 8 seconds)

---

*Built with 💜 for Hedera Hackathon 2024*
*Democratizing cybersecurity through autonomous AI agents and decentralized infrastructure*
