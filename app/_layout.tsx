import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts, Kodchasan_200ExtraLight, Kodchasan_200ExtraLight_Italic, Kodchasan_300Light, Kodchasan_300Light_Italic, Kodchasan_400Regular, Kodchasan_400Regular_Italic, Kodchasan_500Medium, Kodchasan_500Medium_Italic, Kodchasan_600SemiBold, Kodchasan_600SemiBold_Italic, Kodchasan_700Bold, Kodchasan_700Bold_Italic, } from '@expo-google-fonts/kodchasan';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { NotificationProvider } from '../components/contexts/Notifications';
import { UserProvider, useUser } from '../components/contexts/User';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  let [fontsLoaded, fontError] = useFonts({
    Kodchasan_200ExtraLight, Kodchasan_200ExtraLight_Italic, Kodchasan_300Light, Kodchasan_300Light_Italic, Kodchasan_400Regular, Kodchasan_400Regular_Italic, Kodchasan_500Medium, Kodchasan_500Medium_Italic, Kodchasan_600SemiBold, Kodchasan_600SemiBold_Italic, Kodchasan_700Bold, Kodchasan_700Bold_Italic,
  });


  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.




  return <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <NotificationProvider>
      <UserProvider>
        <RootLayoutNav />
      </UserProvider>
    </NotificationProvider>
  </ThemeProvider >;
}

function RootLayoutNav() {
  const { setUser } = useUser()
  const [isSignedIn, setIsSignedIn] = useState(Boolean)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      SplashScreen.hideAsync();
      if (user) {
        setIsSignedIn(true);
        const uid = user.uid;
        setUser((prev: any) => ({ ...prev, uid })); // Update user context with UID
      } else {
        setIsSignedIn(false);
      }
    });

    return () => {
      unsubscribe(); // Clean up the subscription on unmount
    };
  }, [setUser]); // Include setUser as a dependency since it's used in the effect

  useEffect(() => {

  }, [isSignedIn])

  return (


    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="authentication" options={{ headerShown: false }} />
      <Stack.Screen name="(chats)" options={{ headerShown: false }} />
      <Stack.Screen name="(groups)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
