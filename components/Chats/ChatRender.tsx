import { View as Box, } from 'react-native'
import React, { useEffect } from 'react'
import { Text } from '../Themed'
import { LinearGradient } from 'expo-linear-gradient';
import { width } from '../../constants/Dimensions';
import Colors from '../../constants/Colors';
import convertTimestampToTime from '../../constants/Actions/ConvertedTimeStamp';
import GetFullDate from '../../constants/Actions/GetFullDate';

interface DirectMessage {
    author: string,
    message: string,
    sent: number
}

export default function ChatRender({ item, user }: { item: DirectMessage, user: string | undefined }) {
    // useEffect(() => { console.log(JSON.stringify(item, null, 2)) }, [])
    return (
        <Box style={{ alignItems: item.author == user ? 'flex-end' : 'flex-start' }} >
            <LinearGradient style={{ maxWidth: width * 0.6, width: 'auto', borderRadius: 15 }}
                // Colors for the gradient
                colors={item.author !== user ? ['#94a3b8', '#e2e8f0'] : ["#d4d4d8", "#e4e4e7"]}
                // You can set the direction of the gradient (optional)
                start={[0, 0]}
                end={[1, 1]}
                // You can adjust the locations of the colors (optional)
                locations={[0, 1]}
            >
                <Box style={{ padding: 15, gap: 10 }}>
                    <Text style={{ color: Colors.light.text, fontSize: 14, fontWeight: '400' }}>{item.message}</Text>
                    <Box style={{ alignItems: 'flex-end' }}>
                        <Text style={{ color: Colors.light.text, fontSize: 10 }}>{GetFullDate(item.sent)}</Text>

                    </Box>
                </Box>

            </LinearGradient>
        </Box>
    )
}