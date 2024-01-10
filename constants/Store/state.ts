import { create } from "zustand";

const useStore = create((set) => ({
  chatList: null,
  setChatList: (list: any) => set(() => ({ chatList: list })),
  highlightedChat: {},
  openInput: false,
  setOpenInput: (open: any) => set(() => ({ openInput: open })),
  setHighlightedChat: (chat: any) => {
    set((state: any) => {
      const updatedHighlightedChat = { ...state.highlightedChat };

      if (updatedHighlightedChat.hasOwnProperty(chat.dmid)) {
        // If the dmid exists, update the data
        updatedHighlightedChat[chat.dmid] = chat;
      } else {
        state.openInput = false;
        // If the dmid doesn't exist, add the new data
        updatedHighlightedChat[chat.dmid] = chat;
      }

      return { highlightedChat: updatedHighlightedChat, openInput: true };
    });
  },

  deleteHighlightedChat: (dmid: string) => {
    set((state: any) => {
      const updatedHighlightedChat = { ...state.highlightedChat };

      if (updatedHighlightedChat.hasOwnProperty(dmid)) {
        delete updatedHighlightedChat[dmid]; // Delete the object with the specified dmid
      }

      return { highlightedChat: updatedHighlightedChat };
    });
  },

  chattingWith: null,
  setChattingWith: (user: any) => set(() => ({ chattingWith: user })),
  group: null,
  setGroup: (group: any) => set(() => ({ group: group })),
}));

export default useStore;
