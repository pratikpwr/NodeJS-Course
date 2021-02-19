// Spread operator pulls out the values and add then to arrays or objects '...'
// rest operator takes as many as parameters in function

const hobbies = ["Gaming", "Coding"];

// const copiedHobbies = hobbies.slice();
// Output
// [ 'Gaming', 'Coding' ]

// without spread op
// const copiedHobbies = [hobbies];
// Output
// [[ 'Gaming', 'Coding' ]]

// spread operator
const copiedHobbies = [...hobbies];
// Output
// [ 'Gaming', 'Coding' ]

console.log(copiedHobbies);

// rest operator
// can pass any number of arguments

const toArray = (...args) => {
  return args;
};

console.log(toArray(1, 2, 3, 4));
// Output
// [1,2,3,4]
