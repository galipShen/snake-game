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
}

export enum Direction {
    Right,
    Left,
    Up,
    Down
}

