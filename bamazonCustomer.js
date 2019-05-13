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
});

// function to display all items for sale

function itemsForSale() {
    // query database for all items up for sale
    connection.query("SELECT * FROM products", function(err, results){
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
                message:"Which item would you like to purchase?"
            },
            {
                name: "purchase",
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

                if (chosenItem.stock_quantitiy < parseInt(answer.desired_quantity)) {
                    connection.query(
                        "UPDATE purchase SET ? WHERE ?",
                        [
                            {
                                stock_quantitiy: answer.desired_quantity
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ],
                        function(error) {
                            if (error) throw err;
                            console.log("Purchase successful");

                        }
                    );
                
                } else {
                    console.log("sorry there are not enough in stock right now...");
                        } 
            });
    });
}
    

// function to ask user which item he/she would like 
// to purchase and quantity of items desired

    // prompts users to enter item id 
    // prompts users to enter # of items

    // check to see if there are enough in stock
        // if there are not enough, "insufficient quantity"
        // else, update database and show $ total 




