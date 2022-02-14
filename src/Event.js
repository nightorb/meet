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
    const { collapsed } = this.state;

    return (
      <div className="event">
        <h3 className="title">{event.summary}</h3>
        <div className="event-body">
          { event.start && event.start.dateTime && event.start.timeZone && (
            <p className="date">
              {event.start.dateTime} ({event.start.timeZone})
            </p>
          )}
          <p className="location">{event.location}</p>

          { !collapsed && (
            <div className="event-details">
              <a href={event.htmlLink} target="_blank" rel="noreferrer" className="link">
                See details on Google Calendar
              </a>
              <p className="description">{event.description}</p>
            </div>
          )}
          <button className="toggle-details" onClick={this.handleButtonClick}>
            { collapsed ? "Show Details" : "Hide Details" }
          </button>
        </div>
      </div>
    );
  }
}

export default Event;
