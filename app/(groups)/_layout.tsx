import { Stack } from 'expo-router';
import Imaging from '../../constants/Imaging';
import { Text } from '../../components/Themed';
import { View as Box } from 'react-native'
import useStore from '../../constants/Store/state';
import { useShallow } from 'zustand/react/shallow';
const HeaderComp = ({ item }: { item: any }) => {
    return (<Box style={{ flexDirection: 'row', gap: 10, alignItems: 'center', }}>
        <Imaging name={item.nickname} />
        <Box style={{ gap: 5 }}>
            <Text style={{ fontWeight: "500", fontSize: 16 }}>{item.nickname}</Text>

        </Box>
    </Box>)
}
export default function ChatLayout() {
    const [chattingWith] = useStore(useShallow((state: any) => [state.chattingWith]))
    return (
        <Stack screenOptions={{
            headerTitle: "bold",
        }} />
    )
}
