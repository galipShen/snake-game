import { Coordinate } from "../types/types";
export const checkEatsFruit = (head: Coordinate, fruit: Coordinate, area: number): boolean => {
    const distanceFruitAndSnakeX: number = Math.abs(head.x - fruit.x)
    const distanceFruitAndSnakeY: number = Math.abs(head.y - fruit.y)

    return (distanceFruitAndSnakeX < area && distanceFruitAndSnakeY < area)

}