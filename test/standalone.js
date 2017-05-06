/*

The function below has support for Unicode class Nd (Number, Decimal Digit): Adlam, Ahom, Arabic-indic, Balinese, Bengali, Bhaiksuki, Brahmi, Chakma, Cham, Devanagari, Extended Arabic-indic, Fullwidth, Gujarati, Gurmukhi, Javanese, Kannada, Kayah Li, Khmer, Khudawadi, Lao, Lepcha, Limbu, Malayalam, Mathematical Bold, Mathematical Double-struck, Mathematical Monospace, Mathematical Sans-serif Bold, Mathematical Sans-serif, Meetei Mayek, Modi, Mongolian, Mro, Myanmar Shan, Myanmar Tai Laing, Myanmar, New Tai Lue, Newa, Nko, Ol Chiki, Oriya, Osmanya, Pahawh Hmong, Saurashtra, Sharada, Sinhala Lith, Sora Sompeng, Sundanese, Tai Tham Hora, Tai Tham Tham, Takri, Tamil, Telugu, Thai, Tibetan, Tirhuta, Vai, Warang Citi.

There is no support for roman numbers and other non-decimal numbers, because they are not decimal.

*/

    // This function takes an UTF16 encoded string as input,
    // and returns with all suported digits from Unicode
    // class 'Nd' (Number, Decimal Digit) replaced with their
    // equivalent ASCII digit.
    // Source : http://stackoverflow.com/a/12171250/36866
    // License: MIT
    // Author : some@domain.name
    // Note   : If you are going to use this code I would appreciate to
    //          get an email to some@domain.name. You don't have to but
    //          it would make me happier!
    var digitsToASCII=
      (function () {
        // Regexp that matches all supported digits.
        // Most Unicode digit classes have the zero digit at a codepoint
        // where the four least significant bits are ether zero or six.
        // The notable exception is the Math-class where several classes
        // have sequential codepoints. The information about the offset
        // is needed when decoding, and by using groups in the RexExp
        // no lookup is needed.
        var reDigit = new RegExp(
          '('+ // Offset 0
            '['+
              '\u0030-\u0039\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9'+
              '\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049'+
              '\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u19D0-\u19D9'+
              '\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9'+
              '\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9'+
              '\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59'+
              '\uABF0-\uABF9\uFF10-\uFF19'+
            ']'+
            '|\uD801[\uDCA0-\uDCA9]'+
            '|\uD804[\uDCF0-\uDCF9\uDDD0-\uDDD9\uDEF0-\uDEF9]'+
            '|\uD805['+
              '\uDC50-\uDC59\uDCD0-\uDCD9\uDE50-\uDE59'+
              '\uDEC0-\uDEC9\uDF30-\uDF39'+
            ']'+
            '|\uD806[\uDCE0-\uDCE9]|\uD807[\uDC50-\uDC59]'+
            '|\uD81A[\uDE60-\uDE69]|\uD81A[\uDF50-\uDF59]'+
            '|\uD83A[\uDD50-\uDD59]'+
          ')|('+ // Offset 6
            '['+
              '\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF'+
              '\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF'+
              '\u0D66-\u0D6F\u0DE6-\u0DEF\u1946-\u194F'+
            ']'+
            '|\uD804[\uDC66-\uDC6F\uDD36-\uDD3F]'+
          ')|('+ // Math
            '\uD835[\uDFCE-\uDFFF]'+
          ')',
          'g'
        );

        function replace(match, offset0, offset6, offsetMath) {
          // 'match' contains the whole match and can therefore have
          // a length longer than one character if surrogate pairs is used.
          // By getting the last character from 'match' the operation is simplified. 
          var raw = match.charCodeAt( match.length - 1);
          var digit =
            offset0 ? raw & 0xF : // use 4 bits
            offset6 ? (raw -6) & 0xF : // subtract 6, use 4 bits
            offsetMath ? ((raw - 0xCE) & 0x3F) % 10 : // subtract CE, use 6 bits
            null;

          return String.fromCharCode(48 + digit); // Digit to ASCII
        }

        return function replaceDigits(input) {
          return input.replace(reDigit, replace);
        }
      })();



window.onload = function () {
  var list =
    [
      [ "0123456789", "ASCII" ],
      [ "٠١٢٣٤٥٦٧٨٩", "ARABIC-INDIC" ],
      [ "۰۱۲۳۴۵۶۷۸۹", "EXTENDED ARABIC-INDIC" ],
      [ "߀߁߂߃߄߅߆߇߈߉", "NKO" ],
      [ "०१२३४५६७८९", "DEVANAGARI" ],
      [ "০১২৩৪৫৬৭৮৯", "BENGALI" ],
      [ "੦੧੨੩੪੫੬੭੮੯", "GURMUKHI" ],
      [ "૦૧૨૩૪૫૬૭૮૯", "GUJARATI" ],
      [ "୦୧୨୩୪୫୬୭୮୯", "ORIYA" ],
      [ "௦௧௨௩௪௫௬௭௮௯", "TAMIL" ],
      [ "౦౧౨౩౪౫౬౭౮౯", "TELUGU" ],
      [ "೦೧೨೩೪೫೬೭೮೯", "KANNADA" ],
      [ "൦൧൨൩൪൫൬൭൮൯", "MALAYALAM" ],
      [ "෦෧෨෩෪෫෬෭෮෯", "SINHALA LITH" ],
      [ "๐๑๒๓๔๕๖๗๘๙", "THAI" ],
      [ "໐໑໒໓໔໕໖໗໘໙", "LAO" ],
      [ "༠༡༢༣༤༥༦༧༨༩", "TIBETAN" ],
      [ "၀၁၂၃၄၅၆၇၈၉", "MYANMAR" ],
      [ "႐႑႒႓႔႕႖႗႘႙", "MYANMAR SHAN" ],
      [ "០១២៣៤៥៦៧៨៩", "KHMER" ],
      [ "᠐᠑᠒᠓᠔᠕᠖᠗᠘᠙", "MONGOLIAN" ],
      [ "᥆᥇᥈᥉᥊᥋᥌᥍᥎᥏", "LIMBU" ],
      [ "᧐᧑᧒᧓᧔᧕᧖᧗᧘᧙", "NEW TAI LUE" ],
      [ "᪀᪁᪂᪃᪄᪅᪆᪇᪈᪉", "TAI THAM HORA" ],
      [ "᪐᪑᪒᪓᪔᪕᪖᪗᪘᪙", "TAI THAM THAM" ],
      [ "᭐᭑᭒᭓᭔᭕᭖᭗᭘᭙", "BALINESE" ],
      [ "᮰᮱᮲᮳᮴᮵᮶᮷᮸᮹", "SUNDANESE" ],
      [ "᱀᱁᱂᱃᱄᱅᱆᱇᱈᱉", "LEPCHA" ],
      [ "᱐᱑᱒᱓᱔᱕᱖᱗᱘᱙", "OL CHIKI" ],
      [ "꘠꘡꘢꘣꘤꘥꘦꘧꘨꘩", "VAI" ],
      [ "꣐꣑꣒꣓꣔꣕꣖꣗꣘꣙", "SAURASHTRA" ],
      [ "꤀꤁꤂꤃꤄꤅꤆꤇꤈꤉", "KAYAH LI" ],
      [ "꧐꧑꧒꧓꧔꧕꧖꧗꧘꧙", "JAVANESE" ],
      [ "꧰꧱꧲꧳꧴꧵꧶꧷꧸꧹", "MYANMAR TAI LAING" ],
      [ "꩐꩑꩒꩓꩔꩕꩖꩗꩘꩙", "CHAM" ],
      [ "꯰꯱꯲꯳꯴꯵꯶꯷꯸꯹", "MEETEI MAYEK" ],
      [ "０１２３４５６７８９", "FULLWIDTH" ],
      [ "𐒠𐒡𐒢𐒣𐒤𐒥𐒦𐒧𐒨𐒩", "OSMANYA" ],
      [ "𑁦𑁧𑁨𑁩𑁪𑁫𑁬𑁭𑁮𑁯", "BRAHMI" ],
      [ "𑃰𑃱𑃲𑃳𑃴𑃵𑃶𑃷𑃸𑃹", "SORA SOMPENG" ],
      [ "𑄶𑄷𑄸𑄹𑄺𑄻𑄼𑄽𑄾𑄿", "CHAKMA" ],
      [ "𑇐𑇑𑇒𑇓𑇔𑇕𑇖𑇗𑇘𑇙", "SHARADA" ],
      [ "𑋰𑋱𑋲𑋳𑋴𑋵𑋶𑋷𑋸𑋹", "KHUDAWADI" ],
      [ "𑑐𑑑𑑒𑑓𑑔𑑕𑑖𑑗𑑘𑑙", "NEWA" ],
      [ "𑓐𑓑𑓒𑓓𑓔𑓕𑓖𑓗𑓘𑓙", "TIRHUTA" ],
      [ "𑙐𑙑𑙒𑙓𑙔𑙕𑙖𑙗𑙘𑙙", "MODI" ],
      [ "𑛀𑛁𑛂𑛃𑛄𑛅𑛆𑛇𑛈𑛉", "TAKRI" ],
      [ "𑜰𑜱𑜲𑜳𑜴𑜵𑜶𑜷𑜸𑜹", "AHOM" ],
      [ "𑣠𑣡𑣢𑣣𑣤𑣥𑣦𑣧𑣨𑣩", "WARANG CITI" ],
      [ "𑱐𑱑𑱒𑱓𑱔𑱕𑱖𑱗𑱘𑱙", "BHAIKSUKI" ],
      [ "𖩠𖩡𖩢𖩣𖩤𖩥𖩦𖩧𖩨𖩩", "MRO" ],
      [ "𖭐𖭑𖭒𖭓𖭔𖭕𖭖𖭗𖭘𖭙", "PAHAWH HMONG" ],
      [ "𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗", "MATHEMATICAL BOLD" ],
      [ "𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡", "MATHEMATICAL DOUBLE-STRUCK" ],
      [ "𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫", "MATHEMATICAL SANS-SERIF" ],
      [ "𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵", "MATHEMATICAL SANS-SERIF BOLD" ],
      [ "𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿", "MATHEMATICAL MONOSPACE" ],
      [ "𞥐𞥑𞥒𞥓𞥔𞥕𞥖𞥗𞥘𞥙", "ADLAM" ],
    ];

  var out = document.createElement('table');
  document.body.appendChild(out);
  var body = out.createTBody();
  var status = { pass : 0, fail :0 };
  list.forEach(
    function (item) {
      var translate = digitsToASCII( item[0] )
      var result = translate === '0123456789';
      status[ result ? 'pass' : 'fail'] += 1;
      var cell, row = body.insertRow();

      cell = row.insertCell();
      cell.textContent = item[1];
      cell = row.insertCell();
      cell.textContent = item[0];
      cell = row.insertCell();
      cell.textContent = translate;

      cell = row.insertCell();
      cell.textContent = result ? 'PASS' : 'FAIL';
      cell.className = result ? 'PASS' : 'FAIL';
    }
  );
  body = out.createTFoot();
  var cell, row = body.insertRow();
  cell = row.insertCell();
  cell.textContent = 'Passed ' + status.pass + ', Failed ' + status.fail;
};
