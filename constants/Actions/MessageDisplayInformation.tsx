import { useEffect, useState } from "react";
import { GeneralGet } from "../../apis/Get/General";
import { View, Text } from "../../components/Themed";
import convertTimestampToTime from "./ConvertedTimeStamp";
import { View as Box } from "react-native";
import { width } from "../Dimensions";
import { acccent } from "../Colors";
export default function MessageDisplayInformation({ message, sent, author, number }: { message: string, sent: string, author: string, number: number }) {

  useEffect(() => { }, [author])
  return (
    <Box style={{ flexDirection: 'row', alignItems: "flex-start", justifyContent: "space-between", width: width * 0.8 }}>
      <Box style={{ flexDirection: 'row', alignItems: "center" }}>
        <Text style={{ fontWeight: "500" }}>{author + ": "}</Text>
        <Text>{message || "No messages yet "}</Text>
      </Box>
      <Box style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 10 }}>
        <Text style={{ fontWeight: "300" }}>{message && convertTimestampToTime(sent)}</Text>{number !== 0 && < Box style={{ borderRadius: 500, width: 25, height: 25, borderWidth: 1, borderColor: 'white', alignItems: 'center', justifyContent: 'center', backgroundColor: acccent, }}>

          <Text style={{ fontSize: 14, fontWeight: '700', color: 'white', textAlign: 'center' }}>{number}</Text>
        </Box>
        }

      </Box>


    </Box >
  );
}
