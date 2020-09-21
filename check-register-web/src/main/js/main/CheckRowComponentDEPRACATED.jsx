import React from 'react';

class CheckRowComponent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            //id: this.props.id,
            transactionName: this.props.transactionName,
            memo: this.props.memo,
            payment: this.props.payment,
            deposit: this.props.deposit
        }
    }

    handleUserChange(){
        this.setState( (prevState) => ({
            transactionName: this.refs.transactionInput.value,
            memo: this.refs.memoInput.value,
            payment: {
                symbol: prevState.deposit?.symbol,
                value: this.refs.paymentInput.value
            },
            deposit: {
                symbol: prevState.deposit?.symbol,
                value: this.refs.depositInput.value
            }

        }) );
    }

    getSafe(fn, defaultValue){
        try{
            return fn();
        }catch(e){
            return defaultValue;
        }
    }

    render(){
        return (
        <div>
            <div>
                <input value={this.state.transactionName} placeholder="Name" ref="transactionInput" onChange={this.handleUserChange.bind(this)}></input>
                <input value={this.state.memo} placeholder="memo" ref="memoInput" onChange={this.handleUserChange.bind(this)}></input>
            </div>
            <div>
                <input value={/*this.getSafe(()=>this.state.payment.symbol, "") + */this.getSafe(()=>this.state.payment.value, "")} placeholder="$0.00" ref="paymentInput" onChange={this.handleUserChange.bind(this)}></input>
                <input value={/*this.getSafe(()=>this.state.deposit.symbol, "") + */this.getSafe(()=>this.state.deposit.value, "")} placeholder="$0.00" ref="depositInput" onChange={this.handleUserChange.bind(this)}></input>
            </div>
            
        </div>
        )
    };
}

export default CheckRowComponent