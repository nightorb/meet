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

  test('render collapsed event view', () => {
    expect(EventWrapper.find('.title')).toHaveLength(1);
    expect(EventWrapper.find('.date')).toHaveLength(1);
    expect(EventWrapper.find('.location')).toHaveLength(1);
    expect(EventWrapper.find('.toggle-details')).toHaveLength(1);
    expect(EventWrapper.find('.toggle-details').text()).toBe('Show Details');
  });

  test('event is collapsed by default', () => {
    expect(EventWrapper.state('collapsed')).toBe(true);
  });

  test('open event details when button is clicked', () => {
    EventWrapper.setState({
      collapsed: true
    });
    EventWrapper.find('.toggle-details').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(false);
  });

  test('render additional event details when expanded', () => {
    expect(EventWrapper.find('.event-details')).toHaveLength(1);
    expect(EventWrapper.find('.link')).toHaveLength(1);
    expect(EventWrapper.find('.description')).toHaveLength(1);
  });

  test('hide event details when button is clicked', () => {
    EventWrapper.setState({
      collapsed: false
    });
    EventWrapper.find('.toggle-details').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(true);
  });
});
