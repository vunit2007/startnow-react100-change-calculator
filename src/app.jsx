import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = { 
        dueAmount: 0, 
        receivedAmount: 0, 
      };

      this.handleDueAmount = this.handleDueAmount.bind(this);
      this.handleReceivedAmount = this.handleReceivedAmount.bind(this);
      this.calcChange = this.calcChange.bind(this);

    }
    handleDueAmount(event) {
      console.log('due amount done');
      this.setState({
        dueAmount: parseFloat(event.target.value)
      });
    }
    handleReceivedAmount(event) {
      console.log('received amount done');
      this.setState({
        receivedAmount: parseFloat(event.target.value)
      });
    
    }
    
  // exactChangeF(loggedAmount) {
  //       var res = {};
  //       [2000, 1000, 500, 100, 25, 10, 5, 1].forEach(function (coin) {
  //           res[coin] = Math.floor(loggedAmount / coin);
  //           loggedAmount = loggedAmount % coin;
  //       });
  //       return res;
  //   }


  calcChange(event) {
    event.preventDefault();
    const {dueAmount, receivedAmount} = this.state
    let due = dueAmount;
    let received = receivedAmount;
    let whatsLeft = received - due;
    let calc = whatsLeft;
    let calcc= (received * 100) - (due * 100);
    let whatsLeftt = Math.round(calcc);
    let res = {};
    [2000, 1000, 500, 100, 25, 10, 5, 1].forEach(function (coin) {
        res[coin] = Math.floor(whatsLeftt / coin);
        whatsLeftt = whatsLeftt % coin;
    });

    this.setState({twenties: res[2000], tens: res[1000], fives: res[500], ones: res[100], quarters: res[25], dimes: res[10], nickles: res[5], pennies: res[1]}) 
    this.setState({result: calc.toFixed(2)})
    

  }  
  render() {
    return (
<div className="container">
<div className="centerPlease">
<h1>Change</h1>
    <form onSubmit={this.calcChange}>

    <div className="card" id="firstcard">
  <div className="card-header" id="cardHeaderOne">
    Transaction
  </div>

  <ul className="topPart"><br />
    <label htmlFor="dueLabel" id="boldplease">How much is due?</label><br />
      <input type="number" value={this.state.dueAmount} onChange={this.handleDueAmount} name="amountDue" className="dueInput" id="input" /><br/>
    <label htmlFor="receivedLabel" id="boldplease">How much was received?</label><br/>
    <input type="number" value={this.state.receivedAmount} onChange={this.handleReceivedAmount} name="amountReceived" className="receivedInput" id="input" />
   <br />
    <button type="calculate" name="submit" className='btn'>Submit</button><br/>
    
  </ul>
</div>


<div className="card" id="firstcard">
  <div className="card-header" id="cardHeaderTwo">
    Exact Change
  </div>
<br/>
  <table>
    <tr>
        <td><label htmlFor="dueLabel">$20</label><p>{this.state.twenties}</p> </td>
        <td> <label htmlFor="receivedLabel">$10</label><p>{this.state.tens}</p></td>
        <td><label htmlFor="dueLabel">$5</label><p>{this.state.fives}</p></td>
        <td><label htmlFor="receivedLabel" id="boldplease">$1</label><p>{this.state.ones}</p></td>
    </tr>
    <tr>
        <td> <label htmlFor="dueLabel">Quarters</label><p>{this.state.quarters}</p> </td>
        <td><label htmlFor="receivedLabel">Dimes</label> <p>{this.state.dimes}</p> </td>
        <td><label htmlFor="dueLabel">Nickles</label><p>{this.state.nickles}</p> </td>
        <td> <label htmlFor="receivedLabel">Pennies</label> <p>{this.state.pennies}</p> </td>
    </tr>
</table>


  {/* <ul className="topPart"><br />
    <label htmlFor="dueLabel" id="boldplease">$20:</label><p>{this.state.twenties} </p> 
     <br />
    <label htmlFor="receivedLabel" id="boldplease">$10:</label><p>{this.state.tens} </p>
    <br/>
    <label htmlFor="dueLabel" id="boldplease">$5:</label><p> {this.state.fives}</p> 
     <br />
    <label htmlFor="receivedLabel" id="boldplease">$1:</label><p>{this.state.ones} </p>
    <br/>
    <label htmlFor="dueLabel" id="boldplease">Quarters:</label><p> {this.state.quarters}</p> 
     <br />
    <label htmlFor="receivedLabel" id="boldplease">Dimes:</label> <p> {this.state.dimes}</p>
    <br/>
    <label htmlFor="dueLabel" id="boldplease">Nickles:</label><p> {this.state.nickles}</p> 
     <br />
    <label htmlFor="receivedLabel" id="boldplease">Pennies:</label> <p>{this.state.pennies} </p>

   <br />

    
  </ul> */}

</div>


{/* <div className="changeTable">
<div className="whatsLeftCol">
<p id="output" name="whatsLeft">{this.state.result}</p>
  </div>
  <div id="change-table">
        <p>Twenties: <span>{this.state.twenties}</span></p>
        <p>Tens: <span>{this.state.tens}</span></p>
        <p>Fives: <span>{this.state.fives}</span></p>
        <p>Ones: <span>{this.state.ones}</span></p>
        <p>Quarters: <span>{this.state.quarters}</span></p>
        <p>Dimes: <span>{this.state.dimes}</span></p>
        <p>Nickles: <span>{this.state.nickles}</span></p>
        <p>Pennies: <span>{this.state.pennies}</span></p>
    </div>
  </div> */}

  </form>
  <h2>Calculator</h2>
  </div>
</div>

    );
  }
}
export default App;

