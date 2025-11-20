const { BaseMessage } = require("@langchain/core/messages");
const { END, StateGraph } = require("@langchain/langgraph");

/**
 * Agent State Schema
 * Defines the shared state structure for the multi-agent marketplace system
 */
const AgentState = {
  messages: {
    value: (x, y) => x.concat(y),
    default: () => [],
  },
  lastListing: {
    value: (x, y) => y ?? x,
    default: () => null,
  },
  lastPurchase: {
    value: (x, y) => y ?? x,
    default: () => null,
  },
  cycleCount: {
    value: (x, y) => (y ?? 0),
    default: () => 0,
  }
};

module.exports = { AgentState };
