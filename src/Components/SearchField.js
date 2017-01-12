import React, { Component } from 'react';
import ReactGA from 'react-ga';
import styled from 'styled-components';

const ga = ReactGA.initialize('UA-67282727-2');

let timer = '';

const SearchInput = styled.input`
  height: 35px;
  width: 100%;
  text-align: center;
  border: none;
  borderRadius: 4px;
  &:focus, &:focus{
    outline: none;
  }
  background-color: #4f4f4f;
  color: #ffffff;
`;

class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };
    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
  } 

  fetchSearchResults(searchValue) {
    this.setState({ searchValue }, () => {
      console.log('Updated search value: ', this.state.searchValue);
      this.props.onChange(this.state.searchValue);
    });
  }

  logSearch(searchValue) {
    ReactGA.event({
      category: 'General',
      action: 'Searched',
      label: searchValue,
    });
    console.log('Logged search');
  }
  
  handleSearchValueChange(event) {
    clearTimeout(timer);
    const searchValue = event.target.value;
    timer = setTimeout(() => {
      console.log(searchValue);
      this.logSearch(searchValue);
      this.fetchSearchResults(searchValue);
    }, 500);
  }
 
  render() {
    console.log(ReactGA);
    return (
      <div style={{ flexDirection: 'column', display: 'flex', padding: '0px 10px' }}>
        <div style={{ flex: 1, alignSelf: 'center', width: '100%', maxWidth: 700, }}>
          <SearchInput
            type="search"
            placeholder="Search music"
            onChange={this.handleSearchValueChange}
          />
        </div>
      </div>
     )
  }
}

export default SearchField;
