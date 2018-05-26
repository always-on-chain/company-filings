import React from 'react';

const Filing = (props) => {
  return (
    <div id="filing">
      <p>{props.filingType}</p>
      <a href={props.url} target="_blank">{props.url}</a>
      <p>{props.date}</p>
    </div>
  )
}

export default Filing;