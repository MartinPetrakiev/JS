function extractTextFromHTML(input) {
    let inputString = '';
    input.forEach(element => {
        inputString += element.trim();
    });
    
    const regexPattern = /<.*?>/gs;
    const result = inputString.replace(regexPattern, '').trim();
    return result;
}

console.log(extractTextFromHTML([
    '<html>',
    '  <head>',
    '    <title>Sample site</title>',
    '  </head>',
    '  <body>',
    '    <div>text',
    '      <div>more text</div>',
    '      and more...',
    '    </div>',
    '    in body',
    '  </body>',
    '</html>'
]
))