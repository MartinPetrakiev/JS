function reverseString(input) {
    const inputString = input[0];

    let reversedString = '';

    for (let i = inputString.length - 1; i >= 0; i--) {
        reversedString += inputString[i];
    }

    return reversedString;
}

console.log(reverseString(['sample']));
console.log(reverseString(['qwertytrewq']));