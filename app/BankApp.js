import React, { Component } from 'react';
import { render } from 'react-dom';
import BankBalanceStore from './BankBalanceStore'; 
import BankActions from './BankActions';

class App extends Component { 
    constructor(){
        super(...arguments); 
            BankActions.createAccount(); 
        this.state = {
            balance: BankBalanceStore.getState()
        }
    }
    componentDidMount() {
        this.storeSubscription = BankBalanceStore.addListener(
            data => this.handleStoreChange(data)
        );
    }
    componentWillUnmount() { 
        this.storeSubscription.remove();
    }
    handleStoreChange(){
        this.setState({balance: BankBalanceStore.getState()});
    }
    deposit() { 
        BankActions.depositIntoAccount(
        Number(this.refs.ammount.value)); 
        this.refs.ammount.value = '';
    }
    withdraw() { 
        BankActions.withdrawFromAccount(
        Number(this.refs.ammount.value)); 
        this.refs.ammount.value = '';
    }
    render(){ 
        return (
            <div>
            <header>FluxTrust Bank</header>
            <h1>Your balance is ${(this.state.balance).toFixed(2)}</h1> <div className="atm">
            <input type="text" placeholder="Enter Ammount" ref="ammount" /> <br />
            <button onClick={this.withdraw.bind(this)}>Withdraw</button> <button onClick={this.deposit.bind(this)}>Deposit</button>
            </div> </div>
            );
    }
}
render(<App />, document.getElementById('root'));