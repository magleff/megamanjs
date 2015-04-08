// connect.static does not exist any more,
// use serve-static instead --> http://stackoverflow.com/a/24347442/2015707
var connect = require('connect'),
    serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic('app'));
app.listen(5000);
