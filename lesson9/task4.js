const person = {
  firstName: "Emma",
  lastName: "Tompson",
  age: 29,
};
person.email = "emma@gmail.com";
delete person.age;

console.log(person);
