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
  itemsForSale();
  queryId_name_price();

});

function queryId_name_price(){
  return new Promise(function(resolve, reject) {
      // query for all items in products table
      connection.query("SELECT * FROM products", function(err, res) {
          if (err) reject(err);
          resolve(res);
      });
  });
}

// function to display all items for sale and ask user which item he/she would like to purchase

function itemsForSale() {
  // query database for all items up for sale
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "Which item would you like to purchase?"
        },
        {
          // prompts users to enter # of items desired
          name: "desired_quantity",
          type: "input",
          message: "How many would you like?"
        }
      ])
      .then(function(answer) {
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        // check to see if there are enough in stock
        // if there are enough,
        if (chosenItem.stock_quantity > parseInt(answer.desired_quantity)) {
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: answer.desired_quantity
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function(error, object) {
              if (error) throw err;
              // var object = {};
              // purchase went through
              console.log("Purchase successful!!!!!");
              console.log("-------------------------");
              var totalCost = (chosenItem.price * answer.desired_quantity).toFixed(2);
              console.log('Your total cost is $' + totalCost);
              // showTotal();
              itemsForSale();
            }
          );
        } else {
          // not enough in stock
          console.log("sorry there are not enough in stock right now...");
          console.log("------------------------------------------------");
          itemsForSale();
        }
      });
  });
}



// function showTotal() {
//   var price;
//   var total = answer.desired_quantity * price;
//   connection.query(
//     "SELECT price FROM products",
//     {
//       //   stock_quantity: answer.desired_quantity
//       price: answer.desired_quantity
//     },
//     function(err, answer) {
//       if (err) throw err;

      

//       console.log("your grand total is: " + total);
//     }
//   );
// }
