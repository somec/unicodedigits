
var nd = require('../index.js');

var list = [
  "0123456789",
  "٠١٢٣٤٥٦٧٨٩",
  "۰۱۲۳۴۵۶۷۸۹",
  "߀߁߂߃߄߅߆߇߈߉",
  "०१२३४५६७८९",
  "০১২৩৪৫৬৭৮৯",
  "੦੧੨੩੪੫੬੭੮੯",
  "૦૧૨૩૪૫૬૭૮૯",
  "୦୧୨୩୪୫୬୭୮୯",
  "௦௧௨௩௪௫௬௭௮௯"
];

list.forEach(
  function (item) {
    console.log( nd.replaceDigits( item, 'ASCII' ) );
  }
);
