const calculo = (maxArray) => {
    let limitArray = 100000000;
    const min = 1;
    const max = 1000;
    let numberArray = [];

    if (maxArray) limitArray = maxArray;

    for (let i = 0; i < limitArray; i++) {
        numberArray = [
            ...numberArray,
            Math.floor(Math.random() * (max - min) + min)
        ];
    }


    const result = numberArray.reduce((obj, n) => {
        if (obj[n]) obj[n]++;
        else obj[n] = 1;
        return obj;
    }, {})

    return result;
}

process.on('message', (msg) => {
    if (msg.message === 'start') {
        const result = calculo(msg.param);
        process.send(result);
    }
});

module.exports = calculo