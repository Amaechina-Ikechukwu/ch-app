import { create } from "zustand";

const useStore = create((set) => ({
  chatList: null,
  setChatList: (list: any) => set(() => ({ chatList: list })),
  highlightedChat: {},
  openInput: false,
  groupUsers: {},
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
  setGroupUsers: async (chat: any) => {
    set((state: any) => {
      const updatedGroupUsers = { ...state.groupUsers };

      if (chat.dmid === "") {
        // Assuming dmid is empty for setting the current user's profile
        updatedGroupUsers[""] = {
          [chat.user]: {
            ...chat.userProfile,
          },
        };
      } else {
        if (updatedGroupUsers.hasOwnProperty(chat.dmid)) {
          // If the dmid exists, merge the new users with the existing ones
          chat.users.forEach((user: any) => {
            updatedGroupUsers[chat.dmid][user.userid] = { ...user };
          });
        } else {
          // If the dmid doesn't exist, create a new entry
          updatedGroupUsers[chat.dmid] = {};
          chat.users.forEach((user: any) => {
            updatedGroupUsers[chat.dmid][user.userid] = { ...user };
          });
        }
      }

      return { groupUsers: updatedGroupUsers };
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
