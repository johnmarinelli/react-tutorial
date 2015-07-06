var express = require('express'),
    fs = require('fs'),
    app = express();
app.use(express.static('views'));

app.get('/', function(req, res) {
  res.render('index.html');
});

app.get('/data.json', function(req, res) {
  fs.readFile('data.json', function(err, data) {
    var comments = JSON.parse(data);
    res.setHeader('Cache-Control', 'no-cache');
    res.json(comments);
  });
});

app.post('/data.json', function(req, res) {
  fs.readFile('data.json', function(err, data) {
    if (err) {
      console.log(err.toString());
    }

    var comments = JSON.parse(data);
    comments.push(req.body);

    fs.writeFile('data.json', JSON.stringify(comments), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(comments);
    }); 
  }); 
});

var server = app.listen(3000, function() {
  var host = server.address().address,
    port = server.address().port;

  console.log('Listening on %s:%s', host, port);
});
