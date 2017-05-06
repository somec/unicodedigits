
var nd = require('../index.js');

var digits = '0 1 2 3 4 5 6 7 8 9';

nd.classes.forEach(
  function ( name ) {
    console.log("%s : %s", nd.replaceDigits( digits, name ), name );
  }
);
