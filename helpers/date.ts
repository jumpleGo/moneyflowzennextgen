export const getNoun = (number, one, two, five) => {
    let wordUnitFive = ''
    let wordUnitTwo = ''
    switch (one) {
        case 'день':
            wordUnitFive = five[0]
            wordUnitTwo = two[0]
        break
        case 'час':
            wordUnitFive = five[1]
            wordUnitTwo = two[1]
            break
        case 'минута':
            wordUnitFive = five[2]
            wordUnitTwo = two[2]
            break
    }
    let n = Math.abs(number) % 100;
    if (n >= 5 && n <= 20) {
        return wordUnitFive;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return wordUnitTwo;
    }
    return wordUnitFive;
}