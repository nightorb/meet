import React, { Component } from 'react';

class Event extends Component {
  state = {
    collapsed: true
  }

  handleButtonClick = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const { event } = this.props;

    return (
      <div className="event">
        <h3 className="summary">{event.summary}</h3>
        <p className="dateTime">{event.dateTime}</p>
        <p className="timeZone">{event.timeZone}</p>
        <p className="location">{event.location}</p>
        <button className="show-details" onClick={this.handleButtonClick}>show details</button>

        <div className="event-details">
          <a href={event.htmlLink} className="htmlLink">See details on Google Calendar</a>
          <p className="description">{event.description}</p>
          <button className="hide-details" onClick={this.handleButtonClick}>hide details</button>
        </div>
      </div>
    );
  }
}

export default Event;
