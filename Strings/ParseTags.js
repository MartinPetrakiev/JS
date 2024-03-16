function parseTags(input) {
    const inputString = input[0];
    let regexPattern = /<(?<type>upcase|orgcase|lowcase)>(?<content>.*?)<\/(\1)>/;
    let result = inputString;
    let match = regexPattern.exec(inputString);

    while (match !== null) {
        let type = match.groups.type;
        let content = match.groups.content;
        switch (type) {
            case "lowcase":
                result = result.slice(0, match.index) + content.toLowerCase() + result.slice(match.index + match[0].length);
                break;
            case "orgcase":
                result = result.slice(0, match.index) + content + result.slice(match.index + match[0].length);
                break;
            case "upcase":
                result = result.slice(0, match.index) + content.toUpperCase() + result.slice(match.index + match[0].length);
                break;
        }

        match = regexPattern.exec(result);
    }

    return result;
}

console.log(parseTags(['We are <orgcase>liViNg</orgcase> in a <upcase>yellow submarine</upcase>. We <orgcase>doN\'t</orgcase> have <lowcase>anything</lowcase> else.']));