function printBiggestPrimeNumberFromArray(input) {
    const primeNumbers = input.filter(num => isPrime(num))
    let maxPrimeNumber = primeNumbers[0];

    primeNumbers.forEach(num => {
        maxPrimeNumber = Math.max(maxPrimeNumber, num);
    })

    return maxPrimeNumber;
}

function isPrime(number) {
    let result = true;

    if (number <= 1) {
        result = false;
    }
    else if (number == 2 || number == 3 || number == 5) {
        result = true;
    }
    else if (number % 2 == 0 || number % 3 == 0 || number % 5 == 0) {
        result = false;
    }
    else {
        let boundary = Math.floor(Math.sqrt(number));

        for (let i = 7; i <= boundary; i += 6) {
            if (number % i == 0 || number % (i + 2) == 0) {
                result = false;
                break;
            }
        }
    }

    return result;
}

console.log(printBiggestPrimeNumberFromArray([11, 5, 25, 17, 21, 13, 4, 18, 23, 14, 6, 19, 20, 2, 15, 10, 12, 8, 24, 3, 7, 22, 9, 16, 1]))

/*
10. Prime numbers
Description
Write a program that finds all prime numbers in the range [1 ... N]. Use the Sieve of Eratosthenes algorithm. The program should print the biggest prime number which is <= N.

Input
On the first line you will receive the number N
Output
Print the biggest prime number which is <= N
*/
