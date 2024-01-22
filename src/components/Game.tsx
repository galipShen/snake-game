import * as React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { Colors } from "../styles/colors";

export default function Game(): JSX.Element {
    return <SafeAreaView style={styles.container}></SafeAreaView>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
});
