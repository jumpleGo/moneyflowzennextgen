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

export const getNumberWithWordEnding = (number: number, wordForms: [string, string, string], withNumber = true): string => {
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return `${withNumber ? number : ''} ${wordForms[2]}`; // 11-14 всегда множественное родительное
    }

    switch (lastDigit) {
        case 1:
            return `${withNumber ? number : ''} ${wordForms[0]}`; // единственное число
        case 2:
        case 3:
        case 4:
            return `${withNumber ? number : ''} ${wordForms[1]}`; // множественное число (2,3,4)
        default:
            return `${withNumber ? number : ''} ${wordForms[2]}`; // множественное родительное (5-9, 0)
    }
}
