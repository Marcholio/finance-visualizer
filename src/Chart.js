import React, { Component } from "react";
import { AreaChart, XAxis, YAxis, Tooltip, Area } from "recharts";
import purchases from "./data/purchases.json";

const categories = purchases[Object.keys(purchases)[0]].map(p => p.category);

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

export default class Chart extends Component {
  state = {
    data: Object.keys(purchases)
      .reverse()
      .map(k =>
        Object.assign(
          { month: k },
          categories.reduce(
            (acc, cur) =>
              Object.assign(acc, {
                [cur]: purchases[k].find(a => a.category === cur).amount
              }),
            {}
          )
        )
      )
  };
  render() {
    return (
      <div>
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
            ></Area>
          ))}
        </AreaChart>
      </div>
    );
  }
}
