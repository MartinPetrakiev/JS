function binarySearch(input) {
    const N = input.shift();
    const array = [];

    for (let i = 0; i < N; i++) {
        array.push(input.shift());
    }

    const X = input.shift();
    let positionSearched = -1;

    let leftIndex = 0
    let rightIndex = N - 1
    while (leftIndex < rightIndex) {
        let midIndex = Math.floor((leftIndex + rightIndex) / 2)
        if (midIndex === X) {
            positionSearched = midIndex;
            break;
        }

        if (array[midIndex] < X) {
            leftIndex = midIndex + 1
        } else {
            rightIndex = midIndex
        }
    }

    if (array[leftIndex] = X) {
        positionSearched = leftIndex;
    }

    return positionSearched;
}

console.log(binarySearch([10, 1,2,3,4,5,5,6,7,8,9, 5]));


/*
07. Binary search
Description
Write a program that finds the index of given element X in a sorted array of N integers by using the Binary search algorithm.

Input
On the first line you will receive the number N
On the next N lines the numbers of the array will be given
On the last line you will receive the number X
Output
Print the index where X is in the array
If there is more than one occurence print the first one
If there are no occurences print -1
*/