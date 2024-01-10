import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { CustomButton, Text, View } from '../../components/Themed';
import AnimatedStyleUpdateExample from '../../components/Test';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { router } from 'expo-router';
import { useNotification } from '../../components/contexts/Notifications';
import { FontAwesome } from '@expo/vector-icons';
import { GeneralGet } from '../../apis/Get/General';
import DraggableBox from '../../constants/Actions/Drag'
export default function TabOneScreen() {

  const { showNotification } = useNotification()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      <DraggableBox />
      <CustomButton title='Hey' isLoading={false} onPress={() => showNotification("Hello from here")} endIcon={<FontAwesome name="bolt" size={24} color="black" />} />
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
