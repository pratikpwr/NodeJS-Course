// Object in JS
// can also use function in them
const person = {
  name: "Pratik",
  age: 20,
  greet() {
    console.log("Hello, My name is " + this.name);
  },
};

person.greet();
console.log(person);

// Output
// Hello, My name is Pratik
// { name: 'Pratik', age: 20, greet: [Function: greet] }
