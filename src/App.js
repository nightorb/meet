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
  }

  async componentDidMount() {
    // load events when app loads, make API call and save initial data to state
    // only update state if this.mounted is true to prevent that component unmounts before API call finished
    this.mounted = true;

    if (navigator.onLine && !window.location.href.startsWith('http://localhost')) {
      const accessToken = localStorage.getItem('access_token');
      const isTokenValid = (await checkToken(accessToken)).error ? false : true;
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');

      this.setState({
        showWelcomeScreen: !(code || isTokenValid)
      });
      console.log('this mounted: ', this.mounted, 'isTokenValid: ', isTokenValid, ' BEFORE IF (CODE OR ISTOKENVALID)');

      if ((code || isTokenValid) && this.mounted) {
        console.log('this mounted: ', this.mounted, 'isTokenValid: ', isTokenValid, ' INSIDE IF CHECK');
        getEvents().then((events) => {
          console.log('this mounted: ', this.mounted, 'isTokenValid: ', isTokenValid, ' AND getEvents reached');
          if (this.mounted) {
            this.setState({
              events,
              locations: extractLocations(events)
            });
          }
        });
      }
    } else {
      console.log('this mounted: ', this.mounted, ' WHEN OFFLINE');
      getEvents().then((events) => {
        console.log('getEvents reached while offline');
        if (this.mounted) {
          this.setState({
            events,
            locations: extractLocations(events)
          });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = async (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all')
        ? events
        : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents,
        location
      });
    });
  }

  updateNumberOfEvents = async (length) => {
    this.setState({
      numberOfEvents: length
    });
  }

  render() {
    const { numberOfEvents, locations, events, infoText, showWelcomeScreen } = this.state;

    return (
      <div className="App">
        <h1>Welcome to Meet!</h1>
        { 
          !navigator.onLine &&
          <div id="offline-alert-wrapper" style={infoText ? {} : { display: 'none' }}>
            <InfoAlert text={"You are offline. New events can not be loaded."} />
          </div>
        }
        <div className="search-wrapper">
          <h2>Search for developer events in your city.</h2>
          <NumberOfEvents numberOfEvents={numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents} />
          <CitySearch locations={locations} updateEvents={this.updateEvents} />
        </div>
        <EventList events={events.slice(0, numberOfEvents)} />
        {
          navigator.onLine && 
          <WelcomeScreen showWelcomeScreen={showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
        }
      </div>
    );
  }
}

export default App;
