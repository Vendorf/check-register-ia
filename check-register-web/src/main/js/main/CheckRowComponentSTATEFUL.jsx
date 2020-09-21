import React from 'react';

class CheckRowComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            check: this.props.check
        };

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
                transactionName: this.refs.transactionInput.value,
                memo: this.refs.memoInput.value,
                payment: {
                    value: this.refs.paymentInput.value
                },
                deposit: {
                    value: this.refs.depositInput.value
                }
        }

        this.setState((prevState) => ({
            check: { 
                //right now this does a total replace of the state rather than a merge, so going to have to fix that later via some solution
                //https://stackoverflow.com/questions/18933985/this-setstate-isnt-merging-states-as-i-would-expect
                //just keep in mind the principle that:
                    //Because this.props and this.state may be updated asynchronously, you should not rely on their values for calculating the next state.
                
                    ...prevState.check, //this is just for the id; if we had more immutable properties, would also be populated with this
                transactionName: this.refs.transactionInput.value,
                memo: this.refs.memoInput.value,
                payment: {
                    value: this.refs.paymentInput.value
                },
                deposit: {
                    value: this.refs.depositInput.value
                }
            }
        }), /*this callback is for testing purposes, can remove later*/()=>{console.log(this.state.check)});
        //service call to update server database
    }

    getSafe(fn, defaultValue) {
        try {
            return fn();
        } catch (e) {
            return defaultValue;
        }
    }


    render() {
        return (
            <div>
                <input value={this.getSafe(() => this.state.check.transactionName, "")} placeholder="Name" ref="transactionInput" onChange={this.handleEdit.bind(this)}></input>
                <input value={this.getSafe(() => this.state.check.memo, "")} placeholder="memo" ref="memoInput" onChange={this.handleEdit.bind(this)}></input>
                <input value={this.getSafe(() => this.state.check.payment.value, "")} placeholder="+0.00" ref="paymentInput" onChange={this.handleEdit.bind(this)}></input>
                <input value={this.getSafe(() => this.state.check.deposit.value, "")} placeholder="-0.00" ref="depositInput" onChange={this.handleEdit.bind(this)}></input>
            </div>


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