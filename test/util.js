module.exports = {
  leadingZero:
    function leadingZero(input,width,base) {
      var output = input.toString(base||10);
      while (output.length < width)
        output = '0' + output;
      return output;
    }
}
