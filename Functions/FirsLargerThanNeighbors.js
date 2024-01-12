function firstLargestThanNeighbors(input) {
    const [N, arrayString] = input;
    const array = arrayString.split(' ').map(v => Number(v));
    let firstLargestIndex = -1;

    for (let i = 1; i < N - 1; i++) {
        if (array[i - 1] < array[i] && array[i + 1] < array[i]) {
            firstLargestIndex = i;
            break;
        }
    }

    return firstLargestIndex;
}

console.log(firstLargestThanNeighbors(
    [
        6,
        '-26 -25 -28 31 2 27'
    ]
))




/*
6.First larger than neighbors
Description
Write a method that returns the index of the first element in array that is larger than its neighbors, or -1, if there is no such element.

Input
On the first line you will receive the number N - the size of the array
On the second line you will receive N numbers separated by spaces - the array
Output
Print the index of the first element that is larger than its neighbors or -1 if none are
*/