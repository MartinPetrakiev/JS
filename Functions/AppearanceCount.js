function appearanceCount(input) {
    const N = input.shift();
    let array = input.shift().split(' ').map(v => Number(v));
    const X = input.shift();

    let counter = 0;

    while (array.indexOf(X) > -1) {
        counter++;
        array = array.slice(array.indexOf(X) + 1, N);
    }

    return counter;
}

console.log(appearanceCount([
    10, 
    '1 1 2 6 4 4 3 4 6 12',
     4
]))

/*
4.Appearance count
Description
Write a method that counts how many times a given number appears in a given array. Write a test program to check if the method is working correctly.

Input
On the first line you will receive a number N - the size of the array
On the second line you will receive N numbers separated by spaces - the numbers in the array
On the third line you will receive a number X
Output
Print how many times the number X appears in the array
*/