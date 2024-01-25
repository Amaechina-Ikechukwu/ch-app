import { View, TextInput, useColorScheme, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect } from 'react'
import useStore from './Store/state'
import { useShallow } from 'zustand/react/shallow'
import Colors, { acccent } from './Colors'
import { Keyboard } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { Text } from '../components/Themed'

export default function ChatInput({ text, onChangeText, autofocus = false, sendMessage, chatid }: { text: string | undefined, onChangeText: (text: string | undefined) => void, autofocus?: boolean, sendMessage: () => void, chatid: any }) {
    const color = useColorScheme() ?? 'light'
    const [openInput, setOpenInput, highlightedChat] = useStore(useShallow((state: any) => [state.openInput, state.setOpenInput, state.highlightedChat]),)
    useEffect(() => { }, [highlightedChat[chatid]])
    useEffect(() => { }, [openInput])
    // useEffect(() => { console.log(JSON.stringify(highlightedChat, null, 2)) }, [highlightedChat])
    useEffect(() => {


        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setOpenInput(false);
        });

        return () => {

            keyboardDidHideListener.remove();
        };
    }, []);
    return (
        <View>
            {highlightedChat[chatid] !== undefined ? <View style={{ borderLeftWidth: 5, borderLeftColor: Colors[color].text, height: 40, justifyContent: 'center', paddingHorizontal: 10, borderTopWidth: 0, borderTopColor: Colors[color].text, borderTopRightRadius: 20, borderBottomRightRadius: 10 }}>
                <Text>{highlightedChat[chatid]?.message}</Text>
            </View> : null}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, height: 'auto', width: '90%' }}>



                <TextInput value={text} onChangeText={(text) => onChangeText(text)} autoFocus={openInput} style={{ backgroundColor: Colors[color].tint, padding: 10, borderRadius: 20, width: '100%' }} multiline cursorColor={acccent} />


                <TouchableOpacity onPress={sendMessage}>
                    <Feather name="send" size={30} color={Colors[color].text} />
                </TouchableOpacity>
            </View>
        </View>

    )
}