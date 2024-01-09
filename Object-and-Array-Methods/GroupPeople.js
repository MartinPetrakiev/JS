var people = [
    { firstname: 'Gosho', lastname: 'Petrov', age: 32 },
    { firstname: 'Bay', lastname: 'Ivan', age: 81 },
    { firstname: 'John', lastname: 'Doe', age: 42 },
    { firstname: 'Lubo', lastname: 'Axac', age: 54 },
    { firstname: 'Pesho', lastname: 'Pesho', age: 33 },
    { firstname: 'Asdf', lastname: 'Xyz', age: 81 },
    { firstname: 'Gosho', lastname: 'Gosho', age: 12 },
    { firstname: 'Lorenzo', lastname: 'Z', age: 25 },
    { firstname: 'Hasan', lastname: 'Salam', age: 22 },
    { firstname: 'Hristo', lastname: 'Petrov', age: 65 }
  ];

function groupPeopleByFirstLetter(array) {
    return array.reduce((accumulator, currentValue) => {
        const firstLetter = currentValue.firstname[0].toLowerCase();
        
        if (!accumulator.hasOwnProperty(firstLetter)) {
            accumulator[firstLetter] = [currentValue];
        } else {
            accumulator[firstLetter].push(currentValue);
        }
        
        return accumulator;
    }, {});
}

console.log(groupPeopleByFirstLetter(people))


/*
11.Group people
Description
Write a function that groups an array of persons by first letter of first name and returns the groups as a JavaScript Object
Use Array#reduce
Use only array methods and no regular loops (for, while)
Example:

result = {
    'a': [{
        firstname: 'Asen',
        / ... /
    }, {
        firstname: 'Anakonda',
        / ... /
    }],
    'j': [{
        firstname: 'John',
        / ... /
    }]
};
*/