import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from "../styles/colors";


interface HeaderProps {
    replay: () => void;
    isPaused: boolean;
    pauseGame: () => void;
    score: number;
}

export default function Header({ replay, isPaused, score, pauseGame }: HeaderProps): JSX.Element {
    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={replay} >
                <MaterialIcons name="replay-circle-filled" size={24} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={pauseGame}
            >
                <FontAwesome5
                    name={isPaused ? "play-circle" : "pause-circle"}
                    size={24} color={Colors.primary} />
            </TouchableOpacity>
            <Text style={styles.scoreText} >{score}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.1,
        flexDirection: "row",
        backgroundColor: Colors.background,
        justifyContent: "space-between",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginHorizontal: 12,
        alignItems: "center",
        marginTop: 20,
        paddingHorizontal: 20,
    },
    scoreText: {
        fontSize: 25
    }

})