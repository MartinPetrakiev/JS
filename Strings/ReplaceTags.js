function replaceTags(input) {
    let inputString = input[0];
    const regexPattern = /<a href="(?<site>[a-z0-9\-\.\/:]+?)">(?<text>[a-zA-Z0-9\ ]+)<\/a>/;
    let match = regexPattern.exec(inputString);

    while (match !== null) {
        inputString = inputString.slice(0, match.index) + `[${match.groups?.text}](${match.groups?.site})` + inputString.slice(match.index + match[0].length);

        match = regexPattern.exec(inputString)
    }

    return inputString;
}

console.log(replaceTags([ '<p>Please visit <a href="http://academy.telerik.com">our site</a> to choose a training course. Also visit <a href="www.devbg.org">our forum</a> to discuss the courses.</p>' ]));