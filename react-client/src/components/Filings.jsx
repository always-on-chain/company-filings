import React from 'react';
import $ from 'jquery';

class Filings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filings: props.filings,
      updatedFilings: false,
      types: {
        All: true
      },
      currentType: 'All',
      company: props.company
    }

    this.getFilingUrl = this.getFilingUrl.bind(this);
    this.getFilingHTML = this.getFilingHTML.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getFilingUrl(html) {
    let element = document.createElement('html');
    element.innerHTML = html;
    // console.log('element', element)
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
      let sliceLimit = filing.url.indexOf('id');
      let filingLandingPage = 'https://www.sec.gov' + filing.url.slice(9, sliceLimit - 2);
      console.log('filingLandingPage', filingLandingPage)
      this.getFilingHTML(filingLandingPage, index);
    })
  }

  getTypes() {
    this.state.filings.map((filing) => {
      this.state.types[filing.type] = true || false;
    })
  }

  handleChange(event) {
    this.setState({
      currentType: event.target.value
    })
  }

  componentWillMount() {
    this.getTypes();
    let updatedFilings = this.updateFilingUrls();
    this.setState({
      updatedFilings: updatedFilings
    })
  }

  render() {
    if (!this.state.updatedFilings) {
      return <div id="incomplete">Loading...</div>
    } else {
      // console.log('Filings in Filings', this.state.filings)
      return (
        <div>
          Filter by Type
          <select onChange={this.handleChange}>
            {Object.keys(this.state.types).map((type) => {
              return <option value={type}>{type}</option>
            })}
          </select>
          
          <div>
            Filings for {this.state.company}
          </div>

          <table>
            <tr><td>Type</td><td>Filing</td><td>Date</td></tr>
            {this.state.filings.map((filing, index) => {
              if (filing.type === this.state.currentType || this.state.currentType === 'All') {
                return (
                  <tr>
                    <td>{filing.type}</td>
                    <td><a href={filing.url} target="_blank">{filing.url}</a></td>
                    <td>{filing.date}</td>
                  </tr>
                )
              }
            })}
          </table>
        </div>
      )
    }
  }
}

export default Filings;