var mongoose = require('mongoose');
var express = require('express');
var session = require('express-session');
var config = require('./config/development');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var CRUDRouter = require('./back-end/Routers/Router');

function createCrudRouter(app, modelPath, url){
    var Model = require(modelPath);
    var Router = CRUDRouter(Model);
    app.use(url, Router);   
}
function assignRouter(app, routerPath, url){
    var router = require(routerPath);
    app.use(url, router());
}
mongoose.connect(config.dbpath, function(err){
    if(err) {
        console.log("mongo baglanti hatasi.")
        return
    }
    var app = express();
    //session
    app.use(session({secret: 'alimsatimkey', resave: true, saveUninitialized: true}));
    
    // use ejs-locals for all ejs templates: 
    app.engine('ejs', ejs.renderFile);

    // so you can render('index') 
    app.set('views',__dirname + '/front-end/public/pages');
    app.set('view engine', 'ejs'); 

    // now we can use files(images, css, js) under public folder in rendered
    // files
    app.use(express.static(__dirname + '/front-end/public'));
    
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());
    
    app.all('/*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
        next();
    });
    
    app.use(function(req, res, next){
        if(true){
            console.log('sessionCheck is true');
            next();
        }else{
            console.log('sessionCheck is false');
            res.render('giris');
        }
    });

    //giris ve cikis
    assignRouter(app, './back-end/Routers/HesapRouter', '/hesap');
    //yukleme router
    assignRouter(app, './back-end/Routers/YuklemeRouter', '/yukleme');
    
    //Kullanici crud operasyon
    createCrudRouter(app, './back-end/Modeller/KullaniciModeli', '/kullanici');
    
    if (!module.parent) {
        app.listen(config.port);
        console.log('Alim Satim Back-End Uygulamasi --> baslatildi, port : ' + config.port);
    }
});
