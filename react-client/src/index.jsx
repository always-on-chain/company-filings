import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/Search.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filings: []
    }
  }
  
  render() {
    return <Search />
  }
}

ReactDOM.render(<App />, document.getElementById('app'));