var express = require('express');
var KullaniciModeli = require('../Modeller/KullaniciModeli');
var crypto = require('crypto');

function Hesap(){
    var router = express.Router();
    router.post('/mobil_giris', function(req, res) {
        var email = req.body.email, sifre = req.body.sifre;
        KullaniciModeli.findOne({email : email, sifre : sifre, aktif : true}, function(dbHatasi, kullanici) {
            console.log(kullanici);
            if(dbHatasi){
                res.send({state : false, response : hata});
                return;
            }
            if(kullanici == null){
                res.send({state : false, response : "Kullanici bulunamadi."});
                return;
            }
            res.send({state : true, response : kullanici});
        });
    });
    
    router.post('/mobil_kayit', function(req, res) {
        //console.log('req.body : ' + JSON.parse(req.body));
        
        var api_key = getHash(req.body.email + req.body.gsm1);
        //console.log('apikey : ' + api_key);
        
        req.body.apiKey = api_key;
        req.body.rol = 'mobil';
        req.body.hesapTipi = 'basit';
        req.body.aktif = true;
        
        var kullanici = new KullaniciModeli(req.body);
        kullanici.save(function(hata, eklenen){
            console.log(eklenen);
            if(hata){
                res.send({state : false, response : hata});
                return;
            }
            res.send({state : true, response : eklenen});
        });
    });
    
    /*router.post('/giris', function(req, res) {
        var email = req.body.email, sifre = req.body.sifre;
        KullaniciModeli.findOne({email : email, sifre : sifre, aktif : true}, function(dbHatasi, kullanici) {
            console.log(kullanici);
            if(dbHatasi || !kullanici) {
                req.session.giris = false;
                req.session.mesaj = 'Hatali kullanici adi veya sifre.';
                res.send({state : false, data : req.session.mesaj});
                return;
            }
            req.session.giris = true;
            req.session.kullanici = kullanici;
            res.redirect('/html/anasayfa_firma');
        });
    });*/
    
    /*router.get('/cikis', function(req, res){
        req.session.destroy();
        // cookie based session destroy
        req.session = null;
        res.redirect('/');
    });*/
    
    return router;
}
                
function getHash(stream) {
    var hash = crypto.createHash('sha1');
    hash.setEncoding('hex');
    hash.write(stream);
    hash.end();
    return hash.read();
}
    
module.exports = Hesap;
