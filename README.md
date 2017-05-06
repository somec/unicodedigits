# unicodedigits
nodejs module for translating unicode digits

## Install

```sh
$ npm install unicodedigits --save
```

## Intro & Examples

### Simple example

```js
var nd = require('unicodedigits');

var digits = '0 1 2 3 4 5 6 7 8 9';

nd.classes.forEach(
  function ( name ) {
    console.log("%s : %s", nd.replaceDigits( digits, name ), name );
  }
);

```

```js
var nd = require('unicodedigits');

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
```

## Supported Unicode classes

1. 000030 ASCII
2. 000660 ARABIC-INDIC
3. 0006F0 EXTENDED ARABIC-INDIC
4. 0007C0 NKO
5. 000966 DEVANAGARI
6. 0009E6 BENGALI
7. 000A66 GURMUKHI
8. 000AE6 GUJARATI
9. 000B66 ORIYA
10. 000BE6 TAMIL
11. 000C66 TELUGU
12. 000CE6 KANNADA
13. 000D66 MALAYALAM
14. 000DE6 SINHALA LITH
15. 000E50 THAI
16. 000ED0 LAO
17. 000F20 TIBETAN
18. 001040 MYANMAR
19. 001090 MYANMAR SHAN
20. 0017E0 KHMER
21. 001810 MONGOLIAN
22. 001946 LIMBU
23. 0019D0 NEW TAI LUE
24. 001A80 TAI THAM HORA
25. 001A90 TAI THAM THAM
26. 001B50 BALINESE
27. 001BB0 SUNDANESE
28. 001C40 LEPCHA
29. 001C50 OL CHIKI
30. 00A620 VAI
31. 00A8D0 SAURASHTRA
32. 00A900 KAYAH LI
33. 00A9D0 JAVANESE
34. 00A9F0 MYANMAR TAI LAING
35. 00AA50 CHAM
36. 00ABF0 MEETEI MAYEK
37. 00FF10 FULLWIDTH
38. 0104A0 OSMANYA
39. 011066 BRAHMI
40. 0110F0 SORA SOMPENG
41. 011136 CHAKMA
42. 0111D0 SHARADA
43. 0112F0 KHUDAWADI
44. 011450 NEWA
45. 0114D0 TIRHUTA
46. 011650 MODI
47. 0116C0 TAKRI
48. 011730 AHOM
49. 0118E0 WARANG CITI
50. 011C50 BHAIKSUKI
51. 016A60 MRO
52. 016B50 PAHAWH HMONG
53. 01D7CE MATHEMATICAL BOLD
54. 01D7D8 MATHEMATICAL DOUBLE-STRUCK
55. 01D7E2 MATHEMATICAL SANS-SERIF
56. 01D7EC MATHEMATICAL SANS-SERIF BOLD
57. 01D7F6 MATHEMATICAL MONOSPACE
58. 01E950 ADLAM


## Support

If at all possible when you open an issue please provide
- version of node
- version of postgres
- smallest possible snippet of code to reproduce the problem

## History

2012-August-29
  user1585033 asked a question on [StackOverflow](http://stackoverflow.com/questions/12171113/regular-expression-for-changing-other-languages-numbers-to-english-numbers) and
  I answered with both a limited function to solve the problem,
  and with a general function.

2017-May-05
  [Flavio Corpa](https://github.com/kutyel) found the function on StackOverflow and
  suggested that I should publish that as a module for node.js.
  I thought that was a good idea, so I did.


## License

MIT

