const fruits = ["🍐", "🥝", "🍉", "☢️", "🍓", "🍕", "🍎", "🍍", "🍏",]

export const getRandomFruitEmoji = (): any => {
    const fruitIndex = Math.floor(Math.random() * fruits.length)
    return fruits[fruitIndex]
}
