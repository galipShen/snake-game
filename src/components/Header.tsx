import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from "../styles/colors";


interface HeaderProps {

}

export default function Header({ }: HeaderProps): JSX.Element {
    return (
        <View style={styles.container} >
            <TouchableOpacity>
                <MaterialIcons name="replay-circle-filled" size={24} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity>
                <FontAwesome5
                    name="play-circle"
                    //play-circle
                    //yukarısi bool ile isPaused state i ile deişecek

                    size={24} color={Colors.primary} />


            </TouchableOpacity>
            {/* score prop olarak game içinden geelcek */}
            <Text style={styles.scoreText} >score</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.1,
        flexDirection: "row",
        backgroundColor: Colors.background,
        justifyContent: "space-between",
        borderBottomWidth: 20,
        borderBottomColor: Colors.primary,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginHorizontal: 20,
        alignItems: "center",
        marginTop: 20,
        paddingHorizontal: 20
    },
    scoreText: {
        fontSize: 25
    }

})