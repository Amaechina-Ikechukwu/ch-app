import { Animated, View as Box, PanResponder, } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Text } from '../Themed'
import { LinearGradient } from 'expo-linear-gradient';
import { width } from '../../constants/Dimensions';
import Colors from '../../constants/Colors';
import { PanGestureHandler, State, TouchableOpacity } from 'react-native-gesture-handler';
import GetFullDate from '../../constants/Actions/GetFullDate';
import { useColorScheme } from 'react-native';
import { GeneralPost } from '../../apis/Post/General';
import Imaging from '../../constants/Imaging';

interface DirectMessage {
    author: string,
    message: string,
    sent: number, id: string, ref: string

}

export default function ChatRender({ item, user, onSetChat, chats }: { item: DirectMessage, user: string | undefined, onSetChat: (data: DirectMessage) => void, chats: [] }) {
    const color = useColorScheme() ?? 'light'
    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const [author, setAuthor] = useState<any>()
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            // Restricting the movement to X-axis only
            pan.setValue({ x: gestureState.dx, y: 0 });
        },
        onPanResponderRelease: (_, gestureState) => {
            const threshold = width * 0.1; // Adjust to move at least 30% of the screen width

            if (Math.abs(gestureState.dx) > threshold) {
                // Swipe beyond the threshold
                const newX = item.author === user ? -width * 0.1 : width * 0.1; // Adjust 0.8 as needed

                Animated.timing(pan, {
                    toValue: { x: newX, y: 0 },
                    duration: 100, // Adjust duration as needed
                    useNativeDriver: false,
                }).start(() => {
                    // After reaching the side, come back to the original position

                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false,
                    }).start(() => {
                        setSomething(item);
                    });
                });
            } else {
                // Return to the original position
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false,
                }).start(() => {

                });
            }
        },
    });
    const setSomething = (some: any) => {
        onSetChat(some);
        return
    }
    const refChats: DirectMessage | undefined = chats.find((obj: DirectMessage) => {
        return obj.ref && obj.ref.length !== 0 && obj.id == item.ref;
    });

    const getUserProfile = async () => {
        const { result } = await GeneralPost('profile/user', user, { user: item.author })

        setAuthor(result)
    }
    useEffect(() => { getUserProfile() }, [])



    const transformStyle = {
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
    };
    return (
        <Box style={{ alignItems: item.author == user ? 'flex-end' : 'flex-start' }} >

            <Animated.View {...panResponder.panHandlers} style={[transformStyle, { maxWidth: width * 0.6, gap: 2 }]}>
                <Box>
                    {refChats !== undefined && <Box style={{ borderLeftWidth: 5, borderLeftColor: Colors[color].text, height: 40, justifyContent: 'center', paddingHorizontal: 10, borderRightWidth: 5, borderRightColor: Colors[color].text, borderRadius: 20, width: 'auto' }}>
                        <Text>{refChats?.message}</Text>
                    </Box>}
                </Box>
                <TouchableOpacity style={{}}>
                    <Box style={{ flexDirection: item.author == user ? "row-reverse" : 'row', alignItems: 'center', gap: 2 }}>
                        <Imaging name={author?.nickname || "CH"} w={30} h={30} tx={12} />
                        <Text>{author?.nickname}</Text>
                    </Box>
                </TouchableOpacity>

                <LinearGradient
                    style={[{ maxWidth: width * 0.6, width: 'auto', borderRadius: 25 }]}
                    colors={item.author !== user ? ['#94a3b8', '#e2e8f0'] : ["#d4d4d8", "#e4e4e7"]}
                    start={[0, 0]}
                    end={[1, 1]}
                    locations={[0, 1]}
                >
                    <Box style={{ padding: 15, gap: 5 }}>
                        <Text style={{ color: Colors.light.text, fontSize: 14, fontWeight: '400' }}>{item.message}</Text>
                        <Box style={{ alignItems: 'flex-end' }}>
                            <Text style={{ color: Colors.light.text, fontSize: 10 }}>{GetFullDate(item.sent)}</Text>
                        </Box>
                    </Box>
                </LinearGradient>
            </Animated.View>
        </Box>
    )
}