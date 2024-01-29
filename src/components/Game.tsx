import * as React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { Colors } from "../styles/colors";
import { PanGestureHandler } from "react-native-gesture-handler";
import { GestureEventType, Direction, Coordinate } from "../types/types";

export default function Game(): JSX.Element {

    const SNAKE_INITIAL_POSITION = [{ x: 0, y: 0 }]; //neden array     
    const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
    const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 63 };
    const MOVE_INTERVAL = 50; //MSEC    
    const SCORE_INCREMENT = 10;

    const [direction, setDirection] = React.useState<Direction>(Direction.Right)
    const [snake, setSnake] = React.useState<Coordinate[]>(SNAKE_INITIAL_POSITION)
    const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION)
    const [isGameOver, setIsGameOver] = React.useState<boolean>(false)
    const [isPaused, setIsPaused] = React.useState<boolean>(false)


    const handleGesture = (event: GestureEventType) => {
        const { translationX, translationY } = event.nativeEvent
        console.log(translationX, translationY)
        if (Math.abs(translationX) > Math.abs(translationY)) {
            if (translationX > 0) {
                //moveright 
                setDirection(Direction.Right)
            } else {
                //moveleft
                setDirection(Direction.Left)
            }
        } else {
            if (translationY > 0) {
                //move down
                setDirection(Direction.Down)

            } else {
                //moveup
                setDirection(Direction.Up)
            }
        }
    }

    return (
        <PanGestureHandler onGestureEvent={handleGesture} >
            <SafeAreaView style={styles.container} ></SafeAreaView>
        </PanGestureHandler>
    )
}
//<SafeAreaView style={styles.container} ></SafeAreaView>
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
});
