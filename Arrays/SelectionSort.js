function selectionSort(array) {
    for (let i = 0; i < array.length - 1; i++) {
        let jMin = i;

        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[jMin]) {
                jMin = j;
                continue;
            }
        }

        if (jMin !== i) {
            let swapElement = array[i];
            array[i] = array[jMin]
            array[jMin] = swapElement;
        }
    }

    return array;
}

console.log(selectionSort([0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]))
/*
05. Selection sort
Description
Sorting an array means to arrange its elements in increasing order. Write a program to sort an array. Use the Selection sort algorithm: Find the smallest element, move it at the first position, find the smallest from the rest, move it at the second position, etc.

Input
On the first line you will receive the number N
On the next N lines the numbers of the array will be given
Output
Print the sorted array
Each number should be on a new line
*/