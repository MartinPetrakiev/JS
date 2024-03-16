function youngestPerson(input) {
    let minAge = input[0].age;
    let youngestPerson = input.find(person => {
        if (person.age < minAge ) {
            return person;
        }
    });

    return youngestPerson ? youngestPerson : input[0];
}


const people = [
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

console.log(youngestPerson(people));

/*
10.Youngest person
Description
Write a function that finds the youngest male person in a given array of people and prints his full name
Use only array methods and no regular loops (for, while)
Use Array#find
*/