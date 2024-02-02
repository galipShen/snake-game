import { Fragment, JSXElementConstructor } from "react"
import { Coordinate } from "../types/types"
import { View, StyleSheet } from "react-native"
import { Colors } from "../styles/colors"
import normalize from "react-native-normalize";

interface SnakeProps {
    snake: Coordinate[];
}

export default function Snake({ snake }: SnakeProps): JSX.Element {


    return (
        <Fragment>
            {snake.map((segment: Coordinate, index: number) => {
                const segmentStyle = {
                    left: segment.x * normalize(10),
                    top: segment.y * normalize(10)
                };
                return <View key={index} style={[styles.snake, segmentStyle]} />
            })}

        </Fragment>
    )
}

const styles = StyleSheet.create({
    snake: {
        width: normalize(15),
        height: normalize(15),
        backgroundColor: Colors.primary,
        borderRadius: normalize(7),
        position: "absolute"
    }
})