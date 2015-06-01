var mongoose = require('mongoose');
var express = require('express');
var session = require('express-session');
var config = require('./config/development');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var CRUDRouter = require('./back-end/Routers/Router');
var KullaniciModeli = require('./back-end/Modeller/KullaniciModeli');

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
        res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        console.log('origin-policy');
        next();
    });
    
    function izinKontrol(url){
        var izinli = false;
        var izinliUrlListesi = ["hesap", "onyukleme", "sehir"];
        var temp = url.split("/");
        
        if(temp.length < 3){
            izinli = false;
        }
        for(var i = 0; i < izinliUrlListesi.length; i++){
            console.log("temp : " + temp[1] + ", url : " + izinliUrlListesi[i]);
            if(izinliUrlListesi[i] == temp[1]){
                izinli = true;   
            }
        }
        console.log("Izinli : " + izinli);
        return izinli;
    }
    
    app.all('/*', function(req, res, next) {
        console.log(req.originalUrl);
        if(true){
            next();
        }else{
            KullaniciModeli.findOne({apiKey : req.body.apiKey},'apiKey', function(hata, kullanici){
                console.log('Kullanici : api key : ' + kullanici);
                if(hata){
                    console.log("Db hatasi : " + hata);
                    res.send({status : false, response : hata});
                    return;
                }
                if(kullanici == null){
                    console.log("Api key hatali...");
                    res.send({status : false, response : "Api key hatali..."});
                    return;
                }
                console.log('api key dogrulama basarili');
                next();
            });      
        }
    });

    //giris ve cikis
    assignRouter(app, './back-end/Routers/HesapRouter', '/hesap');
    //yukleme router
    assignRouter(app, './back-end/Routers/YuklemeRouter', '/yukleme');
    //onyukleme router
    assignRouter(app, './back-end/Routers/OnyuklemeRouter', '/onyukleme');
    //diger
    assignRouter(app, './back-end/Routers/DigerRouter', '/diger');
    
    //Kullanici crud operasyon
    createCrudRouter(app, './back-end/Modeller/KullaniciModeli', '/kullanici');
    //Bildirim crud operasyon
    createCrudRouter(app, './back-end/Modeller/BildirimModeli', '/bildirim');
    //Sehir crud operasyon
    createCrudRouter(app, './back-end/Modeller/SehirModeli', '/sehir');
    //Ilan crud operasyon
    createCrudRouter(app, './back-end/Modeller/IlanModeli', '/ilan');
    
    if (!module.parent) {
        app.listen(config.port);
        console.log('Alim Satim Back-End Uygulamasi --> baslatildi, port : ' + config.port);
    }
});
