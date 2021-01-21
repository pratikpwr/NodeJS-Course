// setTimeout(() => {
//   console.log("Timer is done!");
// }, 2000);

// Output
// Hii
// Hello
// Timer is done!
// const fetchData = (callback) => {
//   setTimeout(() => {
//     callback("DONE");
//   }, 2000);
// };

// setTimeout(() => {
//   console.log("Timer is done!");

//   fetchData((text) => {
//     console.log(text);
//   });
// }, 2000);

// Output
// Hii
// Hello
// Timer is done!
// DONE

const fetchData = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("DONE");
    }, 1500);
  });
  return promise;
};

setTimeout(() => {
  console.log("Timer is done!");

  fetchData()
    .then((text) => {
      console.log(text);
      return fetchData();
    })
    .then((text2) => {
      console.log(text2);
    });
}, 2000);

console.log("Hii");
console.log("Hello");
// Output
// Hii
// Hello
// Timer is done!
// DONE
// DONE
