function findSumInArray(inputArray, S) {
    let currentArray = inputArray;
    let startIterator = 0;
    let currentPosition = 0;
    let searchedSequence = [];
    let currentSum = 0;
    while (currentPosition < currentArray.length) {
        currentSum += currentArray[currentPosition];
        searchedSequence.push(currentArray[currentPosition]);

        if (currentSum > S) {
            searchedSequence = [];
            currentArray = inputArray.slice(++startIterator);
            currentSum = 0;
            currentPosition = 0;
            continue;
        }

        if (currentSum < S && currentPosition + 1 === currentArray.length) {
            currentSequenc = [];
            break;
        }

        if (currentSum === S) {
            break;
        }
        currentPosition++;
    }

    return searchedSequence.join(', ');
}

console.log(findSumInArray([4, 3, 1, 4, 2, 5, 8], 11))

/*
11. Find sum in array
Description
Write a program that finds in given array of integers a sequence of given sum S (if present).

Sample tests
array	                S	        result
4, 3, 1, 4, 2, 5, 8	    11	        4, 2, 5
*/