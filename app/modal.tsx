import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { CustomButton, Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { router } from 'expo-router';
import { useNotification } from '../components/contexts/Notifications';

export default function ModalScreen() {
  const { showNotification } = useNotification()
  const signin = () => {
    signOut(auth)
      .then((result: any) => {
        console.log({ result })
        router.push('/authentication')
      })
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        console.log(error)
        showNotification("Signed Out")
      });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>

      <CustomButton title='Logout' onPress={signin} style={{ width: '90%', marginTop: 30 }} endIcon={<AntDesign name="arrowright" size={20} color={Colors.light.secondary} style={{ marginTop: 5 }} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
