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
      url: '/filing',
      contentType: 'text/plain',
      data: url, 
      success: (data) => {
        let url = this.getFilingUrl(data);
        let sliceLimit = url.indexOf('>');
        let updatedUrl = 'https://www.sec.gov' + this.getFilingUrl(data).slice(9, sliceLimit - 1);
        // console.log('new url', updatedUrl, index, this.getFilingUrl(data))
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

  updateFilingUrls(filings) {
    filings.map((filing, index) => {
      let sliceLimit = filing.url.indexOf('id');
      let filingLandingPage = 'https://www.sec.gov' + filing.url.slice(9, sliceLimit - 2);
      // console.log('filingLandingPage', filingLandingPage)
      this.getFilingHTML(filingLandingPage, index);
    })
  }

  getTypes(filings) {
    filings.map((filing) => {
      this.state.types[filing.type] = true || false;
    })
    // console.log('types', this.state.types)
  }

  handleChange(event) {
    this.setState({
      currentType: event.target.value
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filings: nextProps.filings,
      updatedFilings: false,
      currentType: 'All',
      company: nextProps.company
    })
    this.getTypes(nextProps.filings);
    this.updateFilingUrls(nextProps.filings);
  }

  componentWillMount() {
    this.getTypes(this.state.filings);
    this.updateFilingUrls(this.state.filings);
  }


  render() {
    if (!this.state.updatedFilings) {
      return <div id="incomplete">Loading...</div>
    } else {
      return (
        <div id="filings">
          <div id="company-name">
            Filings for {this.state.company}
          </div>

          <div id="types">
            Filter by Type
            <select onChange={this.handleChange} id="menu">
              {Object.keys(this.state.types).map((type) => {
                return <option value={type}>{type}</option>
              })}
            </select>
          </div>

          <table id="filings-table">
            <tr id="table-header"><td>Type</td><td>Filing</td><td>Date</td></tr>
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