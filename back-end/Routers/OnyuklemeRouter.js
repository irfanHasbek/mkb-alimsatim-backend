var express = require('express');
var KullaniciModeli = require('../Modeller/KullaniciModeli');

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
    
    return router;
}
module.exports = OnyuklmemeRouter;
