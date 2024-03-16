function printBiggestPrimeNumberFromArray(input) {
    const primeNumbers = input.filter(num => isPrime(num))
    let maxPrimeNumber = primeNumbers[0];

    primeNumbers.forEach(num => {
        maxPrimeNumber = Math.max(maxPrimeNumber, num);
    })

    return maxPrimeNumber;
}

function isPrime(number) {
    let result = false;

    if (number == 2 || number == 3 || number == 5) {
        result = true;
    }
    else {
        let n = Math.Round(number / 6);

        if (n < number / 6) {
            n = 6 * n + 1;

            if (n == number) {
                result = true;
            }
        }
        else {
            n = 6 * n - 1;
            if (n == number) {
                result = true;
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
