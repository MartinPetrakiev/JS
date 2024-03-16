function parseURL(input) {
    const regexPattern = /(?<protocol>http|https):\/\/(?<server>[a-z0-9\-\.]{1,255})(?<resource>\/[A-Za-z0-9\-\/]+)/;
    let match = regexPattern.exec(input[0]);
    let result = '';

    if (match !== null) {
        let elements = {
            protocol: match.groups.protocol,
            server: match.groups.server,
            resource: match.groups.resource
        }

        for (const [key, value] of Object.entries(elements)) {
            result += `${key}: ${value}\n`;
        }
    }

    return result;
}

console.log(parseURL([ 'http://telerikacademy.com/Courses/Courses/Details/239' ]))