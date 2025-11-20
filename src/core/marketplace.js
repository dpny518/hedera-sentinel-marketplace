require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { StateGraph, END } = require("@langchain/langgraph");
const { runHunter } = require("../agents/hunter");
const { runGuardian } = require("../agents/guardian");
const { AgentState } = require("./state");

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
    if (lastMessage.content.includes("New threat data available")) {
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

async function main() {
  console.log("Agents initialized. Starting marketplace simulation...");

  setInterval(async () => {
    const hunterInput = "Find new threats.";
    console.log(`Hunter Agent Input: "${hunterInput}"`);
    const result = await app.invoke({
      messages: [
        {
          role: "user",
          content: hunterInput,
        },
      ],
    });
    console.log(`Result: ${JSON.stringify(result, null, 2)}`);
  }, 10000); // Run every 10 seconds
}

main().catch(console.error);

