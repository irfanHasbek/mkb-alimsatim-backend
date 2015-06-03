var mongoose = require('mongoose');

var IlanModeli = new mongoose.Schema({
    baslik : String,
    icerik : String,
    oncelik : String,
    sehir : String,
    ilce : String,
    fiyat : String,
    fotografListesi : [{dosyaAdi : String, dosyaYolu : String}],
    kategori : String,
    sahibiId : String,
    tarih : {
	type : Date,
        default : Date.now
    },
    begeniSayisi : {
        type : Number,
        default : 0
    },
    yorumSayisi : {
        type : Number,
        default : 0
    }
});

module.exports = mongoose.model('ilanlar', IlanModeli);
