# unicodedigits
nodejs module for translating unicode digits

## Install

```sh
$ npm install unicode-nd
```

## Intro & Examples

### Simple example

```js
var nd = require('unicode-nd');

var digits = '0 1 2 3 4 5 6 7 8 9';

nd.classes.forEach(
  function ( name ) {
    console.log("%s : %s", nd.replaceDigits( digits, name ), name );
  }
);

```


## Supported Unicode classes

000030 ASCII
000660 ARABIC-INDIC
0006F0 EXTENDED ARABIC-INDIC
0007C0 NKO
000966 DEVANAGARI
0009E6 BENGALI
000A66 GURMUKHI
000AE6 GUJARATI
000B66 ORIYA
000BE6 TAMIL
000C66 TELUGU
000CE6 KANNADA
000D66 MALAYALAM
000DE6 SINHALA LITH
000E50 THAI
000ED0 LAO
000F20 TIBETAN
001040 MYANMAR
001090 MYANMAR SHAN
0017E0 KHMER
001810 MONGOLIAN
001946 LIMBU
0019D0 NEW TAI LUE
001A80 TAI THAM HORA
001A90 TAI THAM THAM
001B50 BALINESE
001BB0 SUNDANESE
001C40 LEPCHA
001C50 OL CHIKI
00A620 VAI
00A8D0 SAURASHTRA
00A900 KAYAH LI
00A9D0 JAVANESE
00A9F0 MYANMAR TAI LAING
00AA50 CHAM
00ABF0 MEETEI MAYEK
00FF10 FULLWIDTH
0104A0 OSMANYA
011066 BRAHMI
0110F0 SORA SOMPENG
011136 CHAKMA
0111D0 SHARADA
0112F0 KHUDAWADI
011450 NEWA
0114D0 TIRHUTA
011650 MODI
0116C0 TAKRI
011730 AHOM
0118E0 WARANG CITI
011C50 BHAIKSUKI
016A60 MRO
016B50 PAHAWH HMONG
01D7CE MATHEMATICAL BOLD
01D7D8 MATHEMATICAL DOUBLE-STRUCK
01D7E2 MATHEMATICAL SANS-SERIF
01D7EC MATHEMATICAL SANS-SERIF BOLD
01D7F6 MATHEMATICAL MONOSPACE
01E950 ADLAM


## Support

If at all possible when you open an issue please provide
- version of node
- version of postgres
- smallest possible snippet of code to reproduce the problem

## License

