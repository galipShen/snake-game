import { StyleSheet, Text } from "react-native"
import { Coordinate } from "../types/types"

export default function Fruit({ x, y }: Coordinate): JSX.Element {

    const fruitMoveStyle = {
        top: y * 10,
        left: x * 10
    }
    return <Text style={[fruitMoveStyle, styles.fruit]}>&#127822;</Text>
}
const styles = StyleSheet.create({
    fruit: {
        width: 20,
        height: 20,
    }
})