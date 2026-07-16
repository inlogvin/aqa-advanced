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

async function run() {
  try {
    const allResults = await Promise.all([getTodo(), getUser()]);
    console.log("All: ", allResults);

    const raceResult = await Promise.race([getTodo(), getUser()]);
    console.log("Race: ", raceResult);
  } catch (error) {
    console.error("Error: ", error);
  }
}

run();
