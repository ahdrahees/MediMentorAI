import {
  query,
  update,
  text,
  Record,
  StableBTreeMap,
  Variant,
  Vec,
  None,
  Some,
  Ok,
  Err,
  ic,
  Principal,
  Opt,
  nat64,
  Duration,
  Result,
  bool,
  Canister,
  init,
  Void,
  nat,
} from "azle";
import { v4 as uuidv4 } from "uuid";

const Message = Record({
  role: text,
  content: text,
});
const QueryChat = Record({
  chatId: text,
  messages: Vec(Message),
});
const ChatId = text;
const Index = nat;

let message = "";

const chatsHistory = StableBTreeMap(10, ChatId, Vec(Message));
const userRelatedChatIds = StableBTreeMap(10, Principal, Vec(ChatId));

function checkChatIdIsbyUserElseTrap(caller: Principal, chatId: string) {
  let chatIdsbyUserOpt = userRelatedChatIds.get(caller);
  if ("None" in chatIdsbyUserOpt) {
    return ic.trap("Unautherised chat");
  } else {
    if (!chatIdsbyUserOpt.Some.includes(chatId)) {
      return ic.trap("Unautherised chat");
    }
  }
}

export default Canister({
  greet: query([text], text, (name) => {
    return `Hello, ${name}!`;
  }),

  create_new_chat: update([Message], ChatId, (newMessage) => {
    const chatId = uuidv4();
    chatsHistory.insert(chatId, [newMessage]);

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

  add_chat: update([Message, ChatId], Void, (message, chatId) => {
    const chatOpt = chatsHistory.get(chatId);
    if (chatOpt.None === null && "None" in chatOpt) {
      return ic.trap("Chat didn't found");
    }
    const chat = chatOpt.Some;

    checkChatIdIsbyUserElseTrap(ic.caller(), chatId);
    chat.push(message);
    chatsHistory.insert(chatId, chat);
  }),

  get_a_chat: query([ChatId], Opt(Vec(Message)), (chatId) => {
    checkChatIdIsbyUserElseTrap(ic.caller(), chatId);
    return chatsHistory.get(chatId);
  }),

  get_chat_ids_by_user: query([], Opt(Vec(ChatId)), () => {
    return userRelatedChatIds.get(ic.caller());
  }),

  delete_chat: update([ChatId], Void, (chatId) => {}),

  get_chats_by_user: query([], Vec(QueryChat), () => {
    const chatIdsByUserOpt = userRelatedChatIds.get(ic.caller());
    if ("None" in chatIdsByUserOpt) {
      return [];
    }
    const chats: Array<{
      chatId: string;
      messages: { role: string; content: string };
    }> = [];
    // const chatIdsByUser = chatIdsByUserOpt.Some;
    chatIdsByUserOpt.Some.forEach((chatId: string) => {
      const chatOpt = chatsHistory.get(chatId);
      if ("Some" in chatOpt) {
        chats.push({ messages: chatOpt.Some, chatId });
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

  setMessage: update([text], Void, (newMessage) => {
    message = newMessage;
  }),
});
