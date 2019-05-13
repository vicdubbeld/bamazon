var mysql = require("mysql");
var inquirer = require("inquirer");

// connection establishment
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "vivalabam1",
    database: "bamazon"
});

// connection validation
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});


