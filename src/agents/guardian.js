const { ChatGroq } = require("@langchain/groq");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { HederaLangchainToolkit, HederaConsensusTool, HederaAccountBalanceQueryTool } = require("hedera-agent-kit");
const { AIMessage, HumanMessage } = require("@langchain/core/messages");

async function runGuardian(state) {
    const { model, tools, prompt } = createGuardianAgent();

    const runnable = await prompt.pipe(model.bind({ tools }));
    const result = await runnable.invoke({
        input: state.messages.slice(-1)[0].content,
        chat_history: state.messages.slice(0, -1)
    });

    return {
        messages: [result],
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
      "You are a security administrator. Your job is to monitor the threat marketplace for new threats and purchase them to protect your system.",
    ],
    ["human", "{input}"],
    new AIMessage(""),
  ]);

  const hederaToolkit = new HederaLangchainToolkit(process.env.HEDERA_ACCOUNT_ID, process.env.HEDERA_PRIVATE_KEY);
  const tools = [
    new HederaConsensusTool(hederaToolkit.consensus),
    new HederaAccountBalanceQueryTool(hederaToolkit.query)
  ];

  return { model, tools, prompt };
}

module.exports = { runGuardian };

