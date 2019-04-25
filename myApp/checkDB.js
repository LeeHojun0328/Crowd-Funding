var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1111',
  database : 'ProjectDB',
});

connection.connect();

connection.query('SELECT * from user', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
  console.log('The solution is: ', results[0].solution);
});

connection.end();


