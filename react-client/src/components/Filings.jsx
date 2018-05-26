import React from 'react';

const Filings = (props) => {
  return (
    props.filings.map((filing) => {
      let stringElement = filing.outerHTML;
      console.log('stringElement', typeof stringElement, stringElement);
      let getLink = 'https://www.sec.gov' + stringElement.slice(9, 86);
      console.log('sliced link', getLink)

      return <a href={getLink} target="_blank">{getLink}</a>
    })
  )
}

export default Filings;