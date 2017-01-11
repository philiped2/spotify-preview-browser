import React, { Component } from 'react';
import rp from 'request-promise';
import MediaQuery from 'react-responsive';
import { spring } from 'react-motion';
import Transition from 'react-motion-ui-pack';
import Results from './Results';
import SearchField from './SearchField.js';
import PlayButton from './buttons/PlayButton';
import CloseButton from './buttons/CloseButton';


const requestOptions = {
  json: true
}

const styles = {

  wrapper: {
    height: '100%',
  },

}


class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedTrack: {},
      tracks: [],
      trackSampleUrl: '',
      playingSample: false,
      showAlbumCloseButton: false,
    };
  }
  
  handleSearchChange(searchValue) {
    console.log('Get new data from spotify by search: ', searchValue);
    // rp.get(`https://api.spotify.com/v1/search?q=${searchValue}"&type=track&offset=0&limit=50`).then(res => {
    //   console.log(res.data);
    // });

    rp(...requestOptions, { uri: `https://api.spotify.com/v1/search?q=${searchValue}"&type=track&offset=0&limit=50`}, () => {
      this.setState({ tracks: [], loading: true });
    })
    .then(response => {
      console.log('Received tracks');
      const parsedResponse = JSON.parse(response);
      this.setState({ tracks: parsedResponse.tracks.items, loading: false });
    })
    .catch(err => {
      console.log('Received error');
      console.log(err);
    });
  }

  handleTrackClick(selectedTrack) {
    this.setState({ selectedTrack: {} }, () => {
      this.setState({ selectedTrack });
    });
  }

  handlePlaySample() {
    let sampleUrl = this.state.selectedTrack.preview_url;
    let playStatus = true;

    if (this.state.trackSampleUrl === this.state.selectedTrack.preview_url && this.state.playingSample) {
      sampleUrl = '';
      playStatus = false;
    }

    this.setState({ trackSampleUrl: '' }, () => {
      this.setState({ trackSampleUrl: sampleUrl, playingSample: playStatus });
    });
  }

  handleHoverAlbumCover(hovering) {
    let showAlbumCloseButton = false;
    if (hovering) {
      showAlbumCloseButton = true;
    }

    this.setState({ showAlbumCloseButton });
  }

  handleAlbumCoverCloseButtonClick() {
    this.setState({ showAlbumCloseButton: false, selectedTrack: {} });
  }

  render() {
    return (
      <div style={styles.wrapper}> 
        {this.state.trackSampleUrl &&
          <audio autoPlay style={{ display: 'none' }}>
            <source src={this.state.trackSampleUrl} type="audio/ogg" />
          </audio>
        }
        <div style={{display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
          <div style={{ flex: 1, width: '100%', maxWidth: 700 }}>
            <SearchField onChange={searchValue => this.handleSearchChange(searchValue)}/>
            <div style={{ marginTop: 15 }}>
              <Results
                tracks={this.state.tracks}
                loading={this.state.loading}
                onTrackClick={track => this.handleTrackClick(track)}
                onPlay={() => this.handlePlaySample()}
                playingStatus={{ playing: this.state.playingSample, sampleUrl: this.state.trackSampleUrl }}
              />
            </div>
          </div>
        </div>

        <MediaQuery query='(min-device-width: 1224px)'>
          <Transition
            component={false}
            enter={{
              opacity: 1,
              translateX: 0
            }}
            leave={{
              opacity: 0,
              translateX: -300
            }}
          >
            {this.state.selectedTrack.hasOwnProperty('name') &&
              <div key="desktopSideNav" style={{ position: 'fixed', height: '100%', zIndex: 2, top: 0, width: 300, backgroundColor: '#1d1d1e', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                <div onMouseEnter={() => this.handleHoverAlbumCover(true)} onMouseLeave={() => this.handleHoverAlbumCover(false)}><img style={{ width: '100%' }} src={this.state.selectedTrack.album.images[1].url}></img></div>
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
                    <div onMouseEnter={() => this.handleHoverAlbumCover(true)} style={{ position: 'absolute', right: 5 }}><CloseButton size={40} onClick={() => this.handleAlbumCoverCloseButtonClick()} /></div>
                  }
                </Transition>
                <div style={{ marginTop: 5, padding: '0px 5px' }}>{this.state.selectedTrack.name}</div>
                <div style={{ marginTop: 5, fontSize: 15, padding: '0px 5px' }}>{this.state.selectedTrack.album.artists.map(artist => artist.name)}</div>
                <div style={{ marginTop: 5, fontSize: 13, padding: '0px 5px' }}>{this.state.selectedTrack.album.name}</div>
                <div style={{ marginTop: 15 }}>
                  <PlayButton onClick={() => this.handlePlaySample()} playing={this.state.playingSample && this.state.trackSampleUrl === this.state.selectedTrack.preview_url}/>
                </div>
              </div>
            }
          </Transition>
        </MediaQuery>

        <MediaQuery query='(max-device-width: 1224px)'>
          <Transition
            component={false}
            enter={{
              opacity: 1,
              translateY: 0
            }}
            leave={{
              opacity: 0,
              translateY: 100
            }}
          >
            {this.state.selectedTrack.hasOwnProperty('name') &&
              <div key="mobileSideNav" style={{ position: 'fixed', height: '100%', zIndex: 2, top: 0, width: '100%', backgroundColor: '#1d1d1e', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                <div style={{ position: 'absolute', right: 5 }}><CloseButton onClick={() => this.handleAlbumCoverCloseButtonClick()} /></div>
                <div><img style={{ width: '100%' }} src={this.state.selectedTrack.album.images[1].url}></img></div>
                <div style={{ marginTop: 5, padding: '0px 5px' }}>{this.state.selectedTrack.name}</div>
                <div style={{ marginTop: 5, fontSize: 15, padding: '0px 5px' }}>{this.state.selectedTrack.album.artists.map(artist => artist.name)}</div>
                <div style={{ marginTop: 5, fontSize: 13, padding: '0px 5px' }}>{this.state.selectedTrack.album.name}</div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'row', }}>
                  <div style={{ alignSelf: 'center', flex: 1 }}>
                    <PlayButton onClick={() => this.handlePlaySample()} playing={this.state.playingSample} />
                  </div>
                </div>
              </div>
            }
          </Transition>
        </MediaQuery>
  
      </div>
     );
  }
}

export default Content;
