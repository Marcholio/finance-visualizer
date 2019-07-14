const { subMonths, startOfMonth, addDays, format } = require("date-fns");
const { writeFileSync } = require("fs");

const months = 60;

const data = {};

const getMonth = d => format(d, "MM-YYYY");

for (let m = 0; m < months; m++) {
  const start = addDays(startOfMonth(subMonths(new Date(), m)), 1);
  let d = start;

  data[getMonth(d)] = [];
  data[getMonth(d)].push({ category: "rent", amount: 500 });
  data[getMonth(d)].push({ category: "phone", amount: 20 });
  data[getMonth(d)].push({ category: "insurance", amount: 20 });

  data[getMonth(d)].push({
    category: "car",
    amount: 40 + Math.round(Math.random() < 0.1 ? Math.random() * 800 : 0)
  });

  data[getMonth(d)].push({
    category: "electronics",
    amount: Math.round(Math.random() < 0.05 ? Math.random() * 800 : 0)
  });

  data[getMonth(d)].push({
    category: "groceries",
    amount: Math.round(Math.random() * 100) + 150
  });

  data[getMonth(d)].push({
    category: "alcohol",
    amount: Math.round(Math.random() * 50)
  });

  data[getMonth(d)].push({
    category: "entertainment",
    amount: Math.round(Math.random() * 500)
  });

  data[getMonth(d)].push({
    category: "savings",
    amount: Math.round(Math.random() * 1000)
  });
}

writeFileSync("../src/data/purchases.json", JSON.stringify(data));
