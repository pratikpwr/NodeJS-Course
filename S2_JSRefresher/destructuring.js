// Destructuring a Object - to get or tell what we require directly

const person = {
  name: "Pratik",
  age: 20,
  greet() {
    console.log("Hello, My name is " + this.name);
  },
};

// const printName = (personData) => {
//   console.log(person.name);
// };
// printName(person);

// destructuring used in function eg.

const printName = ({ name }) => {
  console.log(name);
};
printName(person);

//
// must use same name as Objects
const { name, age } = person;
console.log(name, age);
// Pratik 20

// same as for arrays
const hobbies = ["Coding", "Gaming"];
const [hobby1, hobby2] = hobbies;
console.log(hobby1, hobby2);
// Coding Gaming - values in separate variables
