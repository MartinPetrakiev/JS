function permutationsOfSet(N) {
    const numbers = new Array(N).fill(0).map((element, index) => element = index + 1);

    generatePermutations(numbers, 0, N - 1)
}

function generatePermutations(array, start, end) {
    if (start === end) {
        console.log(`{${array.slice().join(', ')}}`)
    } else {
        for (let i = start; i <= end; i++) {
            [array[start], array[i]] = [array[i], array[start]];

            generatePermutations(array, start + 1, end);

            [array[start], array[i]] = [array[i], array[start]];
        }
    }
}

permutationsOfSet(3);

/*
09. Permutations of set
Description
Write a program that reads a number N and generates and prints all the permutations of the numbers [1 … N].

Sample tests
N	result
3	{1, 2, 3}
{1, 3, 2}
{2, 1, 3}
{2, 3, 1}
{3, 1, 2}
{3, 2, 1}
*/