const assert = require("assert");

const input = 363;

const makeCircularBuffer = (steps, times = 2017) => {
    let buffer = [0];
    let pos = 0;
    
    for (let i = 1; i <= times; i++) {
        pos = (pos + steps) % buffer.length
        buffer = [...buffer.slice(0, pos + 1), i, ...buffer.slice(pos + 1)];
        pos ++;
    }

    return buffer;
}

const findAfterZero = (steps, times = 50000000) => {
    let pos = 0;
    let afterZero = 0;

    for (let i = 1; i <= times; i++) {
        pos = (pos + steps) % i;
        if (pos == 0) {
            afterZero = i;
        }
        pos ++;
    }

    return afterZero;
}

assert(makeCircularBuffer(3, 3).join(" ") == "0 2 3 1");
assert(makeCircularBuffer(3, 9).join(" ") == "0 9 5 7 2 4 3 8 6 1");

const result = makeCircularBuffer(input);
console.log(`First value after 2017: ${result[result.indexOf(2017) + 1]}`)

const result2 = findAfterZero(input);
console.log(`First value after 0: ${result2}`)
