import { TouchableOpacity, View, useColorScheme } from "react-native";
import React, { useEffect } from "react";
import ChatEnvironment from "../../components/Chats/ChatEnvironment";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Imaging from "../../constants/Imaging";
import { useShallow } from "zustand/react/shallow";
import useStore from "../../constants/Store/state";
import { Text } from "../../components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable } from "react-native";
import Colors from "../../constants/Colors";
import currentUser from "../../constants/CurrentUser";
import { GeneralPost } from "../../apis/Post/General";
import { useNotification } from "../../components/contexts/Notifications";
const HeaderComp = ({ item, props }: { item: any; props: any }) => {
  return (
    <TouchableOpacity onPress={() => router.push("/(chats)/modal")}>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <Imaging name={item?.nickname || "CH"} />
        <View style={{ gap: 5 }}>
          <Text inverse={false} style={{ fontWeight: "500", fontSize: 16 }}>
            {item?.nickname || "CH"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default function ChatID() {
  const { showNotification } = useNotification();
  const { chatid } = useLocalSearchParams();
  const [chattingWith] = useStore(
    useShallow((state: any) => [state.chattingWith])
  );
  const colorScheme = useColorScheme();
  useEffect(() => {
    console.log({ chatid });
  }, []);
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <Stack.Screen
        options={{
          headerTitle: (props) => (
            <HeaderComp item={chattingWith} props={props} />
          ),
        }}
      />
      <ChatEnvironment chatid={chatid} />
    </View>
  );
}
