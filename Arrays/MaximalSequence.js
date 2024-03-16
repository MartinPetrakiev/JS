function findMaximalSequenceLength(input) {
    const arrayLength = input.shift();
    let maxLength = 1;
    let currentLength = 1;

    for (let i = 1; i < arrayLength; i++) {
        if (input[i] === input[i - 1]) {
            currentLength++;
            maxLength = Math.max(maxLength, currentLength);
        } else {
            currentLength = 1;
        }
    }

    return maxLength;
}

console.log(findMaximalSequenceLength([
    10,
    1,1,1,2,2,2,2,3,3,4
]))

/*
03. Maximal sequence
Description
Write a program that finds the length of the maximal sequence of equal elements in an array of N integers.

Input
On the first line you will receive the number N
On the next N lines the numbers of the array will be given
Output
Print the length of the maximal sequence
*/