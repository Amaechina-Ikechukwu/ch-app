import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, router } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import { useShallow } from 'zustand/react/shallow'
import Colors from '../../constants/Colors';
import { GeneralGet } from '../../apis/Get/General';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../firebase';
import useStore from '../../constants/Store/state';
import { ref, onValue, orderByChild, child, query, equalTo, onChildAdded, get } from "firebase/database";
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [setChatList] = useStore(
    useShallow((state: any) => [state.setChatList,]),
  )
  const data = async (user: string) => {
    const result = await GeneralGet('profile/iscomplete', user)

    return result.result
  }
  const chatlist = async (user: string) => {
    const result = await GeneralGet('chats/chatlist', user)

    setChatList(result.result)
  }
  const listenToMyMessages = () => {
    const user = auth?.currentUser?.uid;
    if (user) {
      const dmsRef = ref(db, 'dms/');
      onValue(dmsRef, (snapshot) => {
        const dms = snapshot.val();

        // Check each group for the user
        for (const chatId in dms) {
          const chat = dms[chatId];
          if (Object.prototype.hasOwnProperty.call(chat.members, user)) {
            const starCountRef = ref(db, 'dms/' + chatId + '/chats');
            onValue(starCountRef, (snapshot) => {
              const data = snapshot.val();
              chatlist(user)
            });
          }
        }
      }, (error) => {
        console.error('Error getting data:', error);
      });
    }
  };
  const listenToMyGroupMessages = () => {
    const user = auth?.currentUser?.uid;
    if (user) {
      const groupsRef = ref(db, 'groups/');
      onValue(groupsRef, (snapshot) => {
        const groups = snapshot.val();

        // Check each group for the user
        for (const groupId in groups) {
          const group = groups[groupId];
          if (Object.prototype.hasOwnProperty.call(group.members, user)) {
            const starCountRef = ref(db, 'groups/' + groupId + '/chats');
            onValue(starCountRef, (snapshot) => {
              const data = snapshot.val();
              chatlist(user)
            });
          }
        }
      }, (error) => {
        console.error('Error getting data:', error);
      });
    }
  };




  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user.uid)
        try {
          const isComplete: boolean = await data(user.uid);

          if (isComplete === false) {
            router.push('/authentication/AddInfo')
          } else {
            chatlist(user.uid)
            listenToMyMessages()
            listenToMyGroupMessages()
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle error, if needed
        }
      } else {
        router.push('/authentication/');
      }
    });


    return () => {
      unsubscribe(); // Clean up the subscription on unmount
    };
  }, []);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Highlights',
          tabBarIcon: ({ color }) => <TabBarIcon name="flash" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          tabBarIcon: ({ color }) => <TabBarIcon name="group" color={color} />,

          // headerRight: () => <TabBarIcon name="group" color={'red'} />
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Snaps',
          tabBarIcon: ({ color }) => <TabBarIcon name="th-large" color={color} />,
        }}
      />
    </Tabs>
  );
}
