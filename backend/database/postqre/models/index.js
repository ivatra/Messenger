const models = require('require-all')({
    dirname: __dirname,
    filter: /(.+Model)\.js$/,
  });
  
  module.exports = models;