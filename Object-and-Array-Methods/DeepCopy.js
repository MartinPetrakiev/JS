const object = {
    objKey1: "string",
    objKey2: 28,
    objKey3: {
        nestedObj: {
            nestedObjKey: 123
        }
    },
    objKey4: [1, 2, 3],
    objKey5: function foo() {}
}

let clone = JSON.parse(JSON.stringify(object))

let clone2 = Object.assign({}, object)

let clone3 = {}
for (const [key,value] of Object.entries(object)) {
    clone3[key] = value;
}

object.objKey1 = "new string"
console.log(object)
console.log(clone)
console.log(clone2)
console.log(clone3)

/*
3.Deep copy
Description
Write a function that makes a deep copy of an object. The function should work for both primitive and reference types.
*/