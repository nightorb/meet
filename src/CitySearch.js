import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: undefined,
    infoText: ''
  }

  handleInputChanged = (e) => {
    const value = e.target.value;
    this.setState({
      showSuggestions: true
    });
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });

    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText: 'We can not find the city you are looking for.'
      });
    } else {
      return this.setState({
        query: value,
        suggestions,
        infoText: ''
      });
    }
  }

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      suggestions: [],
      showSuggestions: false,
      infoText: ''
    });

    this.props.updateEvents(suggestion);
  }

  render() {
    const { infoText, query, showSuggestions, suggestions } = this.state;

    return (
      <div className="CitySearch">
        <div id="info-alert-wrapper" style={infoText ? {} : { display: 'none' }}>
          <InfoAlert text={infoText} />
        </div>
        <label className="input-label">in</label>
        <input
          type="text"
          className="city"
          placeholder="select a city"
          value={query}
          onChange={this.handleInputChanged}
          onFocus={() => this.setState({ showSuggestions: true })}
        />
        <ul className="suggestions" style={showSuggestions ? {} : { display: 'none' }}>
          { suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
            >{suggestion}</li>
          ))}
          <li onClick={() => this.handleItemClicked('all')}>
            <b>See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;
