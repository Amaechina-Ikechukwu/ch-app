import { View as Box } from 'react-native'
import React, { useEffect } from 'react'
import { Text, View } from '../Themed'
import useStore from '../../constants/Store/state'
import { useShallow } from 'zustand/react/shallow'
import Imaging from '../../constants/Imaging'
import { GeneralPost } from '../../apis/Post/General'
import { auth } from '../../firebase'

export default function OtherUserProfile() {
    const user = auth?.currentUser?.uid
    const [chattingWith, setChattingWith] = useStore(useShallow((state: any) => ([state.chattingWith, state.setChattingWith])))
    const getUserProfile = async () => {
        const { result } = await GeneralPost('profile/user', user, { user: chattingWith?.uid })
        const data = { ...result, uid: chattingWith.uid }
        setChattingWith(data)
    }
    useEffect(() => { getUserProfile() }, [])
    return (
        <View>
            <Box style={{ alignItems: 'center', gap: 10 }}>
                <Imaging w={200} h={200} tx={50} name={chattingWith.nickname} />
                <Text style={{ fontSize: 30, fontWeight: "500" }}>{chattingWith.nickname}</Text>
                <Box style={{ alignItems: 'center', gap: 5 }}>
                    <Text style={{ fontSize: 18, fontWeight: "300" }}>{chattingWith?.camp?.address}</Text>
                    <Text style={{ fontSize: 18, fontWeight: "300" }}>{chattingWith?.camp && chattingWith?.camp?.state + " " + "State"}</Text>
                </Box>
            </Box>
        </View>
    )
}