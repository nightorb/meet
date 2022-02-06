import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from "../CitySearch";
import { mockData } from '../mock-data';
import { extractLocations } from '../api';

describe('<CitySearch /> component', () => {
  let locations, CitySearchWrapper;
  beforeAll(() => {
    locations = extractLocations(mockData);
    CitySearchWrapper = shallow(<CitySearch locations={locations} />);
  });

  test('render text input', () => {
    expect(CitySearchWrapper.find('.city')).toHaveLength(1);
  });

  test('render a list of suggestions', () => {
    expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
  });

  test('render text input correclty', () => {
    const query = CitySearchWrapper.state('query');
    expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
  });

  test('change state when text input changes', () => {
    // set query state
    CitySearchWrapper.setState({
      query: 'Munich'
    });
    // change value once the change event is called
    const eventObject = { target: { value: 'Berlin' } };

    // simulate change on city, changing it into target value
    CitySearchWrapper.find('.city').simulate('change', eventObject);
    expect(CitySearchWrapper.state('query')).toBe('Berlin');
  });

  test('render list of suggestions correctly', () => {
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');

    // number of rendered suggestions compared to number of suggestions in the state of CitySearch + 1
    // + 1 is for the "see all cities" suggestion, so min lenght of list will be 1
    // rendered text is checked to ensure that's also been taken from state
    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      // loop through all suggestions and compare items one by one
      expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i]);
    }
  });

  test('suggestion list match the query when changed', () => {
    CitySearchWrapper.setState({ query: '', suggestions: [] });
    CitySearchWrapper.find('.city').simulate('change', {
      target: { value: 'Berlin' },
    });
    const query = CitySearchWrapper.state('query');
    const filteredLocations = locations.filter((location) => {
      return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
    });

    // toEqual used to campare array (similar to toBe, but for complex data types)
    expect(CitySearchWrapper.state('suggestions')).toEqual(filteredLocations);
  });

  test('selecting a suggestion should change query state', () => {
    CitySearchWrapper.setState({ query: 'Berlin' });
    const suggestions = CitySearchWrapper.state('suggestions');

    CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    expect(CitySearchWrapper.state('query')).toBe(suggestions[0]);
  });
});