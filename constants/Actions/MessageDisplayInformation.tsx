import { useEffect, useState } from "react";
import { GeneralGet } from "../../apis/Get/General";
import { View, Text } from "../../components/Themed";
import convertTimestampToTime from "./ConvertedTimeStamp";
import { View as Box } from "react-native";
import { width } from "../Dimensions";
export default function MessageDisplayInformation({ message, sent, author }: { message: string, sent: string, author: string }) {
  const [userData, setUserData] = useState("Arthur")
  // const data = async () => {
  //   const result = await GeneralGet('profile/')
  // }
  useEffect(() => { }, [])
  return (
    <Box style={{ flexDirection: 'row', alignItems: "flex-start", justifyContent: "space-between", width: width * 0.8 }}>
      <Box style={{ flexDirection: 'row', alignItems: "center" }}>
        <Text style={{ fontWeight: "500" }}>{userData + ": "}</Text>
        <Text>{message || "No messages yet "}</Text>
      </Box>

      <Text style={{ fontWeight: "300" }}>{message && convertTimestampToTime(sent)}</Text>
    </Box>
  );
}
