const { BaseMessage } = require("@langchain/core/messages");
const { END, StateGraph } = require("@langchain/langgraph");

const AgentState = {
  messages: {
    value: (x, y) => x.concat(y),
    default: () => [],
  },
};

module.exports = { AgentState };
