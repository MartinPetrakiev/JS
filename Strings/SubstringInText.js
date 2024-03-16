function substringInText(input) {
    const searchedSubstring = input[0].toLowerCase();
    const inputString = input[1].toLowerCase();

    let count = 0;
    let index = inputString.indexOf(searchedSubstring);

    while (index !== -1) {
        count++;
        index = inputString.indexOf(searchedSubstring, index + 1);
    }

    return count;
}

console.log(substringInText([
    'in',
    'We are living in an yellow submarine. We don\'t have anything else. inside the submarine is very tight. So we are drinking all the day. We will move out of it in 5 days.'
]));