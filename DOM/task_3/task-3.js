function solve() {
    return function (selector) {
        if (!selector) {
            throw new Error('Invalid selector.');
        }
        var parentElemet;
        if (typeof selector === "string") {
            parentElemet = document.getElementById(selector);
            if (!parentElemet) {
                throw new Error("Invalid id or missing element.");
            }
        }
        else if (selector instanceof HTMLElement) {
            parentElemet = selector;
        }
        else {
            throw new Error("Invalid element type.");
        }
    };
}
;
