exports.withRows = function(fun) {
 var f = function() {
    var row = getRow();
    return row && fun(row);
  };
  f.iterator = true;
  return f;
}

exports.send = function(chunk) {
  send(chunk + "\n")
}