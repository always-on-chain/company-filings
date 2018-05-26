import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/Search.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filings: []
    }

    this.post = this.post.bind(this);
  }

  // parseData() {

  // }

  post(company) {
    $.ajax({
      method: 'POST',
      url: 'http://127.0.0.1:3000/home',
      contentType: 'text/plain',
      data: company,
      success: (data) => {
        console.log('Successful ajax post request: ', data);
      },
      error: (error) => {
        console.log('Error on ajax post request: ', error);
      }
    })
  }

  render() {
    return <Search post={this.post} />
  }
}

ReactDOM.render(<App />, document.getElementById('app'));