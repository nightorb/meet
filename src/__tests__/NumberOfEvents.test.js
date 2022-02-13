import React from "react";
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  let updateNumberOfEvents = jest.fn();

  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateNumberOfEvents={updateNumberOfEvents} />);
  });

  test('render text input', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
  });

  test('render text input correctly', () => {
    const numberOfEvents = NumberOfEventsWrapper.state('numberOfEvents');
    expect(NumberOfEventsWrapper.find('.number-of-events').prop('value')).toBe(numberOfEvents);
  });

  test('change state when text input changes', () => {
    const changeNumber = { target: { value: 16} };
    NumberOfEventsWrapper.find('.number-of-events').simulate('change', changeNumber);
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(16);
    expect(updateNumberOfEvents).toHaveBeenCalled();
  });
});
