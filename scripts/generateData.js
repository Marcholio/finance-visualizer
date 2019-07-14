const { subMonths, startOfMonth, addDays, format } = require("date-fns");
const { writeFileSync } = require("fs");

const months = 60;

const data = {};

const getMonth = d => format(d, "MM-YYYY");

for (let m = 0; m < months; m++) {
  const start = addDays(startOfMonth(subMonths(new Date(), m)), 1);
  let d = start;

  data[getMonth(d)] = {
    rent: 500,
    phone: 20,
    insurance: 20,
    car: 40 + Math.round(Math.random() < 0.1 ? Math.random() * 800 : 0),
    electronics: Math.round(Math.random() < 0.05 ? Math.random() * 800 : 0),
    groceries: Math.round(Math.random() * 100) + 150,
    alcohol: Math.round(Math.random() * 50),
    entertainment: Math.round(Math.random() * 500),
    savings: Math.round(Math.random() * 1000)
  };
}

writeFileSync("../src/data/purchases.json", JSON.stringify(data));
