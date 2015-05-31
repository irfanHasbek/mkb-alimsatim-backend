var express = require('express');
var KullaniciModeli = require('../Modeller/KullaniciModeli');
require('iced-coffee-script/register');
LineReaderSync = require("line-reader-sync")
var SehirModeli = require('../Modeller/SehirModeli');

function yoneticiOlustur(firmaKodu){
    return {
        firmaKodu : firmaKodu,
        isim : 'isim',
        soyisim : 'Soyisim',
        email : 'yonetici@yonetici.com',
        sifre : '1234',
        rol : 'Yönetici',
        gorev : '',
        gsm1 : '',
        gsm2 : '',
        resimLinki : '',
        hesapTipi : 'Yönetici',
        aktif : true,
        degistiren : 'Sistem'
    }
}

function OnyuklmemeRouter(){
    var router = express.Router();
    router.get('/yoneticiekle', function(req, res){
        var firmaKodu = req.param('firmaKodu');
        new KullaniciModeli(yoneticiOlustur(firmaKodu)).save(function(dbHatasi, eklenen){
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
                res.send({state : true, data : eklenen});
            }
        });
    });
    
    router.get('/sehirtanimi', function(req, res){
        lrs = new LineReaderSync("IL_ILCE_LISTESI.csv");
        var CityArray = [];
        while(true){
            var line = lrs.readline();
            if(line === null){
                break;
            }
            var temp = line.split(';');
            var cityName = temp[0].trim(), stateName = temp[1].trim();
            if(CityArray.length <= 0 || CityArray[CityArray.length - 1].sehir != cityName){
                CityArray.push({sehir : cityName, ilceler : [{ ilceAdi : stateName }]});
            }else if(CityArray[CityArray.length - 1].sehir == cityName){
                CityArray[CityArray.length - 1].ilceler.push({ ilceAdi : stateName });
            }

        }

        for(var i = 0; i < CityArray.length; i++){
            var yeniSehir = new SehirModeli(CityArray[i]);
            yeniSehir.save(function(err, eklenen){
                if(err){
                    console.log("Hata : " + err);
                    return;
                }
            });
        }
            
        res.send({ state : true, message : 'Basarili'});  
    });
    
    return router;
}
module.exports = OnyuklmemeRouter;
