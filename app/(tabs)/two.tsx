import { StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { CustomButton, Text, View } from "../../components/Themed";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <CustomButton title={"Log out"} onPress={() => signOut(auth)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
