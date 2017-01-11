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
        {!this.props.loading
          ? <TrackList
            tracks={this.props.tracks}
            onTrackClick={track => this.props.onTrackClick(track)}
            onPlay={() => this.props.onPlay()}
            playingStatus={this.props.playingStatus}
          /> 
          : 'Loading...'
        }
      </div>
     );
  }
}

export default Result;
