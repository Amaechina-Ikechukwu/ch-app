import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { auth, db } from '../../firebase';
import ChatRender from './ChatRender';

interface ChatData {
    // Define the structure of your chat item
    message: string;
    sender: string;
    // ... other properties
}
interface Chat {
    author: string;
    message: string;
    sent: number;
    // Add any other properties as per your data structure
}
export default function ChatEnvironment({ chatid }: { chatid: string | string[] }) {
    const [chats, setChats] = useState<any>(); // Chats as an array of Chat objects
    const user = auth?.currentUser?.uid;


    useEffect(() => {
        const chatsRef = ref(db, `dms/${chatid}/chats`);
        onValue(chatsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const newdata = Object.entries(data).map(([key, value]: [string, any]) => ({ id: key, ...value }));
                setChats(newdata);
            }
        });
    }, [chatid]);




    return (
        <FlatList
            data={chats} contentContainerStyle={{ gap: 10 }}
            renderItem={({ item }) => (
                <ChatRender item={item} user={user} />
            )}
            keyExtractor={(item, index) => item.id} // Assuming index as the key, adjust as needed
        />
    );
}
