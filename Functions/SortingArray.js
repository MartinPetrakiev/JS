function main(input) {
    let N = input.shift();
    let array = input.shift().split(' ').map(v => Number(v));
    let arraySortedAscending = array.slice().sort((a, b) => sortAscending(a, b));
    let arraySortedDescending = array.slice().sort((a, b) => sortDescending(a, b));

    console.log(`Maximal element: ${findMaxElementInArray(array)}`);
    console.log(`Array sorted ascending: ${arraySortedAscending.join(' ')}`);
    console.log(`Array sorted descending: ${arraySortedDescending.join(' ')}`);
}

function findMaxElementInArray(array) {
    let maxElement = array[0];

    for (let i = 0; i < array.length; i++) {
        maxElement = Math.max(maxElement, array[i]);
    }

    return maxElement;
}


function sortAscending(a, b) {
    if (a - b > 1) {
        return b;
    } else if (a - b === 0) {
        return a;
    } else if (a - b < 1) {
        return a;
    }
}

function sortDescending(a, b) {
    if (a - b > 1) {
        return a;
    } else if (a - b === 0) {
        return a;
    } else if (a - b < 1) {
        return b;
    }
}

main([6, '-26 -25 -28 31 2 27'])

main([5, '4 2 8 1 6'])

/*
7.Sorting array
Description
Write a method that returns the maximal element in a portion of an array of integers starting at a given index. Using it, write another method that sorts an array in ascending / descending order. Write a program that sorts a given array.

Input
On the first line you will receive the number N - the size of the array
On the second line you will receive N numbers separated by spaces - the array
Output
Print the sorted array
Elements must be separated by spaces
*/