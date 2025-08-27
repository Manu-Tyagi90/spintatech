// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "xstate.after(1000)#chatAgent.fallback": {
      type: "xstate.after(1000)#chatAgent.fallback";
    };
    "xstate.after(1000)#chatAgent.responding": {
      type: "xstate.after(1000)#chatAgent.responding";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {};
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {};
  matchesStates:
    | "fallback"
    | "humanHandoff"
    | "idle"
    | "processing"
    | "responding";
  tags: never;
}
