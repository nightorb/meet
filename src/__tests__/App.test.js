import React from "react";
import { shallow, mount } from 'enzyme';

import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from "../NumberOfEvents";

describe('<App /> component', () => {
  let AppWrapper;

  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render NumberOfEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

// create new scope to separate unit test from integration test
describe('<App /> integration', () => {
  let AppWrapper;

  beforeEach(() => {
    AppWrapper = mount(<App />);
  });

  afterEach(() => {
    // clean up DOM after each test so it won't affect other tests
    AppWrapper.unmount();
  });

  test('App passes "events" state as a prop to EventList', () => {
    AppWrapper.update();
    const AppEventsState = AppWrapper.state('events');

    // check whether state of events isn't undefined (important for next step)
    expect(AppEventsState).not.toEqual(undefined);

    // compare state of App's "events" with EventList's "events" prop to ensure it's been passed correctly
    // checking for undefined necessary because this comparison would still pass if both are undefined
    // meaning both could not exist and test would still pass!
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    AppWrapper.update();
    const AppLocationsState = AppWrapper.state('locations');

    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
  });

  test('get list of events matching the city selected by the user', async () => {
    const CitySearchWrapper = AppWrapper.find(CitySearch);

    // locations extracted from events themselves: doesn't include "see all cities" option
    const locations = extractLocations(mockData);

    // suggestions state set to have available cities
    CitySearchWrapper.setState({
      suggestions: locations
    });
    const suggestions = CitySearchWrapper.state('suggestions');

    // holds index of selected suggestion from suggestions array
    // Math.floor... evaluates integer value ranging from 0 to suggestion.length -1
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));

    // once index is selected, it's used to return actual suggestion
    const selectedCity = suggestions[selectedIndex];

    // click is mimicked by calling handleItemClicked method from CitySearch: possible by calling instance()
    // add await because it has async code fetching full list of events before filtering list of events that match selected city
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);

    // getEvents: async function that gets all events from API or mock data
    const allEvents = await getEvents();

    // list of all events filtered against selected location to find events that have same location
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);

    // compare whether state of events takes same array as result from previous event filtering
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
  });

  test('get list of all events when user selects "see all cities"', async () => {
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');

    // simulate click on last item which is always "see all cities"
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const allEvents = await getEvents();

    expect(AppWrapper.state('events')).toEqual(allEvents);
  });

  test('App passes "numberOfEvents" state as a prop to NumberOfEvents', () => {
    const AppNumberOfEventsState = AppWrapper.state('numberOfEvents');

    expect(AppNumberOfEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toEqual(32);
  });

  test('render EventList with specified number of events', async () => {
    const allEvents = await getEvents();
    AppWrapper.setState({
      events: allEvents,
      numberOfEvents: 1
    });

    const EventListWrapper = AppWrapper.find(EventList);
    expect(EventListWrapper.props().events.length).toBeLessThanOrEqual(AppWrapper.state('numberOfEvents'));
  });
});
