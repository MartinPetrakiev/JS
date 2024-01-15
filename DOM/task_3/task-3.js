function solve() {
    function toggleShowHide(e) {
        var topmostContentElement = e.target.previousElementSibling;
        if (!topmostContentElement || !topmostContentElement.classList.contains("content")) {
            return;
        }
        if (topmostContentElement.classList.contains("hidden")) {
            topmostContentElement.classList.remove("hidden");
            topmostContentElement.style.display = "block";
            e.target.textContent = "hide";
        }
        else {
            topmostContentElement.classList.add("hidden");
            topmostContentElement.style.display = "none";
            e.target.textContent = "show";
        }
    }
    return function (selector) {
        if (!selector) {
            throw new Error("Invalid selector.");
        }
        var parentElement;
        if (typeof selector === "string") {
            parentElement = document.getElementById(selector);
            if (!parentElement) {
                throw new Error("Invalid id or missing element.");
            }
        }
        else if (selector instanceof HTMLElement) {
            parentElement = selector;
        }
        else {
            throw new Error("Invalid element type.");
        }
        var childElementsArray = Array.from(parentElement.children);
        var buttonElements = childElementsArray.filter(function (element) { return element.classList.contains("button") ? element : null; });
        buttonElements.forEach(function (element) {
            element.textContent = "hide";
            element.addEventListener("click", toggleShowHide);
        });
    };
}
;
