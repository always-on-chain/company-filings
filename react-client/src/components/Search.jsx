import React from 'react';

const Search = (props) => {
  return (
  <form>
    <label>
      Search Company
      <input type="text" name="name" id="input" />
    </label>
    <input type="submit" value="Submit" />
  </form>
  )
}

export default Search;