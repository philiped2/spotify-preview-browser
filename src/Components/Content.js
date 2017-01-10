import React, { Component } from 'react';
import rp from 'request-promise';
import Results from './Results';
import SearchField from './SearchField.js';

const requestOptions = {
  json: true
}

const styles = {

  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
  },

}

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showResults: false,
      tracks: [],
    };
  }
  
  handleSearchChange(searchValue) {
    console.log('Get new data from spotify by search: ', searchValue);
    // rp.get(`https://api.spotify.com/v1/search?q=${searchValue}"&type=track&offset=0&limit=50`).then(res => {
    //   console.log(res.data);
    // });

    rp(...requestOptions, { uri: `https://api.spotify.com/v1/search?q=${searchValue}"&type=track&offset=0&limit=50`})
    .then(response => {
      console.log('Received tracks');
      const parsedResponse = JSON.parse(response);
      this.setState({ tracks: parsedResponse.tracks.items });
    })
    .catch(err => {
      console.log('Received error');
      console.log(err);
    });
  }

  render() {
    return (
      <div style={styles.wrapper}> 
        <div style={{ flex: 1, width: '100%' }}>
          <SearchField onChange={searchValue => this.handleSearchChange(searchValue)}/>
          <Results tracks={this.state.tracks} />
        </div>
      </div>
     );
  }
}

export default Content;
