function findMaximalSequenceLength(input) {
    if (input.length === 0) {
        return 0;
    }

    let result = 1;
    const subSequences = new Array(input.length).fill(1);

    for (let i = 1; i < input.length; i++) {
        subSequences[i] = Math.max(
            1, ...subSequences.slice(0, i)
                .map((item, j) => {
                    return input[i] > input[j] ? item + 1 : 0
                })
        );

        result = Math.max(subSequences[i], result);
    }

    return result;
}

console.log(findMaximalSequenceLength([
    0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15
]))

/*
04. Maximal increasing sequence
Description
Write a program that finds the length of the maximal increasing sequence in an array of N integers.

Input
On the first line you will receive the number N
On the next N lines the numbers of the array will be given
Output
Print the length of the maximal increasing sequence

*/
