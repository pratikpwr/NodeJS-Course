// Arrays
// can add any datatype to single array

const hobbies = ["Coding", "Gaming"];

// for (let hobby of hobbies) {
//   console.log(hobby);
// }
// Output
// Coding
// Gaming

console.log(hobbies.map((hobby) => "Hobby: " + hobby));
console.log(hobbies);

// Output
// [ 'Hobby: Coding', 'Hobby: Gaming' ]
// [ 'Coding', 'Gaming' ]
