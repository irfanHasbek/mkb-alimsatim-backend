var express = require('express');

function CRUD(model){
    var router = express.Router();
    router.get('/listele', function(req, res) {
        model.find({}, function(dbHatasi, listelenen) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else{
                res.send({state : true, data : listelenen});
            }
        });
    });
    
    router.post('/ara', function(req, res) {
        var aramaKriteri = req.body.kriter;
        var istenen = req.body.istenen;
        console.log("req : " + JSON.stringify(req.body) + ", kriter : " + JSON.stringify(aramaKriteri) + " ,istenen : " + JSON.stringify(istenen));
        model.find(aramaKriteri, istenen, function(dbHatasi, listelenen) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else{
                res.send({state : true, data : listelenen});
            }
        });
    });

    router.post('/ekle', function(req, res){  
        var modelObject = new model(req.body);
        modelObject.save(function(dbHatasi, eklenen) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
                res.send({state : true, data : eklenen});
            }
        });
    });
    //coklu resim iceren objeler
    router.post('/ekle_fotografli', function(req, res){  
        var temp = req.body;
        temp.fotograflar = JSON.parse(req.body.fotograflar);
        var modelObject = new model(temp);
        //console.log(JSON.stringify(modelObject));
        modelObject.save(function(dbHatasi, eklenen) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
                res.send({state : true, data : eklenen});
            }
        });
    });
    
    router.get('/hepsinisil', function(req, res) {
        model.remove({}, function(dbHatasi) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
                res.send({state : true, data : "Tumu silindi."});
            }
        });
    });
    
    router.post('/sil', function(req, res) {
        //console.log(JSON.stringify(req.body));
        model.remove(req.body, function(dbHatasi) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
                res.send({state : true, data : "Veri silindi."});
            }
        });
    });
    
    router.post('/getir', function(req, res) {
        //console.log(JSON.stringify(req.body));
        model.findOne(req.body, function(dbHatasi, getirilen) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
                res.send({state : true, data : getirilen});
            }
        });
    });
    
    router.post('/guncelle', function(req, res) {
        //console.log(JSON.stringify(req.body));
        model.update({_id : req.body._id}, req.body, function(dbHatasi, etkilenenSatir) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
                res.send({state : true, data : etkilenenSatir});
            }
        });
    });
    /*
        CityModel.update({_id: city._id},{$pushAll : newTown},function(err, town){     
    */
    router.post('/arrayekle', function(req, res) {
        //console.log(JSON.stringify(req.body.arrayItem));
        model.update({_id : req.body._id}, {$pushAll : JSON.parse(req.body.arrayItem)}, function(dbHatasi, etkilenenSatir) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
                res.send({state : true, data : etkilenenSatir});
            }
        });
    });
    
    /*
        //{$pull :{ towns : {townName : resp.townName}}    
    */
    router.post('/arraysil', function(req, res) {
        //console.log(JSON.stringify(req.body.arrayItem));
        model.update({_id : req.body._id}, {$pull : req.body.arrayItem}, function(dbHatasi, etkilenenSatir) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
                res.send({state : true, data : etkilenenSatir});
            }
        });
    });
    
    return router;
}
module.exports = CRUD;
