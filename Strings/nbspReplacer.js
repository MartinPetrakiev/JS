function nbspReplacer(input) {
    let resultString = input[0];
    const regexPattern = /\s/;
    let match = regexPattern.exec(resultString);

    while (match !== null) {
        resultString = resultString.slice(0, match.index) + '&nbsp;' + resultString.slice(match.index + match[0].length);

        match = regexPattern.exec(resultString);
    }

    return resultString;
}

console.log(nbspReplacer([ 'hello world' ]));
console.log(nbspReplacer([ 'This text contains 4 spaces!!' ]));

