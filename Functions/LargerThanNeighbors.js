function largerThanNeighbors(input) {
    const [N, ...array] = input;
    let counter = 0;

    for (let i = 1; i < N - 1; i++) {
        if (array[i - 1] < array[i] && array[i + 1] < array[i]) {
            counter++
        }
    }

    return counter;
}

console.log(largerThanNeighbors(
    [
        6,
        -26, -25, -28, 31, 2, 27
    ]
))

/*
5.Larger than neighbours
Description
Write a method that checks if the element at given position in given array of integers is larger than its two neighbors (when such exist). Write program that reads an array of numbers and prints how many of them are larger than their neighbors.

Input
On the first line you will receive the number N - the size of the array
On the second line you will receive N numbers separated by spaces - the array
Output
Print how many numbers in the array are larger than their neighbors
Constraints
1 <= N <= 1024
*/