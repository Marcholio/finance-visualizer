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
    .then(
      res =>
        res.data.BTCEUR.ask - (res.data.BTCEUR.ask - res.data.BTCEUR.bid) / 2
    )
    .catch(err => {
      console.log(err);
      return "Not available";
    });

export default class Header extends Component {
  state = { btc: "loading..." };

  componentWillMount() {
    loadBtcPrice().then(price => this.setState({ btc: price.toFixed(2) }));
  }

  render() {
    return <div>BTC / EUR: {this.state.btc}</div>;
  }
}
