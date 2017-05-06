"use strict"

module.exports.fromCodePoint =
  function fromCodePoint(input) {
    if (typeof input !== 'number')
      throw TypeError('Expected a number');
    if (
      !isFinite(input) ||
      input < 0 ||
      input > 0x10FFFF ||
      (Math.round(input) !== input)
    )
      throw RangeError('Expected an integer between 0-0x10FFFF');

    if (input < 0x10000)
      return String.fromCharCode(input);

    input -= 0x10000;

    return String.fromCharCode(
      0xD800 + (input >> 10),
      0xDC00 + (input & 0x3FF)
    );
  }

module.exports.nd =
  [
    [0x0030, "ASCII" ],
    [0x0660, "ARABIC-INDIC" ],
    [0x06F0, "EXTENDED ARABIC-INDIC" ],
    [0x07C0, "NKO" ],
    [0x0966, "DEVANAGARI" ],
    [0x09E6, "BENGALI" ],
    [0x0A66, "GURMUKHI" ],
    [0x0AE6, "GUJARATI" ],
    [0x0B66, "ORIYA" ],
    [0x0BE6, "TAMIL" ],
    [0x0C66, "TELUGU" ],
    [0x0CE6, "KANNADA" ],
    [0x0D66, "MALAYALAM" ],
    [0x0DE6, "SINHALA LITH" ],
    [0x0E50, "THAI" ],
    [0x0ED0, "LAO" ],
    [0x0F20, "TIBETAN" ],
    [0x1040, "MYANMAR" ],
    [0x1090, "MYANMAR SHAN" ],
    [0x17E0, "KHMER" ],
    [0x1810, "MONGOLIAN" ],
    [0x1946, "LIMBU" ],
    [0x19D0, "NEW TAI LUE" ],
    [0x1A80, "TAI THAM HORA" ],
    [0x1A90, "TAI THAM THAM" ],
    [0x1B50, "BALINESE" ],
    [0x1BB0, "SUNDANESE" ],
    [0x1C40, "LEPCHA" ],
    [0x1C50, "OL CHIKI" ],
    [0xA620, "VAI" ],
    [0xA8D0, "SAURASHTRA" ],
    [0xA900, "KAYAH LI" ],
    [0xA9D0, "JAVANESE" ],
    [0xA9F0, "MYANMAR TAI LAING" ],
    [0xAA50, "CHAM" ],
    [0xABF0, "MEETEI MAYEK" ],
    [0xFF10, "FULLWIDTH" ],
    [0x104A0, "OSMANYA" ],
    [0x11066, "BRAHMI" ],
    [0x110F0, "SORA SOMPENG" ],
    [0x11136, "CHAKMA" ],
    [0x111D0, "SHARADA" ],
    [0x112F0, "KHUDAWADI" ],
    [0x11450, "NEWA" ],
    [0x114D0, "TIRHUTA" ],
    [0x11650, "MODI" ],
    [0x116C0, "TAKRI" ],
    [0x11730, "AHOM" ],
    [0x118E0, "WARANG CITI" ],
    [0x11C50, "BHAIKSUKI" ],
    [0x16A60, "MRO" ],
    [0x16B50, "PAHAWH HMONG" ],
    [0x1D7CE, "MATHEMATICAL BOLD" ],
    [0x1D7D8, "MATHEMATICAL DOUBLE-STRUCK" ],
    [0x1D7E2, "MATHEMATICAL SANS-SERIF" ],
    [0x1D7EC, "MATHEMATICAL SANS-SERIF BOLD" ],
    [0x1D7F6, "MATHEMATICAL MONOSPACE" ],
    [0x1E950, "ADLAM" ]
  ].map(
    function (item) {
      return { zero:item[0], name:item[1] }
    }
  ); 
