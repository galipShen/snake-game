import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from "../styles/colors";
import { HeaderProps } from "../types/types";
import normalize from "react-native-normalize";

export default function Header({ replay, isPaused, score, pauseGame }: HeaderProps): JSX.Element {
    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={replay} style={styles.replayBox} >
                <MaterialIcons name="replay-circle-filled" size={normalize(35)} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={pauseGame}
                style={styles.playBox}
            >
                <FontAwesome5
                    name={isPaused ? "play-circle" : "pause-circle"}
                    size={normalize(35)} color={Colors.primary} />
            </TouchableOpacity>
            <View style={styles.scoreBox}>
                <Text style={styles.scoreText} >{score}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.1,
        flexDirection: "row",
        backgroundColor: Colors.background,
        justifyContent: "space-between",
        borderTopLeftRadius: normalize(20),
        borderTopRightRadius: normalize(20),
        marginHorizontal: normalize(12),
        alignItems: "center",
        marginTop: normalize(20),
        paddingHorizontal: normalize(20),
    },
    replayBox: {
        flex: 0.2,
        alignItems: "flex-start"
    },
    playBox: {
        flex: 0.2,
        alignItems: "center"
    },
    scoreBox: {
        flex: 0.2,
        alignItems: "flex-end"
    },
    scoreText: {
        fontSize: normalize(32),
        color: Colors.primary,
        fontWeight: "bold",
    }

})