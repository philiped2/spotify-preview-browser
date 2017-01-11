import React, { Component } from 'react';
import TrackList from './TrackList';

class Result extends Component {
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
