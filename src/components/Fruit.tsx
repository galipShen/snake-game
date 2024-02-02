import { StyleSheet, Text } from "react-native"
import { Coordinate } from "../types/types"

interface FruitProps {
    x: number;
    y: number;
    fruitEmoji: string
}
// 🍐  🥝  🍉 ☢️ 🍓 🍕
export default function Fruit({ x, y, fruitEmoji }: FruitProps,): JSX.Element {
    const fruitMoveStyle = {
        top: y * 10,
        left: x * 10
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