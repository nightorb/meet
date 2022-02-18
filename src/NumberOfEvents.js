import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    errorText: ''
  }

  handleInputChanged = (e) => {
    const value = e.target.value;
    if (value < 1 || value > 32) {
      this.setState({
        numberOfEvents: e.target.value,
        errorText: 'Select a number from 1 to 32.'
      });
    } else {
      this.setState({
        numberOfEvents: value,
        errorText: ''
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
        <ErrorAlert text={this.state.errorText} />
      </div>
    )
  }
}

export default NumberOfEvents;
