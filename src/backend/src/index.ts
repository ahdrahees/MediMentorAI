import {
  query,
  update,
  text,
  Record,
  StableBTreeMap,
  Vec,
  ic,
  Principal,
  Opt,
  Canister,
  Void,
  nat,
} from "azle";
import { v4 as uuidv4 } from "uuid";

// const Message = Record({
//   role: text,
//   content: text,
// });

// const QueryChat = Record({
//   chatId: text,
//   messages: Vec(Message),
// });

const Message = Record({
  parts: Vec(Record({ text: text })),
  role: text,
});

const QueryChat = Record({
  chat_id: text,
  chat_history: Vec(Message),
});

const ChatId = text;
const Index = nat;

const chatsHistory = StableBTreeMap(10, ChatId, Vec(Message));
const userRelatedChatIds = StableBTreeMap(11, Principal, Vec(ChatId));

function checkChatIdIsbyUserElseTrap(caller: Principal, chatId: string) {
  let chatIdsbyUserOpt = userRelatedChatIds.get(caller);
  if ("None" in chatIdsbyUserOpt) {
    return ic.trap("Unauthorized chat");
  } else {
    if (!chatIdsbyUserOpt.Some.includes(chatId)) {
      return ic.trap("Unauthorized chat");
    }
  }
}

export default Canister({
  greet: query([text], text, (name) => {
    return `Hello, ${name}!`;
  }),

  create_new_chat: update([Vec(Message)], ChatId, (newMessages) => {
    const chatId = uuidv4();
    chatsHistory.insert(chatId, [...newMessages]);

    const chatIdsOpt = userRelatedChatIds.get(ic.caller());

    if (chatIdsOpt.None === null) {
      userRelatedChatIds.insert(ic.caller(), [chatId]);
    } else {
      const chatIds = chatIdsOpt.Some;
      chatIds.push(chatId);
      userRelatedChatIds.insert(ic.caller(), chatIds);
    }
    return chatId;
  }),

  add_chat: update([Vec(Message), ChatId], Void, (messages, chatId) => {
    const chatOpt = chatsHistory.get(chatId);
    if (chatOpt.None === null && "None" in chatOpt) {
      return ic.trap("Chat not found.");
    }
    const chat = chatOpt.Some;

    checkChatIdIsbyUserElseTrap(ic.caller(), chatId);
    chat.push(...messages);
    chatsHistory.insert(chatId, chat);
  }),

  get_a_chat: query([ChatId], Opt(Vec(Message)), (chatId) => {
    checkChatIdIsbyUserElseTrap(ic.caller(), chatId);
    return chatsHistory.get(chatId);
  }),

  get_chat_ids_by_user: query([], Opt(Vec(ChatId)), () => {
    return userRelatedChatIds.get(ic.caller());
  }),

  get_chats_by_user: query([], Vec(QueryChat), () => {
    const chatIdsByUserOpt = userRelatedChatIds.get(ic.caller());
    if ("None" in chatIdsByUserOpt) {
      return [];
    }
    const chats: Array<{
      chat_id: string;
      chat_history: { role: string; parts: [{ text: string }] }[];
    }> = [];
    // const chatIdsByUser = chatIdsByUserOpt.Some;
    chatIdsByUserOpt.Some.forEach((chat_id: string) => {
      const chatOpt = chatsHistory.get(chat_id);
      if ("Some" in chatOpt) {
        chats.push({ chat_history: chatOpt.Some, chat_id });
      }
    });

    return chats;
  }),

  update_chat: update(
    [ChatId, Index, Message],
    Void,
    (chatId, index, message) => {
      const index_ = Number(index);
    }
  ),

  // setMessage: update([text], Void, (newMessage) => {
  //   message = newMessage;
  // }),
});
