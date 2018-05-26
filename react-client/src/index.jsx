import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import Filings from './components/Filings.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filings: []
    }

    this.post = this.post.bind(this);
  }

  filterLinks(links) {
    //filter links that have 'documentsbutton' id
    let documentsButtonLinks = [];

    for (let i = 0; i < links.length; i++) {
      if (links[i].id === 'documentsbutton') {
        documentsButtonLinks.push(links[i]);
      }
    }

    console.log('documentButtonsLinks', documentsButtonLinks)
    return documentsButtonLinks;
  }

  getLinks(html) {
    let element = document.createElement('html');
    element.innerHTML = html;
    let links = element.getElementsByTagName('a');

    return this.filterLinks(links);
  }

  post(company) {
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/',
      contentType: 'text/plain',
      data: company,
      success: (data) => {
        this.setState({
          filings: this.getLinks(data)
        })
        console.log('state', this.state.filings)
        // console.log('Successful ajax post request: ', data);
      },
      error: (error) => {
        console.log('Error on ajax post request: ', error);
      }
    })
  }

  render() {
    return (
      <div id="components">
        <Search post={this.post} />
        <Filings filings={this.state.filings} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));