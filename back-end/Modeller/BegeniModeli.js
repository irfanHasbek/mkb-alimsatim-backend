var mongoose = require('mongoose');

var BegeniModeli = new mongoose.Schema({
    sahibiId : String,
    ilanId : String,
    tarih : {
	type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('begeniler', BegeniModeli);
