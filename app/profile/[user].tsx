import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../../components/Themed";
import Imaging from "../../constants/Imaging";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { auth } from "../../firebase";
import useStore from "../../constants/Store/state";
import { useShallow } from "zustand/react/shallow";
import { GeneralPost } from "../../apis/Post/General";
import OtherUserProfile from "../../components/Profile/Profile";
const HeaderComp = ({ item, props }: { item: any; props: any }) => {
  return (
    <TouchableOpacity>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <Imaging name={item.nickname || "CH"} />
        <View style={{ gap: 5 }}>
          <Text inverse={false} style={{ fontWeight: "500", fontSize: 16 }}>
            {item.nickname || "CH"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default function Index() {
  const { user } = useLocalSearchParams();
  const currentUser = auth?.currentUser?.uid;
  const [chattingWith, setChattingWith] = useStore(
    useShallow((state: any) => [state.chattingWith, state.setChattingWith])
  );
  const getUserProfile = async () => {
    const { result } = await GeneralPost("profile/user", currentUser, {
      user: user,
    });
    console.log({ result });
    const data = { ...result, uid: user };

    setChattingWith(data);
  };
  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: (props) => (
            <HeaderComp item={chattingWith} props={props} />
          ),
        }}
      />
      <OtherUserProfile />
    </>
  );
}
