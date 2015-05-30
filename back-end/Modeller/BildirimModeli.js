var mongoose = require('mongoose');

var BildirimModeli = new mongoose.Schema({
    baslik : String,
    icerik : String,
    oncelik : String,
    fotografListesi : [{adi : String, lokasyon : String}],
    kategori : String,
    sahibiId : String
});

module.exports = mongoose.model('bildirimler', BildirimModeli);
