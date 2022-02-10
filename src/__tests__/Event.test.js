import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component' ,() => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData} />);
  });

  test('render event', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1);
  });

  test('render event summary', () => {
    expect(EventWrapper.find('.summary')).toHaveLength(1);
  });

  test('render event date', () => {
    expect(EventWrapper.find('.dateTime')).toHaveLength(1);
  });

  test('render event time zone', () => {
    expect(EventWrapper.find('.timeZone')).toHaveLength(1);
  });

  test('render event location', () => {
    expect(EventWrapper.find('.location')).toHaveLength(1);
  });

  test('render show more button', () => {
    expect(EventWrapper.find('.show-details')).toHaveLength(1);
  });

  test('event is collapsed by default', () => {
    expect(EventWrapper.state('collapsed')).toBe(true);
  });

  test('open event details when button is clicked', () => {
    EventWrapper.setState({
      collapsed: true
    });
    EventWrapper.find('.show-details').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(false);
  });

  test('render event details', () => {
    expect(EventWrapper.find('.event-details')).toHaveLength(1);
  });

  test('render google calendar link', () => {
    expect(EventWrapper.find('.htmlLink')).toHaveLength(1);
  });

  test('render event description', () => {
    expect(EventWrapper.find('.description')).toHaveLength(1);
  });

  test('hide event details when button is clicked', () => {
    EventWrapper.setState({
      collapsed: false
    });
    EventWrapper.find('.hide-details').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(true);
  });
});
