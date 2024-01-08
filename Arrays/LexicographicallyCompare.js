function lexicographicComparison(input) {
    const array1 = input.shift().split('');
    const array2 = input.shift().split('');
    const minLength = Math.min(array1.length, array2.length);
    let result = '=';

    for (let i = 0; i < minLength; i++) {
        const char1 = array1[i].charCodeAt(0);
        const char2 = array2[i].charCodeAt(0);
        if (char1 < char2) {
            result = '<';
        } else if (char1 > char2) {
            result = '>';
        }
    }

    if (array1.length < array2.length) {
        result = '<';
    } else if (array1.length > array2.length) {
        result = '>';
    }

    return result;
}

console.log(lexicographicComparison(['asd', 'dsad']))


/*
02. Lexicographically compare
Write a program that compares two char arrays lexicographically (letter by letter).

Input
On the first line you will receive the first char array as a string
On the second line you will receive the second char array as a string
Output
Print < if the first array is lexicographically smaller
Print > if the second array is lexicographically smaller
Print = if the arrays are equal
*/