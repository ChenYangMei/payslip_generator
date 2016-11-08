exports.csv = function(data){

  var csv = Object.keys(data[0]).join(",") + '\r\n';

  for (var j = 0; j < data.length; j++) {
      var line = '';
      for (var index in data[j]) {
          line += data[j][index];
          if(line !== ''){
              line += ',';
          }
      }
      csv += line + '\r\n';
  }
  
  return csv;
};
