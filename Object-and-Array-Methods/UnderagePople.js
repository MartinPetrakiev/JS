const people = [
    { firstname: 'Gosho', lastname: 'Petrov', age: 32 },
    { firstname: 'Bay', lastname: 'Ivan', age: 81 },
    { firstname: 'John', lastname: 'Doe', age: 42 },
    { firstname: 'Lubo', lastname: 'Axac', age: 54 },
    { firstname: 'Pesho', lastname: 'Pesho', age: 33 },
    { firstname: 'Asdf', lastname: 'Xyz', age: 16 },
    { firstname: 'Gosho', lastname: 'Gosho', age: 12 },
    { firstname: 'Lorenzo', lastname: 'Z', age: 25 },
    { firstname: 'Hasan', lastname: 'Salam', age: 17 },
    { firstname: 'Hristo', lastname: 'Petrov', age: 65 }
  ];

let underagedPeople = people.filter(person => person.age < 18);

underagedPeople.forEach(person => {
    console.log(`# ${person.firstname} ${person.lastname} of age ${person.age}`)
})

/*
9.Underage people
Description
Write a function that prints all underaged persons of an array of person
Use Array#filter and Array#forEach
Use only array methods and no regular loops (for, while)
*/