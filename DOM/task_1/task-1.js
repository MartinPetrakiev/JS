console.log("point 1:")
let asideElement = document.getElementsByTagName("aside");
let asideChildren = Array.from(asideElement[0].children);
let arrayFilteredAsideChildren = Array.from(asideChildren).filter(el =>
    !el.classList.contains("special-anchor") ? el : null
)

arrayFilteredAsideChildren.forEach(el => console.log(el.innerText));

console.log("\npoint 2:")
let specialAnchorElements = document.querySelectorAll(".special-anchor");
let arrayOfSpecialAnchorElements = Array.from(specialAnchorElements);

arrayOfSpecialAnchorElements.forEach(el => {
    console.log(el.innerText);
});

console.log("\npoint 2.1: ");
let redSpecialAnchorElements = arrayOfSpecialAnchorElements.filter(el => el.style.backgroundColor === "red" ? el : null)
redSpecialAnchorElements.forEach(el => {
    console.log(el.innerText);
});

console.log("\npoint 3:");
let mainElement = document.getElementById("main-element-id");
let arraySpecialAnchorElementsOfMain = Array.from(mainElement.children).filter(el => el.tagName === "A" && el.classList.contains("special-anchor") ? el : null);
console.log("\npoint 3.1:");
arraySpecialAnchorElementsOfMain.forEach(el => {
    if (el.style.backgroundColor !== "red") {
        console.log(el.innerText);
    }
})


/*
In the example below please select DOM elements:
1) Select the <aside> element.
    Select all of its children which do not have the class 'special-anchor' and log their inner text.
2) Select all of the elements containing class 'special-anchor' and log inner text.
    Select the ones with background color red and log their inner text.
3) Select the element with id 'main-element-id'.
    Select all of its children which are an anchor (<a>) and have class 'special-anchor'. If their background color is not red log their inner text
*/