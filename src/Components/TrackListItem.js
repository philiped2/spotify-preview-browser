import React, { Component } from 'react';

const styles = {
  track: {
    display: 'flex',
    flexDirection: 'row',
    margin: '5px 0px',
  },
  prop: {
    flex: 1,
    fontSize: 15,
  },
}

class TrackListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track: props.track,
    }
  }
  render() {
    const track = this.state.track;
    return (
      <div style={styles.track}>
        <div style={styles.prop}>
          {track.name}
        </div>
        <div style={styles.prop}>
          {track.artists.map(artist => (
            artist.name
          ))}
        </div>
        <div style={styles.prop}>
          {track.album.name}
        </div>
        
      </div>
     );
  }
}

export default TrackListItem;
