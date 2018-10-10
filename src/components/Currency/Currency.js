import React, { Component } from 'react';

import './Currency.css';

class Currency extends Component {
  constructor(props){
    super(props);

    this.state = ({
      time: null,
      data: []
    });

  }






  componentDidMount() {
    let Dat = new Date();
    let year = Dat.getFullYear();
    let mounth = Dat.getMonth();
    let date = Dat.getDate();
    // let time = Dat.now();
    // console.log(`year is ${year} mounth is ${mounth} day is ${date}`);
    // console.log(`${date}.${mounth}.${year} `);
    fetch(`https://api.privatbank.ua/p24api/exchange_rates?json&date=${date}.${mounth}.${year}`)
      .then(response => response.json())
      // .then(data => console.log(data));
      .then(data => {
         let datas = [];

          data.exchangeRate.map((ob,key) => {
            // console.log(key);
            // console.log(ob);
            return datas.push(Object.entries(ob));
          });
         this.setState({
           time: data.data,
           data: datas
         })
      })
      .catch(error =>{
        console.log(`error with fetch`);
    })
  }

  render() {

    if(!this.state.data){
      return <div></div>
    }
    return (

      <div className="Currency">
        <table border="1">
          <thead>
            <tr>
              <th>baseCurrency</th>
              <th>currency</th>
              <th>saleRateNB</th>
              <th>purchaseRateNB</th>
              <th>saleRate</th>
              <th>purchaseRate</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((item,key)=>{
              if(key === 0) return null;
              return <tr key={key}>
                {item.map((item, key) => {
                  return <td key={key}> {item[1]} </td>
                })}
              </tr>
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Currency;
