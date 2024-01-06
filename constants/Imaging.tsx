import { Text } from "../components/Themed"
import { View as Box } from "react-native"
import { secondary } from "./Colors"
const Imaging = ({ name }: { name: string }) => {
    return (<Box style={{ width: 50, height: 50, backgroundColor: secondary, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }} >
        <Text style={{ fontSize: 20, fontWeight: "600" }}>{name.slice(0, 2).toLocaleUpperCase()}</Text>
    </Box>)
}
export default Imaging