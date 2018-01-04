import React, { Component } from "react";
import { connect } from 'react-redux';
import { up, down, left, right } from '../actions';

class Counter extends Component {
    upIfOdd = () => {
        // Extra: Implement an increment function that
        // only increments if the counter value is odd
        if (this.props.count % 2 !== 0) {
            this.props.up(); 
        }
    };

    upAsync = () => {
        // Extra: Implement an increment function that
        // increments after waiting for one second
        setTimeout(() => this.props.up(), 1000); 
    };

    render() {
        // Fill in the two button onClick methods
        // Upon clicking these buttons, the count
        // should decrement or increment accordingly
        return (
            <p>
                Clicked: {this.props.count} times
                {" "}
                <button onClick={() => this.props.upifOdd() }>
                    +
                </button>
                {" "}
                <button onClick={() => this.props.down() }>
                    -
                </button>
                {" "}
                 { }
                { 
                <button onClick={this.upIfOdd}>
                    up if odd
                </button>
                {" "}
                <button onClick={this.upAsync}>
                    up async
                </button> 
            </p>
        );
    }
};

// The mapStateToProps function specifies which portion of the 
// state tree this component needs to receive. In this case, 
// since our redux store is only storing the value of the count,
// this component receives the whole state. In a more complex
// redux application, though, it would receive only the relevant
// parts it needs from the state object.

const mapStateToProps = (state) => {
    const dogs = state.dogs;
    return {
       count: state
    };
};

// The connect function is called in order to make this component aware
// of the rest of the redux architecture. Without this, this component
// is only a dumb React component. We pass in all of the functions that
// are reliant on Redux, along with the component itself, so that Redux
// makes itself known to this component.
const connected = connect(mapStateToProps, { up, down, left, right });
export default connect(Counter);