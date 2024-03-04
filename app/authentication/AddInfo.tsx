import React, { useEffect, useState } from "react";
import {
  CustomButton,
  Text,
  View,
  CustomTextInput,
} from "../../components/Themed";
import {
  TextInput,
  View as Box,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import Colors, { secondary } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { GeneralGet } from "../../apis/Get/General";
import { auth } from "../../firebase";
import ListOfCamps from "../../components/Authentication/ListsOfCamps";
import { height } from "../../constants/Dimensions";
import { GeneralPost } from "../../apis/Post/General";
import { useNotification } from "../../components/contexts/Notifications";
import { router } from "expo-router";
export default function AddInfo() {
  const [camps, setCamps] = useState(null);
  const [seeCamps, setSeeCamps] = useState(false);
  const user = auth?.currentUser?.uid && auth?.currentUser?.uid;
  const data = async () => {
    const result = await GeneralGet("camp", user);

    setCamps(result.result);
  };

  useEffect(() => {}, [seeCamps]);
  const isCompleted = async () => {
    const result = await GeneralGet("profile/iscomplete", user);
    if (result.result) {
      router.push("/(tabs)/");
    }
  };
  useEffect(() => {
    isCompleted();
    data();
  }, []);
  const color = useColorScheme() ?? "light";
  const { showNotification } = useNotification();
  const [userData, setUserData] = useState({
    nickname: "",
    camp: {
      id: "",
      state: "",
      address: "",
      status: "",
    },
  });
  const addUserData = async () => {
    showNotification("Adding your details");
    try {
      await GeneralPost("profile/adduser", user, userData);
      showNotification("Initializing");
      router.push("/(tabs)/chats");
    } catch (error) {
      showNotification("There seems to be an error");
    }
  };
  return (
    <View style={{ gap: 10, padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>
        Please add a unique nickname and select your camp.
      </Text>
      <Box style={{ width: "90%", gap: 20 }}>
        <CustomTextInput
          placeholder="Enter Nickname"
          value={userData.nickname}
          onChange={(text) => setUserData({ ...userData, nickname: text })}
        />
        <Box>
          <TouchableOpacity
            onPress={() => setSeeCamps(true)}
            style={{
              borderRadius: 5,
              borderWidth: 1,
              padding: 15,
              borderColor: Colors.light.tint,
            }}
          >
            <Text style={{ fontSize: 16 }}>
              {userData?.camp?.address ||
                "Please Click to select your location"}
            </Text>
          </TouchableOpacity>
          {seeCamps && (
            <Box
              style={{
                height: height * 0.6,
                position: "absolute",
                top: -10,
                zIndex: 40,
              }}
            >
              <ListOfCamps
                data={camps}
                onClose={() => setSeeCamps(false)}
                selectCamp={(camp: any) =>
                  setUserData({ ...userData, camp: camp })
                }
              />
            </Box>
          )}
        </Box>
      </Box>
      <View style={{ position: "absolute", bottom: 15 }}>
        <CustomButton
          onPress={addUserData}
          title="Continue"
          style={{ width: "90%", marginTop: 30 }}
          endIcon={
            <AntDesign
              name="arrowright"
              size={20}
              color={Colors.light.text}
              style={{ marginTop: 5 }}
            />
          }
        />
      </View>
    </View>
  );
}
