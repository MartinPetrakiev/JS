type id = string

function solve() {
  return function (selector: id | Element) {
    if (!selector) {
      throw new Error('Invalid selector.');
    }
    
    let parentElemet: Element;
		if (typeof selector === "string") {
			parentElemet = document.getElementById(selector)!;
			if (!parentElemet) {
				throw new Error("Invalid id or missing element.");
			}
		} else if (selector instanceof HTMLElement) {
			parentElemet = selector;
		} else {
			throw new Error("Invalid element type.")
		}
  };
};
