import { ActivityIndicator, View as Box } from "react-native";
import React, { useEffect } from "react";
import { CustomButton, Text, View } from "../Themed";
import useStore from "../../constants/Store/state";
import { useShallow } from "zustand/react/shallow";
import Imaging from "../../constants/Imaging";
import { GeneralPost } from "../../apis/Post/General";
import { auth } from "../../firebase";
import Colors from "../../constants/Colors";
import { router } from "expo-router";
import currentUser from "../../constants/CurrentUser";

export default function OtherUserProfile() {
  const user = auth?.currentUser?.uid;
  const [chattingWith, setChattingWith] = useStore(
    useShallow((state: any) => [state.chattingWith, state.setChattingWith])
  );
  useEffect(() => {}, [chattingWith]);
  if (chattingWith == null) {
    return <ActivityIndicator color={Colors.light.secondary} />;
  }
  const goToChats = () => {
    router.push({ pathname: `/(chats)/${chattingWith?.uid}` });
  };
  return (
    <View style={{ flex: 1 }}>
      <Box style={{ alignItems: "center", gap: 10 }}>
        <Imaging w={200} h={200} tx={50} name={chattingWith?.nickname} />
        <Text inverse={false} style={{ fontSize: 30, fontWeight: "500" }}>
          {chattingWith?.nickname}
        </Text>
        <Box style={{ alignItems: "center", gap: 5, width: "100%" }}>
          <Text style={{ fontSize: 18, fontWeight: "300" }}>
            {chattingWith?.camp?.address}
          </Text>
          <Text inverse={false} style={{ fontSize: 18, fontWeight: "300" }}>
            {chattingWith?.camp && chattingWith?.camp?.state + " " + "State"}
          </Text>
        </Box>
        <Box>
          {chattingWith?.uid !== user && (
            <CustomButton
              title="Message"
              onPress={() => goToChats()}
              isLoading={false}
            />
          )}
        </Box>
      </Box>
    </View>
  );
}
