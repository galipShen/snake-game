export interface GestureEventType {
    nativeEvent: {
        translationX: number;
        translationY: number;
    }
}
export interface Coordinate {
    x: number;
    y: number;
}

/// BUG -  fruit is out of borders , reason can be that , i changed {x,y : Coordinates} ,and recode as FruitProps
export interface FruitProps {
    x: number;
    y: number;
    fruitEmoji: string
}
export interface HeaderProps {
    replay: () => void;
    isPaused: boolean;
    pauseGame: () => void;
    score: number;
    children: JSX.Element;
}

export enum Direction {
    Right,
    Left,
    Up,
    Down
}

