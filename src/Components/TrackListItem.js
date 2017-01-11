import React, { Component } from 'react';
import styled from 'styled-components';
import PlayButton from './buttons/PlayButton'

const styles = {
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
    const Prop = styled.div`
      color: ${this.props.playingStatus.playing && this.props.playingStatus.sampleUrl === track.preview_url ? 'rgba(46, 189, 89, 1)' : 'inherit'};
      flex: 1;
      fontSize: 15px;
    `;

    const Track = styled.div`
      display: flex;
      flexDirection: row;
      padding: 15px 10px;
      &:hover { 
        background-color: rgba(255, 255, 255, 0.1);
        cursor: pointer;
        cursor: hand;
      }
    `;
    return (
      <Track>
        <Prop>
          {track.name}
        </Prop>
        <Prop>
          {track.artists.map(artist => (
            artist.name
          ))}
        </Prop>
        <Prop>
          {track.album.name}
        </Prop>
        
      </Track>
     );
  }
}

export default TrackListItem;
