import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import Colors from "../../constants/Colors";
import * as Google from "expo-auth-session/providers/google";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../firebase";
import { CustomButton } from "../../components/Themed";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useNotification } from "../../components/contexts/Notifications";

WebBrowser.maybeCompleteAuthSession();

const GoogleSignIn = () => {
  const { showNotification } = useNotification();
  useEffect(() => {
    Linking.addEventListener("url", handleDeepLink);
    return () => {};
    // Cleanup function to remove the event listener when the component unmounts
  }, []); // Empty dependency array ensures the effect only runs once during mount

  // ... Your imports and component definition ...
  const handleDeepLink = async (event: any) => {
    const accessParam = "access_token=";
    const idParam = "id_token=";
    const code = "code=";
    if (event.url.includes(accessParam) && event.url.includes(idParam)) {
      const access_token = event.url.split(accessParam)[1].split("&")[0];
      const id_token = event.url.split(idParam)[1].split("&")[0];
      const codeId = event.url.split(code)[1];
      // Now 'access_token', 'id_token', and 'codeId' contain the extracted values

      await connectToFirebase(id_token);
      return;
      // Close the in-app browser
      // Note: WebBrowser.dismissBrowser(); may not work in some cases
    }
  };
  const connectToFirebase = async (id_token: string) => {
    try {
      const credential = GoogleAuthProvider.credential(id_token);
      const result = await signInWithCredential(auth, credential);
      const user = { uid: result.user.uid };

      showNotification("Signed In");
      router.push("/authentication/AddInfo");
      return;
    } catch {
      showNotification("Error Signing In");
    }
  };
  const appurl = Linking.createURL("");
  const handleLogin = async () => {
    showNotification("Redirecting");
    const authEndpoint =
      process.env.EXPO_PUBLIC_DEV_URL +
      "/profile/auth/google?redirectUri=" +
      appurl;
    WebBrowser.openAuthSessionAsync(authEndpoint);
  };
  //   const loginToLioServer = async (userInfo: any) => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.EXPO_PUBLIC_DEV_URL}/registeruser` || "",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(userInfo),
  //         }
  //       );

  //       // Log the response text
  //       const responseData = await response.json(); // Parse JSON

  //       //   await authProvider.signIn(responseData?.token);
  //       //   // router.push("/(home)/");

  //       return;
  //     } catch (error) {
  //       throw new Error("Error");
  //     }
  //   };

  return (
    <SafeAreaView>
      <CustomButton title="Sign In with Google" onPress={() => handleLogin()} />
    </SafeAreaView>
  );
};

export default GoogleSignIn;
