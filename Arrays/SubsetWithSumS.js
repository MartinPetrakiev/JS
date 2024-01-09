function findSubsetWithSumEqualToS (array, S) {
    const dynamicArray = new Array(array.length + 1).fill(false).map(() => new Array(S + 1).fill(false));

    for (let i = 0; i <= array.length; i++) {
        dynamicArray[i][0] = true;
    }

    for (let i = 1; i <= array.length; i++) {
        for (let j = 1; j <= S; j++) {
            if (array[i - 1] > j) {
                dynamicArray[i][j] = dynamicArray[i - 1][j];
            } else {
                dynamicArray[i][j] = dynamicArray[i - 1][j] || dynamicArray[i - 1][j - array[i - 1]];
            }
        }
    }

    return dynamicArray[array.length][S] ? 'yes' : 'no';
}

//testing alternative
function findSubsetWithSumEqualToS_2(inputArray, S) {
    if (S === 0) {
        return 'yes';
    }

    if (inputArray.length === 0 && S !== 0) {
        return 'no';
    }

    if (inputArray[inputArray.length - 1] <= S) {
        if (findSubsetWithSumEqualToS_2(inputArray.slice(0, inputArray.length - 1), S - inputArray[inputArray.length - 1])) {
            return 'yes';
        }
    }

    return findSubsetWithSumEqualToS_2(inputArray.slice(0, inputArray.length - 1), S);
}

//gpt alternative - (slow performance)
function findSubsetWithSumEqualToS_3(arr, S) {
    const n = arr.length;
    
    for (let mask = 0; mask < (1 << n); mask++) {
        let currentSum = 0;
        for (let j = 0; j < n; j++) {
            if (mask & (1 << j)) {
                currentSum += arr[j];
            }
        }
        if (currentSum === S) {
            return 'yes';
        }
    }
    return 'no';
}

console.log(findSubsetWithSumEqualToS([2, 1, 2, 4, 3, 5, 2, 6], 14))

console.log(findSubsetWithSumEqualToS_2([2, 1, 2, 4, 3, 5, 2, 6], 14))

/*
08. Subset with sum S
Description
We are given an array of integers and a number S. Write a program to find if there exists a subset of the elements of the array that has a sum S.

Sample tests
input array	S	result
2, 1, 2, 4, 3, 5, 2, 6	14	yes
*/