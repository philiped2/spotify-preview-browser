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

  header: {
    textAlign: 'center',
    color: '#2EBD59',
  }
}

class App extends Component {
  render() {
    return (
      <div style={styles.wrapper}>
          <div style={{ flex: 1, width: '100%' }}>
            <Header style={styles.header}/>
            <Content />
          </div>
      </div>
    );
  }
}

export default App;
