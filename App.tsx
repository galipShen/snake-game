import "react-native-gesture-handler"
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Game from "./src/components/Game";
import { useState, useEffect, useCallback } from "react";
import AnimationSplashScreen from "./src/components/AnimationSplashScreen";


const App = () => {
    const [appIsReady, setAppIsReady] = useState<boolean>(false);

    useEffect(() => {
        setAppIsReady(appIsReady)
    }, [appIsReady])

    const startGame = async () => {
        setAppIsReady(true)
    }

    if (!appIsReady) {
        return <AnimationSplashScreen startGame={startGame} />
    }

    return (
        <GestureHandlerRootView
            style={{ flex: 1 }}
        >
            <Game />
        </GestureHandlerRootView>)
}
export default App;
