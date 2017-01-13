import React, { Component } from 'react';
import Transition from 'react-motion-ui-pack';
import PlayButton from './buttons/PlayButton';
import CloseButton from './buttons/CloseButton';

class TrackController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlbumCloseButton: props.mobile ? true : false,
    }
  }

  handleHoverAlbumCover(hovering) {
    let showAlbumCloseButton = false;
    if (hovering) {
      showAlbumCloseButton = true;
    }

    this.setState({ showAlbumCloseButton });
  }

  render() {
    const track = this.props.track;
    return (
      <div>
        <div onMouseEnter={() => this.handleHoverAlbumCover(true)} onMouseLeave={() => this.handleHoverAlbumCover(false)}>
          <Transition
            component={false}
            enter={{
              opacity: 1,
              translateX: 0
            }}
            leave={{
              opacity: 0,
            }}
          >
            {this.state.showAlbumCloseButton &&
              <div key="albumCloseButton" onMouseEnter={() => this.handleHoverAlbumCover(true)} style={{ position: 'absolute', right: 5 }}><CloseButton size={40} onClick={() => this.props.onClose()} /></div>
            }
          </Transition>
          <img alt="album-cover" style={{ width: '100%' }} src={track.album.images[1].url} />
        </div>
          
        <div style={{ marginTop: 5, padding: '0px 5px', fontSize: 20, fontWeight: 'bold' }}>{track.name}</div>
        <div style={{ marginTop: 5, fontSize: 15, padding: '0px 5px' }}>{track.album.artists.map(artist => artist.name)}</div>
        <div style={{ marginTop: 5, fontSize: 13, padding: '0px 5px' }}>{track.album.name}</div>
        <div style={{ marginTop: 15 }}>
          <PlayButton onClick={() => this.props.onPlaySample()} playing={this.props.playingSample && this.props.sampleUrl === track.preview_url}/>
        </div>
      </div>
  )};
}

export default TrackController;
