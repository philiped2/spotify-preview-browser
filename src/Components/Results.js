import React, { Component } from 'react';
import Transition from 'react-motion-ui-pack';
import TrackList from './TrackList';

class Result extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <TrackList tracks={this.props.tracks} />
      </div>
     );
  }
}

export default Result;
