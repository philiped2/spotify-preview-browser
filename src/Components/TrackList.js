import React, { Component } from 'react';
import Transition from 'react-motion-ui-pack';
import TrackListItem from './TrackListItem';

class TrackList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.tracks.length > 0 &&
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 1 }}>
              <h2>Track</h2>
            </div>
            <div style={{ flex: 1 }}>
              <h2>Artist</h2>
            </div>
            <div style={{ flex: 1 }}>
              <h2>Album</h2>
            </div>
          </div>
        }
        
        {this.props.tracks.map(track => (
          <Transition
            component="div"
            enter={{
              opacity: 1,
              translateY: 0
            }}
            leave={{
              opacity: 0,
              translateY: 150
            }}
          >
            <TrackListItem track={track} style={{ margin: '5px 0px'}} />
          </Transition>
        ))}
      </div>
     );
  }
}

export default TrackList;
