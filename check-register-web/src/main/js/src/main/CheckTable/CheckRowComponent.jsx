import React from 'react';

import DatePicker from 'react-datepicker';

class CheckRowComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            transactionNameInput: this.getSafe(() => this.props.check.transactionName, ""),
            memoInput: this.getSafe(() => this.props.check.memo, ""),
            paymentInput: this.getSafe(() => this.props.check.payment.value, ""),
            depositInput: this.getSafe(() => this.props.check.deposit.value, ""),
            dateInput: (this.toDate(this.getSafe(() => this.props.check.date, null))),
            paymentFocus: false,
            depositFocus: false
        }

        this.handleEdit.bind(this);
        this.transactionInputChanged.bind(this);
        this.memoInputChanged.bind(this);
        this.paymentInputChanged.bind(this);
        this.depositInputChanged.bind(this);
        this.dateInputChanged.bind(this);
        this.handleDelete.bind(this);
        this.paymentInputFocused.bind(this);
        this.paymentInputBlurred.bind(this);
        this.depositInputFocused.bind(this);
        this.depositInputBlurred.bind(this);

        this.toDate.bind(this);
        this.isValidDate.bind(this);

        this.transactionInputRef = React.createRef();
        this.memoInputRef = React.createRef();
        this.paymentInputRef = React.createRef();
        this.depositInputRef = React.createRef();

        this.datePickerRef = React.createRef();
    }

    isValidDate(d) {
        return d instanceof Date && !isNaN(d);
      }

    toDate(millis){
        if(millis != null){
            let date = new Date(millis * 1000);
            return this.isValidDate(date) ? date : null;
        }
        return null;
    }


    resetState(){
        this.setState({
            transactionNameInput: this.getSafe(() => this.props.check.transactionName, ""),
            memoInput: this.getSafe(() => this.props.check.memo, ""),
            paymentInput: this.getSafe(() => this.props.check.payment.value, ""),
            depositInput: this.getSafe(() => this.props.check.deposit.value, ""),
            dateInput:  (this.getSafe(() => this.props.check.date, null)),
        });
    }

    handleEdit(){
        let updatedCheck = {
            ...this.props.check, //for id
            transactionName: this.state.transactionNameInput,
            memo: this.state.memoInput,
            payment: {
                value: this.state.paymentInput
            },
            deposit: {
                value: this.state.depositInput
            },
            date: this.getSafe(()=>this.state.dateInput.getTime()/1000, null)
        };
        
        this.props.handleEdit(updatedCheck);
    }

    //talk about this maybe for complexity; discuss how react handles rendering, accessing the dom, etc.
    giveFocus(){
        if(this.state.transactionNameInput){
            this.transactionInputRef.current.focus();
        } else if(this.state.memoInput){
            this.memoInputRef.current.focus();
        } else if(this.state.paymentInput){
            this.paymentInputRef.current.focus();
        } else if(this.state.depositInput){
            this.depositInputRef.current.focus();
        } else{
            //default behavior
            this.transactionInputRef.current.focus();
        }
    }

    getSafe(fn, defaultValue) {
        try {
            return fn();
        } catch (e) {
            return defaultValue;
        }
    }

    transactionInputChanged(event){
        this.setState({
            transactionNameInput: event.target.value
        }, this.handleEdit.bind(this));
    }

    memoInputChanged(event){
        this.setState({
            memoInput: event.target.value
        }, this.handleEdit.bind(this));
    }

    paymentInputChanged(event){
        this.setState({
            paymentInput: event.target.value
        }, this.handleEdit.bind(this));
    }

    depositInputChanged(event){
        this.setState({
            depositInput: event.target.value
        }, this.handleEdit.bind(this));
    }

    dateInputChanged(date){
        this.setState({
            dateInput: date
        }, this.handleEdit.bind(this));
    }

    handleDelete(event){
        const id = event.target.value
        this.props.handleDelete(id);
    }

    paymentInputFocused(){
        this.setState({
            paymentFocus: true
        });
    }

    paymentInputBlurred(event){
        this.setState({
            paymentFocus: false,
            paymentInput: parseFloat(event.target.value).toFixed(2)
        })
    }

    depositInputFocused(){
        this.setState({
            depositFocus: true
        });
    }

    depositInputBlurred(event){
        this.setState({
            depositFocus: false,
            depositInput: parseFloat(event.target.value).toFixed(2)
        })
    }

    render() {
        
        const defaultStr = "";
        let paymentInputStr = this.getSafe(() => this.state.paymentInput, "");
        let depositInputStr = this.getSafe(() => this.state.depositInput, "");

        let paymentInputValue = parseFloat(paymentInputStr);
        let depositInputValue = parseFloat(depositInputStr);

        const getDisplayValue = (value) => {
            return isNaN(value) ? defaultStr : Math.abs(value).toFixed(2);
        }

        return (
            <div className="check-row">
                <DatePicker selected={this.state.dateInput} onChange={this.dateInputChanged.bind(this)} className={this.props.classes.datePicker} ref={this.datePickerRef}/>
                <input value={this.getSafe(() => this.state.transactionNameInput, "")} placeholder="Name" ref={this.transactionInputRef} onChange={this.transactionInputChanged.bind(this)}></input>
                <input value={this.getSafe(() => this.state.memoInput, "")} placeholder="memo" ref={this.memoInputRef} onChange={this.memoInputChanged.bind(this)}></input>
                <input type="number" value={this.state.paymentFocus ? paymentInputStr : getDisplayValue(paymentInputValue)} placeholder="+0.00" ref={this.paymentInputRef} onChange={this.paymentInputChanged.bind(this)} onFocus={this.paymentInputFocused.bind(this)} onBlur={this.paymentInputBlurred.bind(this)}></input>
                <input type="number" value={this.state.depositFocus ? depositInputStr : getDisplayValue(depositInputValue)} placeholder="-0.00" ref={this.depositInputRef} onChange={this.depositInputChanged.bind(this)} onFocus={this.depositInputFocused.bind(this)} onBlur={this.depositInputBlurred.bind(this)}></input>
                {this.props.immutable ? null : <button className={this.props.classes.deleteButton} value={this.getSafe(()=> this.props.check.id)} onClick={this.handleDelete.bind(this)}></button>}
            </div>
        );
    }
}

export default CheckRowComponent