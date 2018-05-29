import React from 'react';
import Filings from './Filings.jsx';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';


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
          <div id="search-text">Search Company</div>

          <FormControl
            type="text"
            value={this.state.company}
            placeholder='Enter company trading symbol (i.e. "AAPL")'
            onChange={this.handleChange}
            id="search-company"
          />
          
          <Button bsStyle="success" bsSize="small" type="submit" id="search-button">Find</Button>
        </form>
        {/* <Filings filings={this.state.filings} /> */}
      </div>
    )
  }
}

export default Search;