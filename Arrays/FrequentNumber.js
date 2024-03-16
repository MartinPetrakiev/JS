function frequentNumber(array) {
    let uniqueNumbers = new Set(array);
    let uniqueNumbersFrequencies = Object.assign(...Array.from(uniqueNumbers, num => ({ [num]: 1 })));

    for (let i = 0; i < array.length; i++) {
        uniqueNumbersFrequencies[array[i]]++;
    }

    let maxCount = 1;
    let mostFrequentNumber = array[0];
    for (const [key, value] of Object.entries(uniqueNumbersFrequencies)) {
        if (value > maxCount) {
            maxCount = value;
            mostFrequentNumber = Number(key);
        }
    }

    return `${mostFrequentNumber} (${maxCount})`;
}

console.log(frequentNumber([1, 2, 3, 4, 4, 4, 5, 6, 7, 7, 7, 7, 6, 8, 9, 10, 4, 4]))

/*
Description
Write a program that finds the most frequent number in an array of N elements.

Input
On the first line you will receive the number N
On the next N lines the numbers of the array will be given
Output
Print the most frequent number and how many time it is repeated
Output should be REPEATING_NUMBER (REPEATED_TIMES times)
*/