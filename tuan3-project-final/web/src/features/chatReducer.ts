import { ADD_MESSAGE, SET_MESSAGES } from "./chatTypes";

type Message = {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
};

export interface MessageState {
  messages: Message[];
};

const initialState: MessageState = {
  messages: [],
};

type Action =
  | { type: typeof ADD_MESSAGE; payload: Message }
  | { type: typeof SET_MESSAGES; payload: Message[] };

function chatReducer(state = initialState, action: Action): MessageState {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload].filter(
          (msg, index, self) =>
            index === self.findIndex((m) => m.id === msg.id),
        ),
      };
    case SET_MESSAGES:
      return { ...state, messages: action.payload };
    default:
      return state;
  }
}

export default chatReducer;
