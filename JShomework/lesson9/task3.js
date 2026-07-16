const car1 = {
  brand: "Mazda",
  model: "CX30",
  year: 2024,
};
const car2 = {
  brand: "Honda",
  model: "Accord",
  owner: "Someone",
};

const car3 = { ...car1, ...car2 };

console.log(car3);
