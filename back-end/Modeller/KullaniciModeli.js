var mongoose = require('mongoose');

var KullaniciModeli = new mongoose.Schema({
    isim : String,
    soyisim : String,
    email : String,
    sifre : String,
    rol : String,
    gsm1 : String,
    adres : String,
    rol : String,
    resimLinki : String,
    hesapTipi : String,
    aktif : Boolean,
    apiKey : String,
    sosyalMedya : [{uygulama : String, kullaniciAdi : String, sifre : String}]
});

module.exports = mongoose.model('kullanicilar', KullaniciModeli);
