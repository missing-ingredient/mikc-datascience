var express = require('express');
var router = express.Router();

// Import the mssql package
var sql = require('mssql');

// Create a configuration object for our Azure SQL connection parameters
var dbConfig = {
  server: 'mikcsqldb1.cgjaehfgufhe.us-east-2.rds.amazonaws.com', // Use your SQL server name
  database: 'mikcsqldb1', // Database to connect to
  user: 'mikcsqladmin', // Use your username
  password: '$Grantmew1sd0m$', // Use your password
  port: 1433
 };

/* GET Harvest Log */
router.post('/add', function(req, res, next) {

  console.log(req.body.product);
  //res.render('harvest', { title: 'MIKC Tools', message: req.body.product + ': Harvest Success!'});
  
  // Create connection instance
  var conn = new sql.ConnectionPool(dbConfig);
 
  conn.connect()
  // Successfull connection
  .then(function () {
 
    // Create request instance, passing in connection instance
    var dbreq = new sql.Request(conn);
 
    // Call mssql's query method passing in params
    dbreq.query("INSERT INTO HarvestLogData (PlantDate, HarvestDate, Product, Age, Trays, Containers, TotalYield, PackagingRange, AvgContainer) VALUES ('" 
    + req.body.plantDate + "', '" + req.body.harvestDate + "', '" + req.body.product + "', '" + req.body.age + "', '" + req.body.trays + "', '" + req.body.containers + "', '" + req.body.totalYield + "', '" + req.body.packagingRange + "', '" + req.body.avgContainer + "')")
    .then(function (recordset) {
      res.render('harvest', { title: 'MIKC Tools', message: req.body.product + ': Harvest Success!'});
      conn.close();
    })
    // Handle sql statement execution errors
    .catch(function (err) {
      console.log(err);
      conn.close();
    })
 
  })
  // Handle connection errors
  .catch(function (err) {
    console.log(err);
    conn.close();
  });
 
  
});

/* GET Harvest Log */
router.get('/', function(req, res, next) {
  
  res.render('harvest', { title: 'MIKC Tools', message: ''});

});

module.exports = router;
