const express = require('express');
const rootFinder = express();
const path = require('path');
rootFinder.use(express.static(path.join(__dirname, 'public')));

const getRoot = () => __dirname;

module.exports = getRoot;