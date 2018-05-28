import React from 'react';

const Filing = (props) => {
  return (
    <div id="filing">
      <p>{props.filingType}</p>
      <a href={props.filingUrl} target="_blank">{props.filingUrl}</a>
      <p>{props.date}</p>
    </div>
  )
}

export default Filing;