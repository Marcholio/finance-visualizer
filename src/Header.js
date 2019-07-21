import React, { Component } from "react";
import axios from "axios";

const loadBtcPrice = () =>
  axios
    .get(
      "https://bitcoinaverage-global-bitcoin-index-v1.p.rapidapi.com/indices/local/ticker/all?crypto=BTC&fiat=EUR",
      {
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY
        }
      }
    )
    .then(res => ({
      price:
        res.data.BTCEUR.ask - (res.data.BTCEUR.ask - res.data.BTCEUR.bid) / 2,
      change: res.data.BTCEUR.changes.percent.day
    }))
    .catch(err => {
      console.log(err);
      return { price: "Not available", change: null };
    });

const loadStockPrice = () =>
  axios
    .get(
      "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary?region=US&lang=en",
      {
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY
        }
      }
    )
    .then(res => ({
      price: res.data.marketSummaryResponse.result[0].regularMarketPrice.raw,
      change:
        res.data.marketSummaryResponse.result[0].regularMarketChangePercent.raw
    }))
    .catch(err => {
      console.log(err);
      return { price: "Not available", change: null };
    });

const getColor = change => (change < 0 ? "#f44336" : "#4caf50");

export default class Header extends Component {
  state = {
    btc: "loading...",
    btcChange: "",
    stock: "loading...",
    stockChange: ""
  };

  componentWillMount() {
    loadBtcPrice().then(({ price, change }) =>
      this.setState({ btc: price.toFixed(2), btcChange: change.toFixed(2) })
    );
    loadStockPrice().then(({ price, change }) =>
      this.setState({ stock: price.toFixed(2), stockChange: change.toFixed(2) })
    );
  }

  render() {
    return (
      <div className="header">
        <h1>FINANCE VISUALIZER</h1>
        <div>
          <span>BTC / EUR: {this.state.btc}</span>
          {this.state.btc !== "loading..." ? (
            <span
              id="btcChange"
              style={{ color: getColor(this.state.btcChange) }}
            >
              {this.state.btcChange}%
            </span>
          ) : null}
        </div>
        <div>
          <span>S&P500: {this.state.stock}</span>
          {this.state.stock !== "loading..." ? (
            <span
              id="stockChange"
              style={{ color: getColor(this.state.stockChange) }}
            >
              {this.state.stockChange}%
            </span>
          ) : null}
        </div>
      </div>
    );
  }
}
