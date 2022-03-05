import React, { Component } from 'react';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import {InfoAlert} from './Alert';

import { extractLocations, getEvents, checkToken, getAccessToken } from './api';

import './App.css';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    showWelcomeScreen: undefined,
    infoText: ''
  }

  async componentDidMount() {
    // load events when app loads, make API call and save initial data to state
    // only update state if this.mounted is true to prevent that component unmounts before API call finished
    this.mounted = true;

    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    this.setState({
      showWelcomeScreen: !(code || isTokenValid)
    });

    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events,
          locations: extractLocations(events)
        });
      }
    });

    if (!navigator.onLine) {
      this.setState({
        infoText: 'You are offline. New events can not be loaded.'
      });
    } else {
      this.setState({
        infoText: ''
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all')
        ? events
        : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }

  updateNumberOfEvents = (length) => {
    this.setState({
      numberOfEvents: length
    });
  }

  render() {
    const { numberOfEvents, locations, events, infoText, showWelcomeScreen } = this.state;
    if (showWelcomeScreen === undefined) return <div className="App" />

    return (
      <div className="App">
        <h1>Welcome to Meet!</h1>
        <div id="offline-alert-wrapper" style={infoText ? {} : { display: 'none' }}>
          <InfoAlert text={infoText} />
        </div>
        <div className="search-wrapper">
          <h2>Search for developer events in your city.</h2>
          <NumberOfEvents numberOfEvents={numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents} />
          <CitySearch locations={locations} updateEvents={this.updateEvents} />
        </div>
        <EventList events={events.slice(0, numberOfEvents)} />
        <WelcomeScreen showWelcomeScreen={showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;
