import React, { Component } from 'react'
import './Calculator.css'
import '../components/Button.css'
import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
    clearValue: false,
    operation: null,
    values: [0, 0],
    current: 0
}


export default class Calculator extends Component {

    state = {...initialState}

    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.addDigit = this.addDigit.bind(this)
        this.setOperation = this.setOperation.bind(this)
    }

    clearMemory() {
        this.setState({...initialState})
    }

    setOperation(operation){
       if(this.state.current === 0){
           this.setState({operation, current: 1, clearDisplay: true})
       } else {
           const calculation = operation === '=';
           const currentOperation = this.state.operation;//caso tenha ja uma operação na memória
           const values = [...this.state.values];
           try {
            values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`); //eval mas pode substituir um switch
           } catch(e) {
            values[0] = this.state.values[0]
           }
           
           values[1] = 0;
           this.setState({
               displayValue: values[0].toString(),
               operation: calculation ? null : operation,
               current: calculation ? 0 : 1,
               clearDisplay: !calculation,
               values: values
           })
        }
        
    }

    addDigit(n){
        let i = this.state.current;
        if(n === '.' && this.state.displayValue.includes('.')){
            return
        }

        const clearDisplay = this.state.displayValue === '0' 
        || this.state.clearDisplay;

        const currentValue = clearDisplay ? '' : this.state.displayValue;

        const displayValue = currentValue + n;

        console.log(displayValue);

        this.setState({displayValue, clearDisplay: false})

        if(this.state.operation !== null){
            i = 1;
        }

        if(n !== '.'){
            const newValue = parseFloat(displayValue); 
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({values})
            console.log(values)
        }
    }

    render(){

        return (

            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" triple click = {this.clearMemory}/>
                <Button label="/" operation click = {this.setOperation}/>
                <Button label="7" click = {this.addDigit}/>
                <Button label="8" click = {this.addDigit}/>
                <Button label="9" click = {this.addDigit}/>
                <Button label="*" operation click = {this.setOperation}/>
                <Button label="4" click = {this.addDigit}/>
                <Button label="5" click = {this.addDigit}/>
                <Button label="6" click = {this.addDigit}/>
                <Button label="-" operation click = {this.setOperation}/>
                <Button label="1" click = {this.addDigit}/>
                <Button label="2" click = {this.addDigit}/>
                <Button label="3" click = {this.addDigit}/>
                <Button label="+" operation click = {this.setOperation}/>
                <Button label="0" double click = {this.addDigit}/>
                <Button label="." click = {this.addDigit}/>
                <Button label="=" operation click = {this.setOperation}/>
            </div>
        )
    }

}