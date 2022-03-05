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
        <div id="error-alert-wrapper" style={this.state.infoText ? {} : { display: 'none' }}>
          <ErrorAlert text={this.state.errorText} />
        </div>
        <label className="input-label">show me</label>
        <input
          type="number"
          className="number-of-events"
          placeholder="enter a number"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />
        <label className="input-label">event(s)</label>
      </div>
    )
  }
}

export default NumberOfEvents;
