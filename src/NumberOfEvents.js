import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32
  }

  handleInputChanged = (e) => {
    const value = e.target.value;
    if (value < 1 || value > 50) {
      this.setState({
        numberOfEvents: e.target.value,
        infoText: 'Please enter a number between 1 and 50.'
      });
    } else {
      this.setState({
        numberOfEvents: value,
        infoText: ''
      });

      this.props.updateNumberOfEvents(value);
    }
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
        <div className="error-alert" text={this.state.infoText} />
      </div>
    )
  }
}

export default NumberOfEvents;
