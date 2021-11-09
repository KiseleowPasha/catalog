"use strict";
exports.__esModule = true;
var express = require('express');
var next = require('next');
var path = require('path');
var urlencodedParser = express.urlencoded({ extended: false });
var fs = require('fs');
var port = parseInt(process.env.PORT, 10) || 3000;
var dev = process.env.NODE_ENV !== 'production';
var app = next({ dev: dev });
var handle = app.getRequestHandler();
var DB_PATH = path.resolve(__dirname, './db');
var CATALOG_FILE = path.resolve(DB_PATH, 'catalog.json');
var BASKET_FILE = path.resolve(DB_PATH, 'basket.json');
app.prepare().then(function () {
    var server = express();
    server.use(express.static(DB_PATH));
    server.use(express.json());
    server.post('/api/basket', urlencodedParser, function (req, res) {
        var productsInBasket = JSON.parse(fs.readFileSync(BASKET_FILE, 'utf-8'));
        productsInBasket.push(req.body);
        fs.writeFile(BASKET_FILE, JSON.stringify(productsInBasket), function (err) {
            if (err)
                throw err;
        });
        res.sendStatus(200);
    });
    server["delete"]('/api/basket', urlencodedParser, function (req, res) {
        var productsInBasket = JSON.parse(fs.readFileSync(BASKET_FILE, 'utf-8'));
        var newBasket = productsInBasket.filter(function (product) { return product.id !== req.body.id; });
        fs.writeFile(BASKET_FILE, JSON.stringify(newBasket), function (err) {
            if (err)
                throw err;
        });
        res.sendStatus(200);
    });
    server.put('/api/basket', urlencodedParser, function (req, res) {
        var productsInBasket = JSON.parse(fs.readFileSync(BASKET_FILE, 'utf-8'));
        var currentProduct = productsInBasket.find(function (product) { return product.id === req.body.id; });
        if (currentProduct)
            currentProduct.count = req.body.count;
        fs.writeFile(BASKET_FILE, JSON.stringify(productsInBasket), function (err) {
            if (err)
                throw err;
        });
        res.sendStatus(200);
    });
    server.get('/api/basket', function (req, res) {
        res.sendFile(BASKET_FILE);
    });
    server.get('/api/catalog', function (req, res) {
        res.sendFile(CATALOG_FILE);
    });
    server.all('*', function (req, res) {
        return handle(req, res);
    });
    server.listen(port, function () {
        console.log("> Ready on http://localhost:" + port);
    });
});
