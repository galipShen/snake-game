import * as React from "react";
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "../styles/colors";
import normalize from 'react-native-normalize';
import LottieView from 'lottie-react-native';
import { Animated, Easing } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { StartGameProps } from "../types/types";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function AnimationSplashScreen({ startGame }: StartGameProps): JSX.Element {

    const animationProgress = React.useRef(new Animated.Value(0));

    React.useEffect(() => {
        Animated.timing(animationProgress.current, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, []);

    return (
        <SafeAreaView style={styles.container} >
            <AnimatedLottieView
                progress={animationProgress.current}
                autoPlay
                source={require("../animation/LoadingSnake.json")}
                style={{ width: "100%", height: "100%" }}
            />

            <View style={styles.playGame}>
                <Text style={styles.playGameText} >Start</Text>
                <TouchableOpacity style={styles.playBtn} onPress={startGame}>
                    <MaterialIcons name="play-circle" size={normalize(70)} color={Colors.primary} />
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.splash,
    },
    playGame: {
        top: -200,
        alignItems: "center"
    },
    playGameText: {
        fontSize: normalize(35),
        color: Colors.primary,
        fontWeight: "bold"
    },
    playBtn: {
        justifyContent: "center"

    },
});
