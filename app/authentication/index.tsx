
import React, { useEffect } from 'react'
import { CustomButton, Text, View } from '../../components/Themed'
import { TextInput, View as Box, useColorScheme } from 'react-native'
import Colors, { secondary } from '../../constants/Colors'
import { AntDesign } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { getAuth, getRedirectResult, signInAnonymously, signInWithCredential } from "firebase/auth";
import { app, auth } from '../../firebase'
import { width } from '../../constants/Dimensions';
import { useNotification } from '../../components/contexts/Notifications';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import { ResponseType, makeRedirectUri } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
WebBrowser.maybeCompleteAuthSession();

export default function SignUp() {
    const uri = makeRedirectUri()
    const color = useColorScheme() ?? 'light'
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId:
            process.env.EXPO_PUBLIC_CLIENT,
    });
    useEffect(() => {

        if (response?.type === "success") {
            const { id_token } = response.params;

            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            // const credential = provider.credential(id_token);
            signInWithCredential(auth, GoogleAuthProvider.credential(id_token)).then((result) => {
                showNotification("Signed In")

            }).catch((error: any) => {

            });
        }
    }, [response])
    const signInWithGoogle = () => {
        showNotification("Signing In")
        const provider = new GoogleAuthProvider()
        getRedirectResult(auth)
            .then((result: any) => {
                // This gives you a Google Access Token. You can use it to access Google APIs.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;

                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
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