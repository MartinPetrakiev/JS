var solve = function (element, contents) {
    if (!element || !contents) {
        throw new Error("Missing parameters.");
    }
    contents.forEach(function (item) {
        if (["string", "number"].indexOf(typeof item) === -1) {
            throw new Error("Invalid content type.");
        }
    });
    var inputElement;
    var newElements = buildContents(contents);
    if (typeof element === "string") {
        inputElement = document.getElementById(element);
        if (!inputElement) {
            throw new Error("Invalid id or missing element.");
        }
    }
    else if (element instanceof HTMLElement) {
        inputElement = element;
    }
    else {
        throw new Error("Invalid element type.");
    }
    clearChildren(inputElement);
    newElements.forEach(function (element) {
        inputElement.appendChild(element);
    });
};
function buildContents(contents) {
    var newElements = [];
    contents.forEach(function (item) {
        var newDivElement = document.createElement('div');
        newDivElement.textContent = item.toString();
        newElements.push(newDivElement);
    });
    return newElements;
}
function clearChildren(element) {
    while (element.innerHTML.length) {
        element.removeChild(element.lastChild);
    }
}
solve(document.createElement('div'), [1, 2, 3]);
