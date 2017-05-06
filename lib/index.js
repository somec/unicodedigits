"use strict"

//------------------------------------------------------------------------------
var unicode = require('./unicode')
//------------------------------------------------------------------------------
var NDCLASS_LIST= unicode.nd;  
var NDCLASS_KEY =
  NDCLASS_LIST.reduce(
    function (output, item) {
      output[item.name] = item;
      return output;
    },
    {}
  );
//------------------------------------------------------------------------------
  // Detect if javascript enginge has support for extended mode
  function detectExtendedMode() {
    var result = true;
    try { /\u{40}/u; }
    catch (error) { result = false; }
    return result;
  }
//------------------------------------------------------------------------------
  function leadingZero(input,width,base) {
    var output = input.toString(base||10);
    while (output.length < width)
      output = '0' + output;
    return output;
  }
//------------------------------------------------------------------------------
  // Returns an escaped regex unicode point
  function reUnicode(input, extended) {
    return extended ?
      "\\u{" + input.toString(16) + "}" :
      "\\u" + leadingZero(input,4,16);
  }
//------------------------------------------------------------------------------
  // Returns an escaped regex unicode range
  function reRange(first, last, reExtended) {
    var output;
    if (reExtended || first < 0x10000) {
      output = '['
        + reUnicode(first, reExtended)
        + '-'
        + reUnicode(last, reExtended)
        + ']';
    } else {
      var
        mpoint  = first - 0x10000,
        high    = 0xD800 + (mpoint >> 10),
        low     = 0xDC00 + (mpoint & 0x3FF);
        output = reUnicode(high, false)
          +'['
          + reUnicode(low, false)
          + '-'
          + reUnicode(low + (last-first), false)
          + ']';
    }
    return output;
  }
//------------------------------------------------------------------------------
  // Some ranges of digits starts witht the lower 4 bits at 0,
  // some at 6, and the matematical starts anywhere...
  // To simplify the function that translates the ranges,
  // all ranges with offset 0 is in one group, all offset 6
  // in another group, and then the mathematical in a third group.
  function makeRegexDigits(reExtended) {
    return NDCLASS_LIST.reduce(
      function (output, item) {
        var group =
          (item.zero >= 0x1D7CE && item.zero <= 0x1D7FF) ? 2 :
          (item.zero & 15) === 0 ? 0 :
          (item.zero & 6) === 6 ? 1 :
          null;
        output[group].push( reRange(item.zero, item.zero + 9, reExtended ) );
        return output;
      },
      [ [], [], [] ]
    )
    .map(
      function (input) {
        return '(' + input.join('|') + ')';
      }
    )
    .join('|')
  }
//------------------------------------------------------------------------------
  function reReplaceDigits(digitClassName) {
    var digitClass = NDCLASS_KEY[ digitClassName || 'ASCII' ];
    if (!digitClass || !digitClass.zero) {
      throw Error('Unknown digitClassName: "' + digitClassName + '"');
    }
    return function reReplace(match, offset0, offset6, offsetMath) {

      // Get the charCode of the last character of match 
      var raw = match.charCodeAt( match.length - 1);
      var digit =
        offset0 ? raw & 0xF : // use 4 bits
        offset6 ? (raw -6) & 0xF : // subtract 6, use 4 bits
        offsetMath ? ((raw - 0xCE) & 0x3F) % 10 : // subtract CE, use 6 bits
        null;

      if (digit === null)
        throw Error('digit is null');

      return unicode.fromCodePoint(digitClass.zero + digit);
    }
  }
//------------------------------------------------------------------------------
  var reExtendedMode = detectExtendedMode();

  var reDigits = new RegExp(
    makeRegexDigits(reExtendedMode),
    'g' + (reExtendedMode ?  'u' : '')
  );
//------------------------------------------------------------------------------
  module.exports={
    _regSource : makeRegexDigits(reExtendedMode),
    replaceDigits :
      function replaceDigits(input, digitClass) {
        return input.replace( reDigits, reReplaceDigits(digitClass) )
      },
    classes  : Object.keys(NDCLASS_KEY)
  }
//------------------------------------------------------------------------------
