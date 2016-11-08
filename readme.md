# Pay Slip Generator

This monthly payslip generator is a fun code challenge I did for MYOB after General Assembly's WDI course. I started this task by writing the calculating logic javaScript on the client side along with csv file upload and download, which works perfectly from a client's point of view. However, after learning more about Node.js and javaScript testing frameworks, I restructured this application by moving the calculation logic to the server side which makes it easier for unit testing.

# Assumptions
- The client would be able to upload a CSV file in a web page.
- The application should create a monthly payslip in a CSV format for clients to download and would be good to also display it in the web page.
- The business logic should be tested to check validation in the development environment.

# How to use the application?

Simply go to the link https://awesome-payslip-generator.herokuapp.com/, upload a CSV file with your 'employee' details in the following format:

- first name, last name, annual salary, super rate (%), payment start date
- David,Rudd,60050,9%,01 March – 31 March
- Ryan,Chen,120000,10%,01 March – 31 March

Press the button 'Show payslip' to view the payslip on the web page or download payslip.csv by hitting the 'Download payslip' button.

# How to run the application?
- Fork this repository and clone it into your local depository.
- If you have node.js installed, run "npm install" to install the dependencies in the terminal under the root depository.
- To run the test file: "npm test" in the terminal under the root depository.

# Technologies involved:
- HTML5
- Javascript
- jQuery
- HTML5 file API
- Node.js
- Mocha and Chai for testing

# Dependencies:
- Express 4.14.0
- Chai 3.5.0
- Mocha 3.1.2
- body-parser 1.15.2
- csv-parse 1.1.7
- Multer 1.2.0

# Reference
- https://nodejs.org/api/fs.html
- https://cmatskas.com/importing-csv-files-using-jquery-and-html5

Thank you for stopping by.
