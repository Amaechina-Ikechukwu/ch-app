import { Text } from "../components/Themed"
import { View as Box } from "react-native"
import Colors, { secondary } from "./Colors"
const Imaging = ({ name, h, w, tx }: { name: string, h?: number, w?: number, tx?: number }) => {
    return (<Box style={{ width: w || 50, height: h || 50, backgroundColor: secondary, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }} >
        <Text style={{ fontSize: tx || 20, fontWeight: "600", color: Colors.light.text }}>{name.slice(0, 2).toLocaleUpperCase()}</Text>
    </Box >)
}
export default Imaging