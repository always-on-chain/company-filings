import React from 'react';
import Filings from './Filings.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filings: props.filings,
      company: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.post = props.post.bind(this);
  }

  handleClick(event) {
    this.post(this.state.company);
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      company: event.target.value
    })
  }

  render() {
    // console.log('filings in search', this.state.filings)
    return ( 
      <div>
        <form onSubmit={this.handleClick}>
          <label>
            Search Company
            <input type="text" value={this.state.company} id="input" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {/* <Filings filings={this.state.filings} /> */}
      </div>
    )
  }
}

export default Search;