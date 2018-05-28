import React from 'react';
import $ from 'jquery';
import Filing from './Filing.jsx';
import App from '../index.jsx';

class Filings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filings: props.filings,
      updatedFilings: false,
    }

    this.getFilingUrl = this.getFilingUrl.bind(this);
    this.getFilingHTML = this.getFilingHTML.bind(this);
  }

  getFilingUrl(html) {
    let element = document.createElement('html');
    element.innerHTML = html;
    let filingUrl = element.getElementsByClassName('tableFile')[0]
                      .getElementsByTagName('tbody')[0]
                      .getElementsByTagName('tr')[1]
                      .getElementsByTagName('td')[2].innerHTML

    return filingUrl;
  }

  getFilingHTML(url, index) {
    $.ajax({ 
      method: 'POST',
      url: 'http://localhost:3000/filing',
      contentType: 'text/plain',
      data: url, 
      success: (data) => {
        let url = this.getFilingUrl(data);
        let sliceLimit = url.indexOf('>');
        let updatedUrl = 'https://www.sec.gov' + this.getFilingUrl(data).slice(9, sliceLimit - 1);
        console.log('new url', updatedUrl, index, this.getFilingUrl(data))
        this.state.filings[index].url = updatedUrl;
        if (index === this.state.filings.length - 1) {
          this.setState({
            updatedFilings: true
          })
        }
      },
      error: (error) => {
        console.log('Error on ajax post request: ', error);
      }
    });
  }

  updateFilingUrls() {
    this.state.filings.map((filing, index) => {
      let filingType = filing.filingType;
      let filingLandingPage = 'https://www.sec.gov' + filing.url.slice(9, 86);
      let date = filing.date;
      this.getFilingHTML(filingLandingPage, index);
    })
  }

  componentWillMount() {
    let updatedFilings = this.updateFilingUrls();
    this.setState({
      updatedFilings: updatedFilings
    })
  }

  render() {
    if (!this.state.updatedFilings) {
      return (
        <div id="loading">
          <img src="../../dist/Spinnger.png" />
        </div>
      )
    } else {
      return (
        this.state.filings.map((filing, index) => {
          return <Filing filingUrl={filing.url} 
                         filingType={filing.filingType} 
                         date={filing.date} />
        })
      )
    }
  }
}

export default Filings;