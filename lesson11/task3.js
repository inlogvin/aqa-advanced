async function getTodo() {
  const todos = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const todoData = await todos.json();
  return todoData;
}
async function getUser() {
  const user = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const userData = await user.json();
  return userData;
}

const allResults = Promise.all([getTodo(), getUser()])
  .then((results) => console.log("All: ", results))
  .catch((error) => console.error("Error: ", error));

const raceResult = Promise.race([getTodo(), getUser()])
  .then((result) => console.log("Race: ", result))
  .catch((error) => console.error("Error: ", error));
