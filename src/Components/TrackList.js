import React, { Component } from 'react';
import Transition from 'react-motion-ui-pack';
import TrackListItem from './TrackListItem';

class TrackList extends Component {
  render() {
    return (
      <div>
        {this.props.tracks.length > 0 &&
          <div style={{ display: 'flex', flexDirection: 'row', fontSize: 20, color: 'rgba(255, 255, 255, 0.8)', marginBottom: 10, padding: '0px 10px' }}>
            <div style={{ flex: 1 }}>
              Track
            </div>
            <div style={{ flex: 1 }}>
              Artist
            </div>
            <div style={{ flex: 1 }}>
              Album
            </div>
          </div>
        }

        <Transition
          component="div"
          enter={{
            opacity: 1,
          }}
          leave={{
            opacity: 0,
          }}
        >
          {this.props.tracks.map(track => (
            <div onClick={() => this.props.onTrackClick(track)} key={track.id}>
              <hr style={{ borderColor: 'rgba(255, 255, 255, 0.1)', margin: 0, padding: 0 }}/>
              <TrackListItem
                track={track}
                onPlay={() => this.props.onPlay()}
                playingStatus={this.props.playingStatus}
              />
            </div>
          ))}
        </Transition>
        
      </div>
     );
  }
}

export default TrackList;
