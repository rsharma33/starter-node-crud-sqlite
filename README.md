# node-js-sqlite
Simple NodeJS Rest API with CRUD routes.
Using SQLite database

## How to Install
```sh
$ git clone https://github.com/lcarlesso/node-js-sqlite.git
$ cd node-js-sqlite
$ npm install 
$ npm run dev
```

It will be running on port 4300

------------

## How to use

### POST
* **Add new product:**
```
http://localhost:4300/api/product
```
Sending a JSON body:
```javascript
{
	"name": "ExampleProductName",
	"description": "Example product description",
	"price": 2.00,
	"currency": "EUR" 
}
```
or an array of products:
```javascript
[
	{...},{...}
]
```

---------------------------------------------

### PUT
* **Update a product:**
```
http://localhost:4300/api/product
```
Sending a JSON body: **ID is the only MANDATORY**
```javascript
{
	"id": "1",
	"name": "ExampleProductName",
	"description": "Example product description",
	"price": 2.00,
	"currency": "EUR" 
}
```
or an array of products:
```javascript
[
	{...},{...}
]
```

---------------------------------------------

### DELETE
* **Delete a product:**
```
http://localhost:4300/api/product
```
Sending a JSON body: **ID is the only MANDATORY**
```javascript
{
	"id": "1",
	"name": "ExampleProductName",
	"description": "Example product description",
	"price": 2.00,
	"currency": "EUR" 
}
```
or an array of products:
```javascript
[
	{...},{...}
]
```

---------------------------------------------

### GET
* **Load products by ID:**
```
http://localhost:4300/api/product/id/$id
```
example: http://localhost:4300/api/product/id/15
_____

* **Load all products:**
```
http://localhost:4300/api/product/
```
______

* **Load products by any attribute and value:** 
```
http://localhost:4300/api/product/$attribute/$name
```
example: 
- http://localhost:4300/api/product/price/24
- http://localhost:4300/api/product/name/Suntone
$attribute = ['name', 'price', 'currency', 'description']
(this is not checked values, wrong parameters will return a DB error.)
_____

* **Load all products sorting by attribute** 
```
http://localhost:4300/api/product/sort/$attribute
```
example: 
- http://localhost:4300/api/product/sort/price
- http://localhost:4300/api/product/sort/name

$attribute = ['name', 'price', 'currency', 'description']
(this is not checked values, wrong parameters will return a DB error)
____

* **Load products sorting ASC or DESC by any attribute:**
```
http://localhost:4300/api/product/sort/$direction/$attribute
```
example: 
- http://localhost:4300/api/product/sort/asc/price
- http://localhost:4300/api/product/sort/desc/price

$attribute = ['name', 'price', 'currency', 'description']*
$direction [ASC or DESC]C]*
(the direction is checked and when wrong will return a 401 business error)
_____


## SQLite database
The database is already populated with 30 random values from https://www.mockaroo.com/

### Node version
The Node version used was 6.9.3