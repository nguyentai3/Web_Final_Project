import express from 'express';
var path = require('path');

let configViewEngine =  (app) =>{
    app.use(express.static("./src/public"));
    app.set("view engine","ejs");
    app.set("views","./src/views");
    app.set("view engine","css")
}

module.exports = configViewEngine