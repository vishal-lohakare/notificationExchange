import React from "react";
import { Component } from "react";
import Chart from '../charts/Charts';
//import Userinfo from '../Dashboard/Userinfo';
import PhaseOne from '../Dashboard/stock-list/PhaseOne';
import Stocktable from '../Dashboard/stock-list/StockTable';
import PhaseTwo from '../Dashboard/stock-list/PhaseTwo';
import Buy from '../Dashboard/Buy';
import Sell from '../Dashboard/Sell';
import MockData from '../../mockData.json';
import _ from 'underscore';
import Userinfo from './Userinfo';
import Header from './Header';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: MockData.stockData[0],
      exchangedata: MockData.exchangeData[0],
      phase1: [],
      phase2: []
    };
    this.handleBuy = this.handleBuy.bind(this);
    this.handleCancelPhase1Order = this.handleCancelPhase1Order.bind(this);
    this.handleCancelPhase2Order = this.handleCancelPhase2Order.bind(this);
    this.stockPriceVary = this.stockPriceVary.bind(this);

    setInterval(function () {
      this.stockPriceVary();
    }.bind(this), 5000);
  }
  stockPriceVary() {
    let randNumber = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
    let stockData = [...this.state.data];
    stockData = MockData.stockData[randNumber];
    this.state.exchangedata = MockData.exchangeData[randNumber];
    console.log('this.state.exchangedata', this.state.exchangedata);
    this.setState({ data: stockData });
  }
  handleBuy(stock, quantity) {
    let stockData1 = [...this.state.phase1];
    let stockData2 = [...this.state.phase2];
    let selectedStocks = { ...stock };
    selectedStocks.marketValue = stock.stockprize + Math.random();
    selectedStocks.holdingValue = selectedStocks.marketValue * quantity;
    selectedStocks.status = 'In Progress';
    stockData1.push(selectedStocks);


    setTimeout(function () {
      this.setState({ phase1: stockData1 });
    }.bind(this), 4000);

    setTimeout(function () {

      stockData1 = _.without(stockData1, selectedStocks);
      this.state.phase1 = stockData1;

      let selectedStocksPhase2 = { ...selectedStocks };
      selectedStocksPhase2.status = 'Order Placed';
      stockData2.push(selectedStocksPhase2);
      this.setState({ phase2: stockData2 });
    }.bind(this), 9000);
  }

  handleCancelPhase1Order(row) {
    let filtered = _(this.state.phase1).filter(function (item) {
      return item.name !== row.name
    });
    setTimeout(function () { this.setState({ phase1: filtered }); }.bind(this), 2000);
  }

  handleCancelPhase2Order(row) {
    let filtered = _(this.state.phase2).filter(function (item) {
      return item.name !== row.name
    });
    setTimeout(function () { this.setState({ phase2: filtered }); }.bind(this), 3000);
  }

  render() {

    return (
      <div className="col-md-12 demo-div heading-section">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <Header exchange={this.state.exchangedata[0]} />
        </div>



        <div className="margin-t-60">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <Stocktable originalData={MockData.stockData[0]} data={this.state.data} handleBuy={this.handleBuy} />
            <div> <Userinfo /> </div>
          </div>
        </div>
        <div className=" col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <div className="margin-b-20">
            <PhaseOne data={this.state.phase1} handleCancelPhase1Order={this.handleCancelPhase1Order} />
          </div>
          <div className="margin-b-60">
            <PhaseTwo data={this.state.phase2} handleCancelPhase2Order={this.handleCancelPhase2Order} />
          </div>

          <div>
            <Chart />
          </div>

        </div>



      </div>
    );
  }
}

export default Dashboard;