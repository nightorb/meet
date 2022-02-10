import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32
  }

  handleInputChanged = (e) => {
    this.setState({
      numberOfEvents: e.target.value
    });
  }

  render() {
    return (
      <div className="NumberOfEvents">
        <input
          type="number"
          className="number-of-events"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    )
  }
}

export default NumberOfEvents;
