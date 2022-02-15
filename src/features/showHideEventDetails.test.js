import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount, shallow } from 'enzyme';

import { mockData } from '../mock-data';

import App from '../App';
import EventList from '../EventList';
import Event from '../Event';

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
  let AppWrapper, EventWrapper;

  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the list of events is showing', () => {
      AppWrapper = mount(<App />);
      expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    when('the user doesn\'t click anything', () => {
      // nothing happens
    });

    then('each event\'s details will be collapsed', () => {
      EventWrapper = shallow(<Event event={mockData} />);
      expect(EventWrapper.state('collapsed')).toBe(true);
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('the user wanted to know more about a certain event', () => {
      const EventListWrapper = shallow(<EventList events={mockData} />)
      expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
    });

    when('the user clicks the “show more” button', () => {
      EventWrapper.find('.toggle-details').simulate('click');
    });

    then('the event\'s details will be revealed', () => {
      expect(EventWrapper.state('collapsed')).toBe(false);
      expect(EventWrapper.find('.event-details')).toHaveLength(1);
      expect(EventWrapper.find('.toggle-details').text()).toBe('Hide Details');
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    given('the user has expanded the event before', () => {
      EventWrapper.setState({
        collapsed: false
      });
    });

    when('the user clicks the “show less” button of the expanded event', () => {
      EventWrapper.find('.toggle-details').simulate('click');
    });

    then('the event will collapse to hide its details', () => {
      expect(EventWrapper.state('collapsed')).toBe(true);
      expect(EventWrapper.find('.event-details')).toHaveLength(0);
      expect(EventWrapper.find('.toggle-details').text()).toBe('Show Details');
    });
  });
});
