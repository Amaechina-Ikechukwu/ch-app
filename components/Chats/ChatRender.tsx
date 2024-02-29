import { Animated, View as Box, PanResponder } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Text } from "../Themed";
import { LinearGradient } from "expo-linear-gradient";
import { width } from "../../constants/Dimensions";
import Colors, { acccent } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import GetFullDate from "../../constants/Actions/GetFullDate";
import { useColorScheme } from "react-native";
import { GeneralPost } from "../../apis/Post/General";

interface DirectMessage {
  author: string;
  message: string;
  sent: number;
  id: string;
  ref: string;
  seenBy: boolean;
}
interface ChattingWith {
  nickname: string;
  uid: string;
}

export default function ChatRender({
  item,
  user,
  onSetChat,
  chats,
  chattingWith,
}: {
  item: DirectMessage;
  user: string | undefined;
  onSetChat: (data: DirectMessage) => void;
  chats: [];
  chattingWith?: ChattingWith;
}) {
  const color = useColorScheme() ?? "light";
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      // Restricting the movement to X-axis only
      pan.setValue({ x: gestureState.dx, y: 0 });
    },
    onPanResponderRelease: (_, gestureState) => {
      const threshold = width * 0.3; // Adjust to move at least 30% of the screen width
      onSetChat(item);
      if (Math.abs(gestureState.dx) > threshold) {
        // Swipe beyond the threshold
        const newX = item.author === user ? -width * 0.8 : width * 0.8; // Adjust 0.8 as needed

        Animated.timing(pan, {
          toValue: { x: newX, y: 0 },
          duration: 100, // Adjust duration as needed
          useNativeDriver: false,
        }).start(() => {
          // After reaching the side, come back to the original position
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        });
      } else {
        // Return to the original position
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });
  const refChats: DirectMessage | undefined = chats.find(
    (obj: DirectMessage) => {
      return obj.ref && obj.ref.length !== 0 && obj.id === item.ref;
    }
  );

  const seenMessage = async () => {
    if (item.author == chattingWith?.uid && item.seenBy == false) {
      await GeneralPost("chats/seendm", user, {
        friend: chattingWith?.uid,
        chatid: item.id,
      });
    } else {
      null;
    }
  };

  const transformStyle = {
    transform: [{ translateX: pan.x }, { translateY: pan.y }],
  };
  return (
    <Box
      style={{ alignItems: item.author == user ? "flex-end" : "flex-start" }}
    >
      <Animated.View
        {...panResponder.panHandlers}
        style={[transformStyle, { maxWidth: width * 0.6 }]}
      >
        {refChats !== undefined && (
          <Box
            style={{
              borderLeftWidth: 5,
              borderLeftColor: Colors[color].text,
              height: 40,
              justifyContent: "center",
              paddingHorizontal: 10,
              borderRightWidth: 5,
              borderRightColor: Colors[color].text,
              borderRadius: 20,
              width: "auto",
            }}
          >
            <Text>{refChats?.message}</Text>
          </Box>
        )}
        <LinearGradient
          style={[{ maxWidth: width * 0.6, width: "auto", borderRadius: 25 }]}
          colors={
            item.author !== user
              ? ["#94a3b8", "#e2e8f0"]
              : ["#d4d4d8", "#e4e4e7"]
          }
          start={[0, 0]}
          end={[1, 1]}
          locations={[0, 1]}
        >
          <Box style={{ padding: 15, gap: 5 }}>
            <Text
              style={{
                color: Colors.light.text,
                fontSize: 14,
                fontWeight: "400",
              }}
            >
              {item.message}
            </Text>

            <Box
              style={{ alignItems: "center", flexDirection: "row", gap: 20 }}
            >
              <Text style={{ color: Colors.light.text, fontSize: 10 }}>
                {GetFullDate(item.sent)}
              </Text>
              <Box style={{ alignItems: "flex-end" }}>
                {item.author == user ? (
                  item.seenBy ? (
                    <Ionicons
                      name="checkmark-done-circle"
                      size={18}
                      color={acccent}
                      style={{ color: "green" }}
                    />
                  ) : (
                    <Ionicons
                      name="checkmark-done-circle-outline"
                      size={18}
                      color={"black"}
                    />
                  )
                ) : null}
              </Box>
            </Box>
          </Box>
        </LinearGradient>
      </Animated.View>
    </Box>
  );
}
