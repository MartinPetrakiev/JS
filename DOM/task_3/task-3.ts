type id = string
interface ArrayConstructor {
    from(arrayLike: any, mapFn?, thisArg?): Array<any>;
}

function solve() {
	function toggleShowHide(e): void {
		let topmostContentElement: HTMLElement = e.target.previousElementSibling;

		if (!topmostContentElement || !topmostContentElement.classList.contains("content")) {
			return;
		}

		if (topmostContentElement.classList.contains("hidden")) {
			topmostContentElement.classList.remove("hidden");
			topmostContentElement.style.display = "block";
			e.target.textContent = "hide";
		} else {
			topmostContentElement.classList.add("hidden");
			topmostContentElement.style.display = "none";
			e.target.textContent = "show";
		}
	}


	return function (selector: id | Element) {
		if (!selector) {
			throw new Error("Invalid selector.");
		}

		let parentElement: Element;
		if (typeof selector === "string") {
			parentElement = document.getElementById(selector)!;
			if (!parentElement) {
				throw new Error("Invalid id or missing element.");
			}
		} else if (selector instanceof HTMLElement) {
			parentElement = selector;
		} else {
			throw new Error("Invalid element type.")
		}

		let childElementsArray: Array<HTMLElement> = Array.from(parentElement.children);
		let buttonElements: Array<HTMLElement> = childElementsArray.filter(element => element.classList.contains("button") ? element : null);

		buttonElements.forEach(element => {
			element.textContent = "hide";
			element.addEventListener("click", toggleShowHide);
		});
	};
};
