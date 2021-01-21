const name = "Pratik";
let age = 20;
const hasHobbies = true;

age = 21;

// Arrow Functions :
//  we can declare arrow functions as below
//  it lets us use [this] keyword in function

const userDetails = (userName, userAge, userHasHobbies) => {
  return (
    "Hello, My name is " +
    userName +
    ". My age is " +
    userAge +
    ". I have Hobbies: " +
    userHasHobbies
  );
};

console.log(userDetails(name, age, hasHobbies));

// one line functions

const add = (a, b) => a + b;

// const addOneToValue = a => a+1;
// const funWithoutParameters = () => 1+3;

console.log(add(9, 6));
