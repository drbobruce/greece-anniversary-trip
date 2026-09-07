import type { ContingencyNote } from "../types";

// "Important Connections" — short contingency notes for the Travel Help
// screen. The structure is ready; answers are intentionally left blank
// until you actually supply them. Never invent travel advice here.
export const contingencyNotes: ContingencyNote[] = [
  {
    id: "missed-flight",
    question: "What if we miss this flight?",
  },
  {
    id: "ferry-delayed",
    question: "What if the ferry is delayed?",
  },
  {
    id: "cant-find-transfer",
    question: "What if we cannot find our transfer?",
  },
];
