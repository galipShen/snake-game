import * as React from "react";
import { StyleSheet, SafeAreaView, Text, View, StatusBar, Button, Modal, TouchableOpacity } from "react-native";
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
import LottieView from 'lottie-react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface GameOverModalProps {
    showGameOverModal: boolean;
    hideGameOver: () => void;
    replay: () => void;
    hideModalAndReplay: () => void

}

export default function GameOverModal({ showGameOverModal, hideGameOver, replay, hideModalAndReplay }: GameOverModalProps): JSX.Element {
    return (
        <Modal visible={showGameOverModal} transparent={true} onRequestClose={hideGameOver} >
            <View style={styles.gameOverModalContainer}>
                <TouchableOpacity onPress={hideGameOver} style={styles.closeBox} >
                    <MaterialIcons name="close" size={normalize(70)} color={Colors.background} />
                </TouchableOpacity>
                <LottieView
                    autoPlay
                    loop
                    source={require("../animation/GameOverAnimation.json")}
                    style={{ width: "100%", height: "40%" }}
                />
                <LottieView
                    autoPlay
                    loop
                    source={require("../animation/SnakeInABottle.json")}
                    style={{ width: "100%", height: "40%" }}
                />
                <View style={styles.homeAndReplayBtn}>
                    <TouchableOpacity onPress={replay} style={styles.replayBox} >
                        <MaterialIcons name="home" size={normalize(70)} color={Colors.background} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={hideModalAndReplay} style={styles.replayBox} >
                        <MaterialIcons name="replay-circle-filled" size={normalize(70)} color={Colors.background} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
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
        // backgroundColor: "red",
        width: "20%",

    },
    replayBox: {
        flex: 0.2,
        alignItems: "flex-start"
    },
    homeAndReplayBtn: {
        // backgroundColor: "red",
        flexDirection: "row",
        justifyContent: "space-around"
    }
});
