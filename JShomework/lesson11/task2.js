function getTodo() {
  return fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json());
}

function getUser() {
  return fetch("https://jsonplaceholder.typicode.com/users/1")
    .then((response) => response.json());
}

const allResults = Promise.all([getTodo(), getUser()])
  .then((results) => console.log("All: ", results))
  .catch((error) => console.error("Error: ", error));

const raceResult = Promise.race([getTodo(), getUser()])
  .then((result) => console.log("Race: ", result))
  .catch((error) => console.error("Error: ", error));
