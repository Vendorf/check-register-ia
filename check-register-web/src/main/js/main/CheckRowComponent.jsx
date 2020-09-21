import React from 'react';


class CheckRowComponent extends React.Component {

    constructor(props) { //pass check in props
        super(props);
        //stateless

        this.handleEdit.bind(this);
    }

    handleEdit() {

        //ok so this solution is retarded but it allows you to do it all in one method rather than make a new method for every textbox
        //I'd rather do that because while it is technically better to be able to do fine updates to the check rather than update every
        //single field, I might as well just update every field here and then server-side do finer checks and only update what's necessary
        //in the database. This is technically more error-prone but significantly less verbose on the front-end code front and will hence
        //be a lot easier to manage and understand in future, as well as easier to write at the moment, so I'm just doing that
        //Yes, it means I'm technically creating the check and then throwing it up to the parent which then sets its own check to the same
        //values then goes back down here passing props in order to update the view, which is less memory efficient and computationally
        //more intensive, but idgaf rn this is a tiny application; if it becomes a problem I have this wall of text to tell me how to do
        //it correctly so there you go

        let updatedCheck = {
                ...this.props.check, //for id; technically not necessary bc stateless but hey
                transactionName: this.refs.transactionInput.value,
                memo: this.refs.memoInput.value,
                payment: {
                    value: this.refs.paymentInput.value
                },
                deposit: {
                    value: this.refs.depositInput.value
                }
        };

        this.props.handleEdit(updatedCheck);
    }

    //talk about this maybe for complexity; discuss how react handles rendering, accessing the dom, etc.
    giveFocus(){
        console.log('giving focus')
        console.log('explicit ref', this.refs.transactionInput);
        console.log('explicit', this.refs.transactionInput.value);
        for(var each in this.refs){
            console.log('ref', this.refs[each])
            console.log('each', this.refs[each].value);
            if(this.refs[each].value){
                this.refs[each].focus();
            }
        }
        
        // if(this.refs.transactionInput.value){
        //     this.refs.transactionInput.focus();
        // }
    }

    getSafe(fn, defaultValue) {
        try {
            return fn();
        } catch (e) {
            return defaultValue;
        }
    }

    render() {

        //replace this with material ui Grid for better resize controls etc.
        //also use this: https://www.nicknish.co/blog/react-currency-input
            //react-text-mask and text-mask-addons already installed

        //https://reactdatepicker.com/ so robust!
        return (
            <div className="check-row">
                <input value={this.getSafe(() => this.props.check.transactionName, "")} placeholder="Name" ref="transactionInput" onChange={this.handleEdit.bind(this)}></input>
                <input value={this.getSafe(() => this.props.check.memo, "")} placeholder="memo" ref="memoInput" onChange={this.handleEdit.bind(this)}></input>
                <input value={this.getSafe(() => this.props.check.payment.value, "")} placeholder="+0.00" ref="paymentInput" onChange={this.handleEdit.bind(this)}></input>
                <input value={this.getSafe(() => this.props.check.deposit.value, "")} placeholder="-0.00" ref="depositInput" onChange={this.handleEdit.bind(this)}></input>
            </div>

            //old stateful implementation
            // <div>
            //     <div>
            //         <input value={this.getSafe(() => this.state.check.transactionName, "")} placeholder="Name" ref="transactionInput" onChange={this.handleEdit.bind(this)}></input>
            //         <input value={this.getSafe(() => this.state.check.memo, "")} placeholder="memo" ref="memoInput" onChange={this.handleEdit.bind(this)}></input>
            //     </div>
            //     <div>
            //         <input value={this.getSafe(() => this.state.check.payment.value, "")} placeholder="+0.00" ref="paymentInput" onChange={this.handleEdit.bind(this)}></input>
            //         <input value={this.getSafe(() => this.state.check.deposit.value, "")} placeholder="-0.00" ref="depositInput" onChange={this.handleEdit.bind(this)}></input>
            //     </div>
            // </div>
        );
    }
}

export default CheckRowComponent