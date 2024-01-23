import * as React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { Colors } from "../styles/colors";
import { PanGestureHandler } from "react-native-gesture-handler";

export default function Game(): JSX.Element {
    const handleGesture = (event: any) => {
        const { translationX, translationY } = event.nativeEvent
        console.log(translationX, translationY)
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
