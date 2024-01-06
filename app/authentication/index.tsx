
import React from 'react'
import { CustomButton, Text, View } from '../../components/Themed'
import { TextInput, View as Box, useColorScheme } from 'react-native'
import Colors, { secondary } from '../../constants/Colors'
import { AntDesign } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { getAuth, signInAnonymously } from "firebase/auth";
import { app, auth } from '../../firebase'
import { width } from '../../constants/Dimensions';
import { useNotification } from '../../components/contexts/Notifications';
export default function SignUp() {
    const color = useColorScheme() ?? 'light'

    const { showNotification } = useNotification()

    const signin = () => {
        showNotification("Signing In")
        signInAnonymously(auth)
            .then((result: any) => {
                showNotification("Signed In")
                router.push('/authentication/AddInfo')
            })
            .catch((error: any) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
                console.log(error)
                showNotification("Can not sign up at the moment")
            });
    }

    return (
        <View style={{ gap: 10 }} >
            <Text style={{ color: secondary, fontSize: 40, fontWeight: "600" }}>Sign Up Anonymously</Text>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>Step One</Text>

            <View style={{ position: 'absolute', bottom: 10, gap: 10, width: '100%', alignItems: 'center', justifyContent: 'center' }}>

                <CustomButton onPress={() => signin()} title='Continue' style={{ width: width * 0.8, marginTop: 30 }} endIcon={<AntDesign name="arrowright" size={20} color={Colors.light.text} style={{ marginTop: 5 }} />} />
                <Text style={{ fontSize: 14, lineHeight: 20, textAlign: 'center' }}>You will just be connected to other users, to use the app in multiple devices, go to profile and complete sign up.</Text>
            </View>

        </View>
    )
}