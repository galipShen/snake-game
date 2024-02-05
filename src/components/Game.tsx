import * as React from "react";
import { StyleSheet, SafeAreaView, Text, View, StatusBar, Button, Modal } from "react-native";
import { Colors } from "../styles/colors";
import { PanGestureHandler } from "react-native-gesture-handler";
import { GestureEventType, Direction, Coordinate } from "../types/types";
import Snake from "./Snake";
import { checkGameOver } from "../utils/checkGameOver";
import { checkEatsFruit } from "../utils/checkEatsFruit";
import Fruit from "./Fruit";
import { randomFruitPosition } from "../utils/randomFruitPosition";
import Header from "./Header";
import { getRandomFruitEmoji } from "../utils/randomFruitEmoji";
import normalize from 'react-native-normalize';

export default function Game(): JSX.Element {

    const SNAKE_INITIAL_POSITION = [{ x: normalize(5), y: normalize(5) }];
    const FOOD_INITIAL_POSITION = { x: normalize(5), y: normalize(20) };
    const GAME_BOUNDS = { xMin: 0, xMax: normalize(39), yMin: 0, yMax: normalize(72) };
    const MOVE_INTERVAL = 50;
    const SCORE_INCREMENT = 10;
    const FIRST_FRUIT = "🍎"

    const [direction, setDirection] = React.useState<Direction>(Direction.Right)
    const [snake, setSnake] = React.useState<Coordinate[]>(
        SNAKE_INITIAL_POSITION
    )
    const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION)
    const [fruitEmoji, setFruitEmoji] = React.useState<string>(FIRST_FRUIT)
    const [isGameOver, setIsGameOver] = React.useState<boolean>(false)
    const [isPaused, setIsPaused] = React.useState<boolean>(false)
    const [score, setScore] = React.useState<number>(0)
    //modal
    const [showGameOverModal, setShowGameOverModal] = React.useState<boolean>(false)
    const showGameOver = () => { setShowGameOverModal(true) }
    const hideGameOver = () => { setShowGameOverModal(false) }

    React.useEffect(() => {
        if (!isGameOver) {
            const intervalId = setInterval(() => {
                !isPaused && moveSnake()
            }, MOVE_INTERVAL)
            return () => clearInterval(intervalId)
        }
    }, [isGameOver, isPaused, snake, fruitEmoji])

    const moveSnake = () => {
        const snakeHead = snake[0];
        const newHead = { ...snakeHead }
        if (checkGameOver(snakeHead, GAME_BOUNDS)) {
            setIsGameOver((prev) => !prev)
            showGameOver()
            return
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
        if (checkEatsFruit(newHead, food, 3)) {
            setFruitEmoji(getRandomFruitEmoji())
            setFood(randomFruitPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax))
            setSnake([newHead, ...snake])
            // BUG- yılan x ve y ekseninde tersine dönmemeli  kendi içinden geçermiş gibi görünüyor
            setScore(score + SCORE_INCREMENT)

        } else {
            setSnake([newHead, ...snake.slice(0, -1)])
        }
    }

    const handleGesture = (event: GestureEventType) => {
        const { translationX, translationY } = event.nativeEvent
        if (Math.abs(translationX) > Math.abs(translationY)) {
            if (translationX > 0) {
                setDirection(Direction.Right)
            } else {
                setDirection(Direction.Left)
            }
        } else {
            if (translationY > 0) {
                setDirection(Direction.Down)
            } else {
                setDirection(Direction.Up)
            }
        }
    }
    const replay = () => {
        setSnake(SNAKE_INITIAL_POSITION)
        setFood(FOOD_INITIAL_POSITION)
        setIsGameOver(false)
        setScore(0)
        setDirection(Direction.Right)
        setIsPaused(false)
    }
    const pauseGame = () => {
        setIsPaused(prev => !prev)
    }
    // console.log("---EATED--", snake)
    return (
        <PanGestureHandler onGestureEvent={handleGesture} >
            <SafeAreaView style={styles.container} >
                <StatusBar barStyle={"light-content"} backgroundColor={Colors.primary} />
                <Header replay={replay} isPaused={isPaused} score={score} pauseGame={pauseGame}>
                </Header>
                <View style={styles.boundaries}>
                    <Button title="Show Modal" onPress={showGameOver} />
                    <Snake snake={snake} />
                    <Fruit x={food.x} y={food.y} fruitEmoji={fruitEmoji} />
                    {/* show modal in boundaries  */}
                    <Modal visible={showGameOverModal} transparent={true}  >
                        <View style={styles.gameOverModalContainer}>
                            <Text>Game Over MODAL</Text>
                            <Button title="Close" onPress={hideGameOver} />
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
        </PanGestureHandler>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    boundaries: {
        flex: 1,
        borderColor: Colors.primary,
        borderWidth: normalize(12),
        backgroundColor: Colors.background,
        borderBottomLeftRadius: normalize(30),
        borderBottomRightRadius: normalize(30),

    },
    gameOverModalContainer: {
        backgroundColor: "#36531499",
        flex: 1,
    }
});
