import React, { Component } from 'react';

let timer = '';

class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };
    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
  } 
  
  getTextFieldStyle() {
    return {
      height: 40,
      width: '100%',
      textAlign: 'center',
    }
  }

  fetchSearchResults(searchValue) {
    this.setState({ searchValue }, () => {
      console.log('Updated search value: ', this.state.searchValue);
      this.props.onChange(this.state.searchValue);
    });
  }
  
  handleSearchValueChange(event) {
    clearTimeout(timer);
    const searchValue = event.target.value;
    timer = setTimeout(() => {
      console.log(searchValue);
      this.fetchSearchResults(searchValue);
    }, 500);
  }
 
  render() {
    return (
      <div style={{ flexDirection: 'column', display: 'flex' }}>
        <div style={{ flex: 1, alignSelf: 'center', width: '100%', maxWidth: 700 }}>
          <input
            type="search"
            placeholder="Search music"
            style={this.getTextFieldStyle()}
            onChange={this.handleSearchValueChange}
          />
        </div>
      </div>
     )
  }
}

export default SearchField;
