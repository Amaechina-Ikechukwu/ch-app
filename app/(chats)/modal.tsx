import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import OtherUserProfile from '../../components/Profile/Profile';
import { Stack } from 'expo-router';

export default function ModalScreen() {

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        headerShown: false,

      }} />
      <OtherUserProfile />
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
