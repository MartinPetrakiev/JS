function checkBrackets(input) {
    const stack = [];
    if (!input[0] || !input.length) {
        return 'Incorrect';
    }

    for (let char of input[0]) {
        if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            if (stack.length === 0) {
                return 'Incorrect';
            }
            stack.pop();
        }
    }

    return stack.length === 0 ? 'Correct' : 'Incorrect';
}

console.log(checkBrackets([ '((a+b)/5-d)' ]));
console.log(checkBrackets([ ')(a+b))' ]));