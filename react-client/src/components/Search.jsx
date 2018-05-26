import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    return ( 
      <form onSubmit={this.handleClick}>
        <label>
          Search Company
          <input type="text" value={this.state.company} id="input" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default Search;