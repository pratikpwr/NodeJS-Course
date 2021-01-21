const name = "Pratik";
let age = 20;
const hasHobbies = true;

// let - can change value of variable
// const - can not change the value of variable

age = 21;

function userDetails(userName, userAge, userHasHobbies) {
  return (
    "Hello, My name is " +
    userName +
    ". My age is " +
    userAge +
    ". I have Hobbies: " +
    userHasHobbies
  );
}

console.log(userDetails(name, age, hasHobbies));
