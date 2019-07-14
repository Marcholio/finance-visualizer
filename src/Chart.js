import React, { Component } from "react";
import { AreaChart, XAxis, YAxis, Tooltip, Area } from "recharts";
import _ from "lodash";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import purchases from "./data/purchases.json";

const categories = Object.keys(purchases[Object.keys(purchases)[0]]);

const colors = {
  rent: "#d32f2f",
  phone: "#7b1fa2",
  insurance: "#303f9f",
  car: "#1976d2",
  electronics: "#0097a7",
  groceries: "#689f38",
  alcohol: "#fbc02d",
  entertainment: "#f57c00",
  savings: "#795548"
};

const parseData = period => {
  const data = [];

  const months = Object.keys(purchases).reverse();

  for (let i = period - 1; i < months.length; i++) {
    const summed = _.slice(months, i - period + 1, i + 1).reduce((acc, cur) => {
      categories.forEach(
        c => (acc[c] = Math.round((acc[c] || 0) + purchases[cur][c] / period))
      );

      return acc;
    }, {});

    data.push(Object.assign({ month: months[i] }, summed));
  }

  return data;
};

export default class Chart extends Component {
  state = {
    data: parseData(1),
    period: 1
  };

  handleChange(newVal) {
    console.log(newVal);
  }

  render() {
    return (
      <div>
        <FormControl>
          <InputLabel htmlFor="age-simple">Age</InputLabel>
          <Select
            value={1}
            onChange={this.handleChange}
            inputProps={{
              name: "age",
              id: "age-simple"
            }}
          >
            <MenuItem value={1}>Ten</MenuItem>
            <MenuItem value={2}>Twenty</MenuItem>
            <MenuItem value={3}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <AreaChart data={this.state.data} width={1200} height={500}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          {categories.map(c => (
            <Area
              key={c}
              type="monotone"
              dataKey={c}
              stackId="1"
              stroke={colors[c]}
              fill={colors[c]}
            />
          ))}
        </AreaChart>
      </div>
    );
  }
}
