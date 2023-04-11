const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express(); // Initialize the app

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const appRoutes = require('./public/a/app');

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve static files from the public directory
app.use('/app', appRoutes);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'a', 'login.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
