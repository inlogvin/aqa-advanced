const users = [
  {
    login: "helenbrave",
    email: "helenbrave@gmail.com",
    isActive: true,
  },
  {
    login: "anna",
    email: "anna@gmail.com",
    isActive: true,
  },
  {
    login: "kate",
    email: "kate@gmail.com",
    isActive: false,
  },
];
for (const { login, email, isActive } of users) {
  console.log(login, email, isActive);
}
