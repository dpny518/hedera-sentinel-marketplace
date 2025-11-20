# 🚀 Quick Start Guide - Hedera Sentinel Marketplace

## Pre-Submission Checklist

Before submitting to the hackathon, complete these steps:

### ✅ Step 1: Test the Application (5 minutes)

```bash
# 1. Ensure you have Node.js installed
node --version  # Should be v16 or higher

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env

# 4. Edit .env with your credentials
# You need:
# - HEDERA_ACCOUNT_ID (from portal.hedera.com)
# - HEDERA_PRIVATE_KEY (ECDSA format)
# - GROQ_API_KEY (from console.groq.com)
```

**Get Free Credentials:**

1. **Hedera Testnet Account** (2 minutes)
   - Visit: https://portal.hedera.com/dashboard
   - Click "Create Account" → Choose Testnet
   - Copy Account ID (format: 0.0.xxxxx)
   - Copy Private Key (ECDSA format, starts with 302e...)

2. **Groq API Key** (1 minute)
   - Visit: https://console.groq.com/keys
   - Sign up (free, no credit card)
   - Create new API key
   - Copy key (starts with gsk_...)

### ✅ Step 2: Run the Demo

```bash
# Run the marketplace simulation
npm start

# Expected output:
# ✅ Marketplace HCS Topic created: 0.0.xxxxx
# 🔍 HUNTER AGENT: Scanning for threats...
# 🎯 Discovered: Ransomware Variant XZ-47
# 🛡️  GUARDIAN AGENT: Monitoring marketplace...
# ✅ PURCHASED: Ransomware Variant XZ-47
# 📊 MARKETPLACE STATISTICS
```

**What to verify:**
- ✅ HCS Topic is created
- ✅ Hunter publishes threats
- ✅ Guardian purchases threats
- ✅ Statistics are displayed
- ✅ No errors occur

### ✅ Step 3: Verify on Hedera

After running the demo, you'll see output like:

```
✅ Marketplace HCS Topic created: 0.0.4858602
```

1. Copy your Topic ID
2. Visit: `https://hashscan.io/testnet/topic/YOUR_TOPIC_ID`
3. Verify you see marketplace messages

**Example HashScan URL:**
```
https://hashscan.io/testnet/topic/0.0.4858602
```

### ✅ Step 4: Test the Dashboard

```bash
# Open the dashboard in your browser
open public/index.html

# Or manually:
# Navigate to: file:///[PATH]/hedera-sentinel-marketplace/public/index.html
```

**What to check:**
- ✅ Dashboard loads without errors
- ✅ Sample data displays correctly
- ✅ UI is responsive
- ✅ All sections render properly

---

## 📝 Submission Preparation

### Update Personal Information

**1. Update HACKATHON_SUBMISSION.md:**

```bash
# Open and edit these fields:
nano HACKATHON_SUBMISSION.md

# Update:
# - Team Lead name
# - Email address
# - GitHub username
# - Video demo link (after recording)
# - HashScan Topic ID (from your demo)
```

**2. Update README.md:**

```bash
# Edit contact section:
nano README.md

# Update:
# - Your name
# - Your email
# - Your GitHub profile
```

**3. Update package.json:**

```bash
nano package.json

# Update:
# - "author": "Your Name <your.email@example.com>"
```

### Create Demo Video (5-7 minutes)

**Recommended tools:**
- Loom (easiest, free)
- OBS Studio (advanced)
- QuickTime (Mac)
- Windows Game Bar (Windows)

**Demo script:**

```
1. Introduction (30 sec)
   "Hi, I'm [Name]. This is Hedera Sentinel Marketplace,
   an autonomous AI-powered threat intelligence trading platform."

2. Show README (30 sec)
   - Scroll through documentation
   - Highlight architecture diagram
   - Show tech stack

3. Environment Setup (30 sec)
   - Show .env.example
   - "I've configured my Hedera testnet credentials and Groq API key"

4. Run Demo (3 minutes)
   - Run: npm start
   - Show full output
   - Highlight:
     * HCS Topic creation
     * Hunter discovering threats
     * Guardian making purchases
     * HBAR transfers
     * Final statistics

5. HashScan Verification (1 minute)
   - Open HashScan with your topic ID
   - Show on-chain messages
   - "All transactions are immutable and verifiable"

6. Dashboard (30 sec)
   - Open public/index.html
   - Show UI features

7. Code Walkthrough (1 minute)
   - Open index.js
   - Quick tour of marketplace.js
   - Show agent files

8. Closing (30 sec)
   "This demonstrates real A2A protocol implementation
   solving cybersecurity challenges. Thank you!"
```

**Upload to:**
- YouTube (unlisted or public)
- Loom
- Vimeo

**Then add link to:**
- HACKATHON_SUBMISSION.md
- README.md

### Create Pitch Deck

**Use the outline in:**
```
PITCH_DECK_OUTLINE.md
```

**Tools:**
- Google Slides (easiest, free)
- PowerPoint (professional)
- Canva (beautiful designs)
- Figma (designer-friendly)

**Export as PDF:**
- File → Download → PDF
- Save as: `Hedera_Sentinel_Marketplace_Pitch_Deck.pdf`

---

## 🔍 Pre-Submission Testing

### Test Checklist

Run through this checklist before submitting:

```bash
# 1. Clean install test
rm -rf node_modules package-lock.json
npm install
npm start
# ✅ Should run without errors

# 2. Check for secrets in code
grep -r "sk-" src/          # Should be empty
grep -r "0.0." src/         # Should not have hardcoded account IDs
grep -r "302e" src/         # Should not have hardcoded private keys
# ✅ No secrets hardcoded

# 3. Verify .gitignore
cat .gitignore | grep ".env"
# ✅ .env is ignored

# 4. Check all files are committed
git status
# ✅ Working tree clean

# 5. Verify README
cat README.md | head -50
# ✅ Comprehensive and accurate

# 6. Test documentation accuracy
# Follow README instructions step by step
# ✅ Instructions work correctly
```

### Common Issues & Solutions

**Issue 1: "Cannot find module '@hashgraph/sdk'"**
```bash
# Solution: Install dependencies
npm install
```

**Issue 2: "Missing HEDERA_ACCOUNT_ID"**
```bash
# Solution: Create .env file
cp .env.example .env
# Then edit .env with your credentials
```

**Issue 3: "Invalid private key format"**
```bash
# Solution: Ensure using ECDSA format
# Should start with: 302e020100300506032b657004220420...
# NOT DER format
```

**Issue 4: "Insufficient balance"**
```bash
# Solution: Get testnet HBAR
# Visit: portal.hedera.com/dashboard
# Your testnet account comes with free HBAR
```

**Issue 5: "Rate limit exceeded (Groq)"**
```bash
# Solution: Wait 60 seconds or use different API key
# Groq free tier: 30 requests/minute
```

---

## 📤 Final Submission Steps

### 1. Commit Everything

```bash
# Add all files
git add .

# Commit with descriptive message
git commit -m "Final submission: Hedera Sentinel Marketplace hackathon project"

# Push to GitHub
git push origin main
```

### 2. Verify GitHub Repository

Visit your repo and check:
- ✅ README.md displays correctly
- ✅ All source files present
- ✅ .env is NOT committed (only .env.example)
- ✅ Documentation is complete
- ✅ Repository is public

### 3. Prepare Submission Files

Create a folder with:
```
submission/
├── Hedera_Sentinel_Marketplace_Pitch_Deck.pdf
├── demo_video_link.txt
└── hashscan_topic_link.txt
```

**demo_video_link.txt:**
```
https://youtube.com/watch?v=xxxxx
or
https://loom.com/share/xxxxx
```

**hashscan_topic_link.txt:**
```
https://hashscan.io/testnet/topic/0.0.XXXXXX
```

### 4. Fill Out Submission Form

Use the information from:
```
HACKATHON_SUBMISSION.md
```

**Copy-paste ready answers:**

1. **Challenge Theme:** Theme 1: AI & Agents

2. **Challenge Statement:** 3. Intermediate Problem Statement (AI & Agents)

3. **Project Name:** Hedera Sentinel Marketplace

4. **Built on existing project:** No

5. **GitHub Repo:** https://github.com/dpny518/hedera-sentinel-marketplace

6. **Project Description:** [Copy from HACKATHON_SUBMISSION.md]

7. **Pitch Deck:** Upload your PDF

8. **Demo Link:** [Your video URL]

---

## 🎯 Success Criteria

Your submission is ready when you can say YES to all:

### Functionality
- ✅ Application runs without errors
- ✅ Agents successfully trade threats
- ✅ HCS topic created and used
- ✅ HBAR transfers executed
- ✅ All transactions verifiable on HashScan

### Documentation
- ✅ README is comprehensive
- ✅ Setup instructions work
- ✅ Code is well-commented
- ✅ Architecture is explained
- ✅ Tech stack is documented

### Submission Materials
- ✅ GitHub repo is public and complete
- ✅ Demo video is uploaded and accessible
- ✅ Pitch deck PDF is created
- ✅ Submission form is filled out
- ✅ All links work correctly

### Code Quality
- ✅ No hardcoded secrets
- ✅ Error handling implemented
- ✅ Clean code structure
- ✅ Dependencies properly managed
- ✅ .gitignore configured correctly

---

## 🆘 Need Help?

### Resources

**Hedera Documentation:**
- Agent Kit: https://github.com/hashgraph/hedera-agent-kit
- SDK Docs: https://docs.hedera.com
- Testnet Portal: https://portal.hedera.com

**LangChain/LangGraph:**
- LangGraph Docs: https://langchain-ai.github.io/langgraph/
- LangChain JS: https://js.langchain.com

**Groq:**
- Dashboard: https://console.groq.com
- API Docs: https://console.groq.com/docs

### Debugging

**Enable verbose logging:**
```javascript
// Add to index.js
process.env.DEBUG = '*';
```

**Check Hedera connection:**
```bash
# Test account balance
node -e "
const { Client, AccountBalanceQuery } = require('@hashgraph/sdk');
const client = Client.forTestnet().setOperator(
  process.env.HEDERA_ACCOUNT_ID,
  process.env.HEDERA_PRIVATE_KEY
);
new AccountBalanceQuery()
  .setAccountId(process.env.HEDERA_ACCOUNT_ID)
  .execute(client)
  .then(balance => console.log('Balance:', balance.hbars.toString()))
  .catch(err => console.error('Error:', err));
"
```

---

## 🎉 You're Ready!

Your Hedera Sentinel Marketplace is complete and ready for submission!

**Final checklist:**
- ✅ Tested locally
- ✅ Verified on HashScan
- ✅ Documentation complete
- ✅ Demo video recorded
- ✅ Pitch deck created
- ✅ GitHub repo ready
- ✅ Submission form filled

**Good luck with your hackathon submission! 🚀**

---

*Questions? Check HACKATHON_SUBMISSION.md for detailed answers*
