import React, { Component } from 'react';
import rp from 'request-promise';
import MediaQuery from 'react-responsive';
import Transition from 'react-motion-ui-pack';
import ReactHowler from 'react-howler'
import Results from './Results';
import SearchField from './SearchField.js';
import TrackController from './TrackController';

const requestOptions = {
  json: true
}

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedTrack: {},
      tracks: [],
      sampleUrl: '',
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
    // this.setState({ selectedTrack: {} }, () => {
    //   console.log('Selected track', selectedTrack);
    //   this.setState({ selectedTrack });
    // });

    this.setState({ selectedTrack });
  }

  handlePlaySample() {
    let sampleUrl = this.state.selectedTrack.preview_url;
    let playStatus = true;

    if (this.state.sampleUrl === this.state.selectedTrack.preview_url && this.state.playingSample) {
      playStatus = false;
    }

    this.setState({ sampleUrl: sampleUrl, playingSample: playStatus });
  }

  handleStopSample() {
    this.setState({ playingSample: false });
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
      <div>
        {/*this.state.sampleUrl &&
          <audio autoPlay style={{ display: 'none' }}>
            <source src={this.state.sampleUrl} type="audio/ogg" />
          </audio>
        */}

        {this.state.playingSample &&
          <ReactHowler
            src={this.state.sampleUrl}
            playing={this.state.playingSample}
            format={['mp3']}
            onEnd={() => this.handleStopSample()}
          />
        }

        

        <div style={{display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
          <div style={{ width: '100%', padding: '10px 0px', backgroundColor: '#282828' }}>
            <SearchField onChange={searchValue => this.handleSearchChange(searchValue)}/>
          </div>
          <div style={{ flex: 1, width: '100%', maxWidth: 700 }}>
            <div style={{ marginTop: 15 }}>
              <Results
                tracks={this.state.tracks}
                loading={this.state.loading}
                onTrackClick={track => this.handleTrackClick(track)}
                onPlay={() => this.handlePlaySample()}
                playingStatus={{ playing: this.state.playingSample, sampleUrl: this.state.sampleUrl }}
              />
            </div>
          </div>
        </div>

        <MediaQuery query='(min-device-width: 480px)'>
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
                <TrackController track={this.state.selectedTrack} playingSample={this.state.playingSample} sampleUrl={this.state.sampleUrl} onPlaySample={() => this.handlePlaySample()} onClose={() => this.handleAlbumCoverCloseButtonClick()} />
              </div>
            }
          </Transition>
        </MediaQuery>

        <MediaQuery query='(max-device-width: 480px)'>
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
              <div key="mobileFullNav" style={{ position: 'fixed', height: '100%', zIndex: 2, top: 0, width: '100%', background: 'linear-gradient(to top, #0a0a0a, #494949)', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                <TrackController mobile track={this.state.selectedTrack} playingSample={this.state.playingSample} sampleUrl={this.state.sampleUrl} onPlaySample={() => this.handlePlaySample()} onClose={() => this.handleAlbumCoverCloseButtonClick()} />
              </div>
            }
          </Transition>
        </MediaQuery>
  
      </div>
     );
  }
}

export default Content;
