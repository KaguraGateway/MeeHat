/**
 * min以上max未満なランダムな数を返す
 */
 function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

/**
 * min以上max未満のランダムな整数を返す
 * @return int
 */
function getRandomInt(min: number, max: number) {
    return Math.floor(getRandomArbitrary(min, max));
}

/**
 * 0~9の任意の桁数の整数を返す
 * @return int
 */
function getRandomArbitraryDigitInt(digit: number) {
    var min = 1 * Math.pow(10, (digit - 1));
    var max: string | number = "9";

    for(var x0f0=1; x0f0 < digit; x0f0=(x0f0+1)|0) {
        max += "9";
    }
    max = Number(max);

    return getRandomInt(min, max);
};

/**
 * 任意の桁数の文字列を返す（-_は含まない）
 */
function generateString(digit: number) {
    for(var t = "", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", o = 0; o < digit; o=(o+1)|0) {
        t += n.charAt(getRandomInt(0, n.length));
    }
    return t;
};

export const randomUtils = {
    getRandomArbitrary,
    getRandomInt,
    getRandomArbitraryDigitInt,
    generateString
};