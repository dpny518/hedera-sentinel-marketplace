const { ChatGroq } = require("@langchain/groq");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { HederaLangchainToolkit, HederaConsensusTool } = require("hedera-agent-kit");
const { AIMessage, HumanMessage } = require("@langchain/core/messages");

async function runHunter(state) {
    const { model, tools, prompt } = createHunterAgent();

    const runnable = await prompt.pipe(model.bind({ tools }));
    const result = await runnable.invoke({
        input: state.messages.slice(-1)[0].content,
        chat_history: state.messages.slice(0, -1)
    });

    return {
        messages: [result],
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
      "You are a cybersecurity expert. Your job is to analyze information and identify potential threats. When you find one, you must create a threat report and publish its availability and price to the network.",
    ],
    ["human", "{input}"],
    new AIMessage(""),
  ]);

  const hederaToolkit = new HederaLangchainToolkit(process.env.HEDERA_ACCOUNT_ID, process.env.HEDERA_PRIVATE_KEY);
  const tools = [
    new HederaConsensusTool(hederaToolkit.consensus),
  ];

  return { model, tools, prompt };
}

module.exports = { runHunter };

