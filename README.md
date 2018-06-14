# Company-Filings
Full stack app that enables users to access company filing documents quickly
https://company-filings.herokuapp.com/

# Overview
Currently, if you want to look up filing documents for public companies the flow goes as follows:
1. Enter company name on this page: https://www.sec.gov/edgar/searchedgar/companysearch.html 
2. Find correct company on this page: 
https://www.sec.gov/cgi-bin/browse-edgar?company=apple&owner=exclude&action=getcompany
3. Click Documents icon for particular filing on this page:
https://www.sec.gov/cgi-bin/browse-edgar?company=apple&owner=exclude&action=getcompany
4. Get filing document from this page: 
https://www.sec.gov/Archives/edgar/data/320193/000119312518154948/0001193125-18-154948-index.htm 

- This app simplifies this process, by just requiring users to enter trading symbol for desired company, and files show up in a few seconds.
- Also, this app enables users to filter filings based on type, which is not possible on the sec.gov website  

# Installation
- Install dependencies: npm install
- Start Webpack in Dev mode: npm run dev
- Start server: npm start
- To start, in your browser navigate to: http://localhost:3000