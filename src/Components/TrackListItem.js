import React, { Component } from 'react';
import styled from 'styled-components';

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
      padding: 0px 10px
      flex: 1;
      fontSize: 15px;
    `;

    const Track = styled.div`
      display: flex;
      flexDirection: row;
      padding: 15px 0px;
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
          {track.artists.map((artist, index) => {
            let artistString = index > 0 ? `, ${artist.name}` : artist.name;
            return artistString;
          })}
        </Prop>
        <Prop>
          {track.album.name}
        </Prop>
        
      </Track>
     );
  }
}

export default TrackListItem;
