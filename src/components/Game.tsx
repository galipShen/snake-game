import * as React from "react";
import { StyleSheet, SafeAreaView, Text, View, StatusBar, ImageBackground, Button, Modal, TouchableOpacity, Pressable } from "react-native";
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
import normalize, { SCREEN_HEIGHT, SCREEN_WIDTH } from 'react-native-normalize';
import GameOverModal from "./GameOverModal";

export default function Game(): JSX.Element {
    //test
    const SNAKE_INITIAL_POSITION = [{ x: normalize(5), y: normalize(5) }];
    const FOOD_INITIAL_POSITION = { x: normalize(5), y: normalize(20) };
    const GAME_BOUNDS = { xMin: 0, xMax: SCREEN_WIDTH, yMin: 0, yMax: SCREEN_HEIGHT };
    const MOVE_INTERVAL = 50;
    const SCORE_INCREMENT = 10;
    const FIRST_FRUIT = "🍎"
    const HEARTS_INITIAL = ["💓", "💓", "💓"]

    const [direction, setDirection] = React.useState<Direction>(Direction.Right)
    const [snake, setSnake] = React.useState<Coordinate[]>(
        SNAKE_INITIAL_POSITION
    )
    const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION)
    const [fruitEmoji, setFruitEmoji] = React.useState<string>(FIRST_FRUIT)
    const [isGameOver, setIsGameOver] = React.useState<boolean>(false)
    const [isPaused, setIsPaused] = React.useState<boolean>(false)
    const [score, setScore] = React.useState<number>(0)
    const [hearts, setHearts] = React.useState<string[]>(HEARTS_INITIAL)
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
    }, [isGameOver, isPaused, snake, fruitEmoji, hearts])


    const moveSnake = () => {
        const snakeHead = snake[0];
        const newHead = { ...snakeHead }
        if (checkGameOver(snakeHead, GAME_BOUNDS)) {
            setIsGameOver((prev) => !prev)
            substractHeart()
            if (hearts.length !== 0) {
                setTimeout(() => replay(), 1000)
            } else { showGameOver() }
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
    const hideModalAndReplay = () => {
        hideGameOver()
        replay()
        setHearts(HEARTS_INITIAL)
    }
    const substractHeart = () => {
        const heartsDiminished = hearts.shift()
    }

    return (
        <PanGestureHandler onGestureEvent={handleGesture} >
            <SafeAreaView style={styles.container} >
                <StatusBar barStyle={"light-content"} backgroundColor={Colors.primary} />
                <Header replay={replay} isPaused={isPaused} score={score} pauseGame={pauseGame}>
                    <View style={styles.heartsContainer}>
                        {hearts.map((item, index) => (<Text key={index} style={styles.heartStyle}>{item}</Text>))}
                    </View>
                </Header>
                <View style={styles.boundaries}>
                    <ImageBackground source={require("../images/snake.jpg")} resizeMode="cover" style={styles.image}>
                        <Snake snake={snake} />
                        <Fruit x={food.x} y={food.y} fruitEmoji={fruitEmoji} />
                        <GameOverModal showGameOverModal={showGameOverModal} hideGameOver={hideGameOver} replay={replay} hideModalAndReplay={hideModalAndReplay} />
                    </ImageBackground>
                </View>
            </SafeAreaView >
        </PanGestureHandler >
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
        backgroundColor: "#365314DD",
        flex: 1,
    },
    closeBox: {
        alignItems: "flex-end",
        width: "20%",
    },
    replayBox: {
        flex: 0.2,
        alignItems: "flex-start"
    },
    homeAndReplayBtn: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    heartsContainer: {
        flexDirection: "row",
        width: "40%",
    },
    heartStyle: {
        fontSize: normalize(35),
        marginBottom: 5
    },
    image: {
        flex: 1,
        justifyContent: 'center',

    }
});
