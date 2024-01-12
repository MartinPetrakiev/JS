let solve = function (element: string | Element, contents: Array<string | number>) {
	if (!element || !contents) {
		throw new Error("Missing parameters.");
	}

	contents.forEach(item => {
		if (["string", "number"].indexOf(typeof item) === -1) {
			throw new Error("Invalid content type.");
		}
	});

	let inputElement: Element;
	let newElements: Array<Element> = buildContents(contents);

	if (typeof element === "string") {
		inputElement = document.getElementById(element);
		if (!inputElement) {
			throw new Error("Invalid id or missing element.");
		}
	} else if (element instanceof HTMLElement) {
		inputElement = element;
	} else {
		throw new Error("Invalid element type.")
	}

	clearChildren(inputElement);

	newElements.forEach(element => {
		inputElement.appendChild(element);
	});
}

function buildContents(contents: Array<string | number>): Array<Element> {
	let newElements: Array<Element> = [];
	contents.forEach(item => {
		let newDivElement: Element = document.createElement('div');
		newDivElement.textContent = item.toString();
		newElements.push(newDivElement);
	});

	return newElements;
}

function clearChildren(element: Element) {
	while (element.innerHTML.length) {
		element.removeChild(element.lastChild);
	}
}

solve(document.createElement('div'), [1, 2, 3]);

