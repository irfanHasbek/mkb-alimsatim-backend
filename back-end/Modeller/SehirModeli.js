var mongoose = require('mongoose');

var SehirModeli=new mongoose.Schema({
    sehir:String,
    ilceler:[{ilceAdi : String}]
});
module.exports = mongoose.model("sehirler",SehirModeli);