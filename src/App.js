import React, { Component } from 'react';
import Header from './Components/Header.js';
import Content from './Components/Content.js';
import './App.css';

const styles = {

  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
  },
}

class App extends Component {
  render() {
    return (
      <div style={styles.wrapper}>
          <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Header/>
            <div style={{ flex: 1 }}>
              <Content />
            </div>
          </div>
      </div>
    );
  }
}

export default App;
