const _ = require('lodash');
const fs = require('fs');
const Diff = require('diff');
const myers = require('myers-diff');

const { diff, changed } = require('myers-diff');
const dircompare = require('dir-compare');
const readFile = require('./src/formats');
const { values } = require('lodash');


/////////////////////////////////

const options = { compareSize: true };


var map = new Map();
var a = "";
// print(res)

// Asynchronous
function comparedirectory(parentDirs, childDirs) {
  //map = new  Map();

  dircompare.compare(parentDirs, childDirs, options)
    .then(res => {
    //  console.log(res);
      res.diffSet.forEach(dif => {
        if (dif.state === 'distinct' && dif.type1 != 'directory') {
          const file1Data = fs.readFileSync(dif.path1 + '/' + dif.name1, 'utf8');
          const file2Data = fs.readFileSync(dif.path2 + '/' + dif.name2, 'utf8');
          //console.log(file2Data)
          const changes = diff(file1Data, file2Data, {
            compare: 'lines',
            ignoreWhitespace: false,
            ignoreCase: false,
            ignoreAccents: false
          });
          if(!_.isEmpty(changes)){
            console.log(readFile.formats.getNormalFormat(changes));
            map.set(readFile.formats.getNormalFormat(changes), dif.path2 + '/' + dif.name2);
          }
         
        }
        else if (dif.state === 'right' && dif.type2 != 'directory') {
          var file2Data = fs.readFileSync(dif.path2 + '/' + dif.name2, 'utf8');
          var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(dif.path2 + '/' + dif.name2)
          });
          const nf = [];
          nf.push("<h>Added<h>")
          lineReader.on('line', function (line) {
            nf.push('<p style="color:green">' + line + '</p>')
          });
          var a="";
          map.set(nf, dif.path2 + '/' + dif.name2);

        } else if (dif.state === 'left' && dif.type1 != 'directory') {
       //   console.log(dif.path1 + '/' + dif.name1);
          var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(dif.path1 + '/' + dif.name1)
          });
          const nf = [];
          nf.push("<h>Deleted<h>")

          lineReader.on('line', function (line) {
            nf.push('<p style="color:red">' + line + '</p>')
            // console.log(line);
          });
          map.set(nf, dif.path1 + '/' + dif.name1);
        }
      }
      )
    }
    )
    .catch(error => console.error(error));
  // console.log(map); 
  var map1 = map;
  map = new Map();
  return map1;
}


module.exports = { comparedirectory };