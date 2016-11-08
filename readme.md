# Pay Slip Generator

This simple monthly payslip generator is a fun code challenge I did for myob after General Assembly's WDI course.

# Assumptions
- The client would be able to upload a CSV file in a web page.
- The application should create a monthly payslip in a CSV format and would be good to also display it in the web page.


# How to use it?

Simply go to the link https://gingernutter.github.io/payslip_generator/, upload a CSV file with employee information in the following format:

- first name, last name, annual salary, super rate (%), payment start date
- David,Rudd,60050,9%,01 March – 31 March
- Ryan,Chen,120000,10%,01 March – 31 March

Press the button 'Show payslip' to view the payslip on the web page or download payslip.csv by hitting the 'Download payslip' button.

# Technologies involved:
- HTML5
- Javascript
- jQuery
- HTML5 file API
- Node.js

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
