import React, { Component } from "react";
import { AreaChart, XAxis, YAxis, Tooltip, Area } from "recharts";
import _ from "lodash";
import { FormControl, TextField } from "@material-ui/core";
import purchases from "./data/purchases.json";

const categories = Object.keys(purchases[Object.keys(purchases)[0]]);

const colors = {
  rent: "#ff1744",
  phone: "#D500F9",
  insurance: "#3D5AFE",
  car: "#00B0FF",
  electronics: "#00E5FF",
  groceries: "#00E676",
  alcohol: "#76FF03",
  entertainment: "#FFFF00",
  savings: "#FFAB40"
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

  handleChange(event) {
    const minMax = Math.max(Math.min(event.target.value, 24), 1);
    this.setState({
      period: minMax,
      data: parseData(minMax)
    });
  }

  render() {
    return (
      <div id="container">
        <div id="container-header">
          <h2>Monthly average spending</h2>
          <FormControl>
            <TextField
              id="period"
              label=""
              value={this.state.period}
              onChange={this.handleChange.bind(this)}
              type="number"
              margin="normal"
            />
          </FormControl>
        </div>
        <div id="chart-container">
          <AreaChart data={this.state.data} width={1200} height={500}>
            <XAxis dataKey="month" tick={{ stroke: "white", fill: "white" }} />
            <YAxis tick={{ stroke: "white", fill: "white" }} />
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
      </div>
    );
  }
}
