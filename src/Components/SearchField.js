import React, { Component } from 'react';

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
  
  handleSearchValueChange(event) {
    const searchValue = event.target.value;
    this.setState({ searchValue }, () => {
      console.log('Updated search value: ', this.state.searchValue);
      this.props.onChange(this.state.searchValue);
    });
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
