import * as React from "react";
import { StyleSheet, SafeAreaView, Text, View, StatusBar } from "react-native";
import { Colors } from "../styles/colors";
import { PanGestureHandler } from "react-native-gesture-handler";
import { GestureEventType, Direction, Coordinate } from "../types/types";
import Snake from "./Snake";
import { checkGameOver } from "../utils/checkGameOver";
import { checkEatsFruit } from "../utils/checkEatsFruit";
import Fruit from "./Fruit";
import { randomFruitPosition } from "../utils/randomFruitPosition";
import Header from "./Header";

export default function Game(): JSX.Element {

    const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
    const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
    const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 63 };
    const MOVE_INTERVAL = 50; //MSEC
    const SCORE_INCREMENT = 10;

    const [direction, setDirection] = React.useState<Direction>(Direction.Right)
    const [snake, setSnake] = React.useState<Coordinate[]>(
        SNAKE_INITIAL_POSITION
    )
    const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION)
    const [isGameOver, setIsGameOver] = React.useState<boolean>(false)
    const [isPaused, setIsPaused] = React.useState<boolean>(false)
    const [score, setScore] = React.useState<number>(0)

    React.useEffect(() => {
        if (!isGameOver) {
            const intervalId = setInterval(() => {
                !isPaused && moveSnake()
            }, MOVE_INTERVAL)
            return () => clearInterval(intervalId)   /// buraya bak çlışma mantığına 
        }
    }, [isGameOver, isPaused, snake])

    const moveSnake = () => {
        const snakeHead = snake[0];  // buradaki 0 ilk arr mi , yada her iki x ve y ye 0 vermek mi , hayır ama sor 
        const newHead = { ...snakeHead }
        // game over func
        if (checkGameOver(snakeHead, GAME_BOUNDS)) {
            setIsGameOver((prev) => !prev)     //setIsGameOver(true) neden böyle kullanmadık
            // bence önceki state i bilmezsek ve ona göre çalışmazsa sorun çıkar, bi önceki duruma göre devem etmiş olmayız

            return   /// return to prevent keep continue
        }
        switch (direction) {
            case Direction.Up:
                newHead.y -= 1
                break;
            case Direction.Down:
                newHead.y += 1
                break;
            case Direction.Right:
                newHead.x += 1
                break;
            case Direction.Left:
                newHead.x -= 1
                break;
            default:
                break;
        }
        if (checkEatsFruit(newHead, food, 2)) {
            setFood(randomFruitPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax)) //BUG-iki defa çalışıyor, tek görünmeli , 
            setSnake([newHead, ...snake])  // neden newHead //BUG- yılan x ve y ekseninde tersine dönmemeli  kendi içinden geçermiş gibi görünüyor
            setScore(score + SCORE_INCREMENT)
        } else {
            setSnake([newHead, ...snake.slice(0, -1)])
        }
    }


    const handleGesture = (event: GestureEventType) => {
        const { translationX, translationY } = event.nativeEvent
        // console.log(translationX, translationY)
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
            <SafeAreaView style={styles.container} >
                <StatusBar barStyle={"dark-content"} backgroundColor={"transparent"} />
                <Header>

                </Header>
                <View style={styles.boundaries}>

                    <Snake snake={snake} />
                    <Fruit x={food.x} y={food.y} />
                </View>
            </SafeAreaView>
        </PanGestureHandler>
    )
}
//<SafeAreaView style={styles.container} ></SafeAreaView>
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    boundaries: {
        flex: 1,
        borderColor: Colors.primary,
        borderWidth: 12,
        backgroundColor: Colors.background,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderTopWidth: 10,
    }
});
