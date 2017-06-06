var fs = require('fs');

fs.readFile('gre.txt', 'utf-8', function (err, data) {
  // console.log(data);
  var arr = data.split('\n');
  var list = [];
  for (var i = 0; i < arr.length - 1; i += 2) {
    var word = {
      word: arr[i].trim(), definition: arr[i + 1].trim()
    };
    list.push(word);
  }
  // console.log(list[0]);
  var content = JSON.stringify(list);
  fs.writeFile('words-list.txt', content, function (err) {
    if (err) console.log(err);
  });
});