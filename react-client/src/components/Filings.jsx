import React from 'react';
import Filing from './Filing.jsx'

const Filings = (props) => {
  return (
    props.filings.map((filing) => {
      let filingType = filing.filingType;
      let url = 'https://www.sec.gov' + filing.url.slice(9, 86);
      let date = filing.date;

      return (
        <Filing filingType={filingType} url={url} date={date} />
        // <div id="filing">
        //   <p>{filingType}</p>
        //   <a href={url} target="_blank">{url}</a>
        //   <p>{date}</p>
        // </div>
      )
    })
  )
}

export default Filings;