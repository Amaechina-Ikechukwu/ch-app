
import React, { Key, useEffect } from 'react'
import { Text, View } from '../Themed'
import { View as Box, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'

import Colors, { acccent, secondary } from '../../constants/Colors'
import { width } from '../../constants/Dimensions'
import useStore from '../../constants/Store/state'
import { useShallow } from 'zustand/react/shallow'
import Imaging from '../../constants/Imaging'
import MessageDisplayInformation from '../../constants/Actions/MessageDisplayInformation'
import { auth } from '../../firebase'

export default function ChatList() {
    const user = auth?.currentUser?.uid
    const [chatList] = useStore(
        useShallow((state: any) => [state.chatList,]),
    )
    useEffect(() => { }, [chatList])
    const renderItems = ({ item }: any) => {
        return (
            <>
                {item.type == 'dm' && <TouchableOpacity style={{ width: width, }}>
                    <Box style={{ flexDirection: 'row', width: width, gap: 10, alignItems: 'center', }}>
                        <Imaging name={item.userData.nickname} />
                        <Box style={{ gap: 5 }}>
                            <Text style={{ fontWeight: "500", fontSize: 16 }}>{item.userData.nickname}</Text>
                            <MessageDisplayInformation author={item.lastMessage.author == user ? "You" : item.userData.nickname.split(' ')[0]} sent={item.lastMessage.sent} message={item.lastMessage.message} />
                        </Box>
                    </Box>
                </TouchableOpacity>}
                {item.type == 'group' && <TouchableOpacity style={{ width: width, }}>
                    <Box style={{ flexDirection: 'row', width: width, gap: 10, alignItems: 'center', }}>
                        <Imaging name={item.groupname} />
                        <Box style={{ gap: 5 }}>
                            <Text style={{ fontWeight: "500", fontSize: 16 }}>{item.groupname}</Text>
                            <MessageDisplayInformation author={item.lastMessage.authorData.nickname.split(" ")[0]} sent={item.lastMessage.sent} message={item.lastMessage.message} />

                        </Box>
                    </Box>
                </TouchableOpacity>}
            </>
        )
    }
    return (



        <FlatList data={chatList} renderItem={renderItems} keyExtractor={(item, index) => index.toString()} contentContainerStyle={{ gap: 20, width: width * 0.97, padding: 10 }} />



    )
}