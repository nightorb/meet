import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';

import App from '../App';
import NumberOfEvents from '../NumberOfEvents';
import EventList from '../EventList';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  let AppWrapper, NumberOfEventsWrapper;

  test('When user hasn\'t specified a number, 32 is the default number', ({ given, when, then }) => {
    given('the user hasn\'t specified a number of events they want to see', () => {
      // nothing happens
    });

    when('the user is on the main page', () => {
      AppWrapper = mount(<App />);
    });

    then('32 events will be displayed at once', () => {
      expect(AppWrapper.find(EventList)).toHaveLength(1);
      expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toEqual(32);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    given('the user has specified a number of events they want to see', () => {
      // basically the same as "when", except that user hasn't done anything yet
    });

    when('the user specifies a number in the textbox', () => {
      NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      NumberOfEventsWrapper.find('.number-of-events').simulate('change', { target: { value: 1} });
    });

    then('the specified number of events will be displayed at once', () => {
      const EventListWrapper = AppWrapper.find(EventList);
      expect(EventListWrapper.props().events.length).toBeLessThanOrEqual(AppWrapper.state('numberOfEvents'));
      expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(1);
    });
  });
});
