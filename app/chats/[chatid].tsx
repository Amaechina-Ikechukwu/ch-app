import { View, Text } from "react-native";
import React from "react";
import ChatEnvironment from "../../components/Chats/ChatEnvironment";
import { useLocalSearchParams } from "expo-router";

export default function ChatID() {
  const { chatid } = useLocalSearchParams();
  return (
    <View style={{ padding: 20 }}>
      <ChatEnvironment chatid={chatid} />
    </View>
  );
}
