import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import Filings from './components/Filings.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filings: [],
      changedCompanies: false,
      company: ''
    }

    this.post = this.post.bind(this);
  }

  filterData(rows) {
    let data = {
      type: '',
      url: '',
      date: ''
    }
    let filings = [];

    //start at 3 and end at 1 less than length to get rows that contain filings
    for (let i = 3; i < rows.length - 1; i++) {
      let tds = rows[i].cells;

      data.type = tds[0].innerHTML;
      data.url = tds[1].innerHTML;
      data.date = tds[3].innerHTML;

      filings.push(data);
      data = {};
    }

    return filings;
  }

  getRows(html) {
    let element = document.createElement('html');
    element.innerHTML = html;
    let rows = element.getElementsByTagName('tr')
    return this.filterData(rows);
  }

  getCompanyName(html) {
    let element = document.createElement('html');
    element.innerHTML = html;
    let nameElement = element.getElementsByClassName('companyName')[0].innerHTML
    let sliceLimit = nameElement.indexOf('<');
    let name = nameElement.slice(0, sliceLimit - 1);

    return name;
  }

  post(company) {
    $.ajax({
      method: 'POST',
      url: '/',
      contentType: 'text/plain',
      data: company,
      success: (data) => {
        this.setState({
          filings: this.getRows(data),
          company: this.getCompanyName(data)
        })
        // console.log('Successful ajax post request: ', data);
      },
      error: (error) => {
        console.log('Error on ajax post request: ', error);
      }
    })
  }

  render() {
    if (this.state.filings.length > 0) {
      return (
        <div>
          <Search post={this.post} />
          <Filings filings={this.state.filings} company={this.state.company} />
        </div>
      )
    }
    return <Search post={this.post} filings={this.state.filings} />
  }
}

ReactDOM.render(<App />, document.getElementById('app'));