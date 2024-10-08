// defines all routes to not be verified

const whitelist = [
    '/welcome',
    '/auth/signup',
    '/auth/login'
  ];
  
  module.exports = { whitelist };