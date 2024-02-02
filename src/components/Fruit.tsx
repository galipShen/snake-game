import { StyleSheet, Text } from "react-native"
import { FruitProps } from "../types/types"
import normalize from "react-native-normalize";


// 🍐  🥝  🍉 ☢️ 🍓 🍕
export default function Fruit({ x, y, fruitEmoji }: FruitProps,): JSX.Element {
    const fruitMoveStyle = {
        top: y * normalize(10),
        left: x * normalize(10)
    }
    return <Text style={[fruitMoveStyle, styles.fruit]}>{fruitEmoji}</Text>
}
const styles = StyleSheet.create({
    fruit: {
        // aşağıdaki style lar farkettirmedi , muhtemelen text elementi olduğu içindir , 
        // ama absolute neden farketmedi 
        // width: 20,
        // height: 20,
        // borderRadius: 7,
        // position: "absolute"
    }
})