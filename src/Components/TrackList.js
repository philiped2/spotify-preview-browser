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
          <div style={{ display: 'flex', flexDirection: 'row', fontSize: 20 }}>
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
        
        {this.props.tracks.map(track => (
          <Transition
            component="div"
            enter={{
              opacity: 1,
            }}
            leave={{
              opacity: 0,
            }}
            style={{ margin: '10px 0px'}}
          >
            <hr style={{ borderColor: 'rgba(255, 255, 255, 0.7)' }}/>
            <TrackListItem track={track} style={{ margin: '5px 0px'}} />
          </Transition>
        ))}
      </div>
     );
  }
}

export default TrackList;
