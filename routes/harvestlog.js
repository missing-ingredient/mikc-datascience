var express = require('express');
var router = express.Router();

// Import the mssql package
var sql = require('mssql');

// Create a configuration object for our Azure SQL connection parameters

var dbConfig = {
 server: '', // Use your SQL server name
 database: '', // Database to connect to
 user: '', // Use your username
 password: '', // Use your password
 port: 1433
};

/* GET Harvest Log */
router.get('/', function(req, res, next) {
  // Create connection instance
  var conn = new sql.ConnectionPool(dbConfig);

  conn.connect()
  
  // Successfull connection
  .then(function () {

    // Create request instance, passing in connection instance
    var req = new sql.Request(conn);
    
    // Call mssql's query method passing in params
    req.query("SELECT * FROM HarvestLogData")   
    .then(function (recordset) {
      
      res.render('harvestlog', { title: 'MIKC Tools', harvestlogjson: recordset.recordset});
      
      conn.close();
    })
    // Handle sql statement execution errors
    .catch(function (err) {
      console.log(err);
      conn.close();
    })

    /*
    // Create request instance, passing in connection instance
    var req = new sql.Request(conn);
 
    // Call mssql's query method passing in params
    req.query("SELECT * FROM HarvestLogData")
    .then(function (recordset) {
      //res.send('Harvest Records:' + recordset.recordset);
      res.render('harvestlog', { title: 'MIKC Tools', harvestlogjson: recordset.recordset});
      conn.close();
    })
    // Handle sql statement execution errors
    .catch(function (err) {
      console.log(err);
      conn.close();
    })
 */
  })
  // Handle connection errors
  .catch(function (err) {
    res.render('harvestlog', { title: 'MIKC Tools',  message: JSON.stringify(conn)});
    console.log(err);
    conn.close();
  });
});

module.exports = router;
