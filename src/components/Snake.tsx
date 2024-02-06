import { Fragment, JSXElementConstructor } from "react"
import { Coordinate } from "../types/types"
import { View, StyleSheet, Text } from "react-native"
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
                return <View key={index} style={[styles.snake, segmentStyle]} >
                    <Text style={styles.text}>||&%&½&#$#$#$#|&%$#ß*5*5*5*5*5567567567567567
                    </Text>
                </View>
            })}

        </Fragment>
    )
}

const styles = StyleSheet.create({
    snake: {
        width: normalize(15),  //15
        height: normalize(15),
        backgroundColor: Colors.primary,
        borderRadius: normalize(7),
        position: "absolute",
    },
    text: {
        fontWeight: "900",
        fontSize: 3,
    }

})