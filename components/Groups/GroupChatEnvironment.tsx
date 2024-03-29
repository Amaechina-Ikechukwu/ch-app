import React, { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { auth, db } from "../../firebase";
import ChatRender from "./ChatRender";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import useStore from "../../constants/Store/state";
import { useShallow } from "zustand/react/shallow";
import ChatInput from "../../constants/ChatInput";
import { GeneralPost } from "../../apis/Post/General";
import { useNotification } from "../contexts/Notifications";
import { View } from "react-native";
import { width } from "../../constants/Dimensions";
interface ChatData {
  // Define the structure of your chat item
  message: string;
  sender: string;
  // ... other properties
}
interface Chat {
  author: string;
  message: string;
  sent: number;
  // Add any other properties as per your data structure
}
export default function GroupChatEnvironment({
  groupid,
}: {
  groupid: string | string[];
}) {
  const { showNotification } = useNotification();
  const [chats, setChats] = useState<any>(); // Chats as an array of Chat objects
  const user = auth?.currentUser?.uid;
  const [
    setHighlightedChat,
    highlightedChat,
    openInput,
    setOpenInput,
    group,
    deleteHighlightedChat,
  ] = useStore(
    useShallow((state: any) => [
      state.setHighlightedChat,
      state.highlightedChat,
      state.openInput,
      state.setOpenInput,
      state.group,
      state.deleteHighlightedChat,
    ])
  );
  const [message, setMessage] = useState("");
  const [tempMessage, setTempMessage] = useState("");
  useEffect(() => {
    const chatsRef = ref(db, `groups/${groupid}/chats`);
    onValue(chatsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newdata = Object.entries(data).map(
          ([key, value]: [string, any]) => ({ id: key, ...value })
        );
        // Reverse the order of messages to show the latest one first
        const reversedChats = newdata.reverse();
        setChats(reversedChats);
      }
    });
  }, [groupid]);
  const highlight = (data: any) => {
    const newData = { dmid: groupid, ...data };
    setHighlightedChat(newData);
    setOpenInput(true);
  };
  const sendMessage = async () => {
    const tempMsg = message; // Store the message in a temporary variable
    if (message.length !== 0) {
      try {
        setMessage(""); // Clear the message input

        const body = {
          groupid: group.groupId,
          message: tempMsg,
          refid: Array.isArray(groupid)
            ? highlightedChat[groupid[0]].id || ""
            : highlightedChat[groupid]?.id || "",
        };

        await GeneralPost("groups/senddm", user, body); // Sending the message

        deleteHighlightedChat(groupid);
      } catch (error) {
        console.error("Error sending message:", error);
        setMessage(tempMsg); // Restore the message if sending fails
        showNotification("Error sending message");
      }
    }
  };

  useEffect(() => {}, [highlightedChat, openInput]);

  return (
    <View style={{ height: "100%" }}>
      <KeyboardAvoidingView>
        <FlatList
          data={chats}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
          inverted
          renderItem={({ item }) => (
            <ChatRender
              item={item}
              user={user}
              onSetChat={(data) => highlight(data)}
              chats={chats}
              groupid={groupid}
            />
          )}
          style={{
            height: highlightedChat[groupid] !== undefined ? "85%" : "90%",
          }}
          keyExtractor={(item, index) => item.id}
        />
      </KeyboardAvoidingView>

      <View style={{ position: "absolute", bottom: 10 }}>
        <ChatInput
          text={message}
          onChangeText={(text: any) => setMessage(text)}
          sendMessage={sendMessage}
          chatid={groupid}
        />
      </View>
    </View>
  );
}
