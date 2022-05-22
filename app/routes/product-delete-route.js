module.exports = function (app, db) {
    
    // Delete a product
    // http://localhost:4300/api/product
    // Sending a JSON body: (ID is needed)
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
    app.delete('/api/product/', (req, res) => {
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
    updateProduct(req.body, res, db);
}

function updateProduct(product, res, db){
    var id = product.id;

    if(!id){
        res.status(400).send("ID is mandatory");
    }

    else{
        var sql = `delete from  Products where id = ?;`;
        var values = [id];

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
}

