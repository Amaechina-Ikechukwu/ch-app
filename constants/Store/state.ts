import { create } from "zustand";

const useStore = create((set) => ({
  chatList: null,
  setChatList: (list: any) => set(() => ({ chatList: list })),
}));
export default useStore;
