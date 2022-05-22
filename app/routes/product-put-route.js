module.exports = function (app, db) {
    
    // Update a product
    // http://localhost:4300/api/product
    // Sending a JSON body:
    // {
    //     "id": "12",            
    //     "name": "ExampleProductName",
    //     "description": "Example product description",
    //     "price": 2.00,
    //     "currency": "EUR" 
    // }

    // or an array of products:
    // [
    //     {...},{...}
    // ]
    app.put('/api/product/', (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");

         var data = req.body;
         
         if((data.constructor === Array))
            processProducts(req, res, db);
         else
            processProduct(req, res, db);
    });
};

function processProducts(req, res, db){
    for (var prod of req.body) {
        updateProduct(prod, res, db);
    }
}

function processProduct(req, res, db){
    validateRequest(req, res);
    updateProduct(req.body, res, db);
}

function checkIfExist(){
    // TODO: check business
}

function updateProduct(product, res, db){
    checkIfExist();

    var name = product.name;
    var description = product.description;
    var price = product.price;
    var currency = product.currency;
    var id = product.id;

    var sql = `update Products
            set name = ?, description = ?, price = ?, currency = ?
            where id = ?;`;

    var values = [name, description, price, currency, id];

    db.serialize(function () {
        db.run(sql, values, function (err) {
            if (err){
                console.error(err);
                res.status(500).send(err);
            }
            else
                res.send();
        });
    });
}

function validateRequest(req, res) {
    var fs = require('fs');
    var schema = JSON.parse(fs.readFileSync('app/data/product-schema-update.json', 'utf8'));

    var JaySchema = require('jayschema');
    var js = new JaySchema();
    var instance = req.body;

    js.validate(instance, schema, function (errs) {
        if (errs) {
            console.error(errs);
            res.status(400).send(errs);
        }
    });
}