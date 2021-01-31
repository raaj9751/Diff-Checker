var http = require('http');
var formidable = require('formidable');
var app1 = require('../app');
const express = require('express');
const upload = require('express-fileupload');
const { RSA_NO_PADDING } = require('constants');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())// app.get('/',(req,res)=>{
//    res.sendFile(__dirname+'/index.html')
// })
// app.post('/',(req,res)=>{
//   if(req.files){
//     console.log(req.files);
//     var file = req.files.file1[0];
//     console.log(file.name)
//     console.log(file.path)
//     file.mv('./upload/sample',function(err){
//       if(err){
//         res.send(err)
//       }else{
//       }
//     })
//   }
// })
app.use(express.static(__dirname));

// app.get('/',(req,res)=>{
//  // res.sendFile(__dirname+'/index.html')
//       var obj = app1.comparedirectory('','');
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       obj.forEach((k,v)=>{
//         res.write('<h1>'+k+'</h1>');
//         res.write('<p>'+v+'</p>');
//           })
//           return res.end();
//   // res.render('index.html', {
		
// 	// });
// })
// app.post('/',(req,res)=>{
//  if(req.files){
//    console.log(req.files);
//    var file = req.files.file1[0];
//    console.log(file.name)
//    console.log(file.path)
//    file.mv('./upload/sample',function(err){
//      if(err){
//        res.send(err)
//      }else{
//      }
//    })
//  }
// })
// app.listen(5014);
  
//     const handleChange = (event) => {
//       console.log(event.target.value);
//     };
app.get('/', function (req, res, next) {
  res.sendfile('index.html');
});
app.post('/fileDiff', function (req, res, next) {
  requestListener(req.body, res);
});
const requestListener = function (req, res) {
  console.log(req)
  // if (req.url == '/') {
  //   res.writeHead(200, {'Content-Type': 'text/html'});
  //   res.write(' <form method="POST" action="/fileDiff" >');
  //   res.write('Parent Directory<input type="text" name="parent" />');
  //   res.write('Child Directory<input type="text" name="parent1" />');
  //   res.write(' <input type="submit" value="submit"></form>');

  //   return res.end();

  // } else if(req.url == '/fileDiff'){
    //console.log("1")
    // form.parse(req, function (err, fields, files) {

    //   res.write('File uploaded');
    //   res.end();
    // });
    res.writeHead(200, {'Content-Type': 'text/html'});
    var map = new Map();
    var obj =  app1.comparedirectory(req.parent,req.child);

    obj.forEach((k,v)=>{
      var  value = v;
      var key = k;
      res.write('<h1>'+key+'<h1>');
      value.forEach(val=>{
        res.write('<p>'+val+'</p>');

      })

        })
        console.log("end  ssd");
        return res.end();

}

app.listen(8082);