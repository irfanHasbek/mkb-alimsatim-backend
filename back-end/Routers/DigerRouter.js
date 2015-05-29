var express = require('express');
var nodemailer = require('nodemailer');

function Diger(){
    /*var router = express.Router();
    router.post("/mailgonder", function(req, res){
        console.log(JSON.stringify(req.body));
        FirmaModeli.findOne({firmaKodu : req.body.firmaKodu}, function(hata, data){
            if(hata){
                console.log(hata);
                return;
            }
            //console.log('Firma : ' + JSON.stringify(data));
            var smtpTransport = nodemailer.createTransport("SMTP",{
            service: "Gmail",
            auth: {
                user: data.email,
                pass: data.sifre
            }
            });
            var mail = {
                from : 'Sistem' + '<' + req.body.email + '>',
                to: data.email,
                subject: req.body.konu,
                text: req.body.aciklama,
                html: req.body.htmlIcerik
            };
            //sleepFor(12000);
            smtpTransport.sendMail(mail, function(errorMail, response){
                if(errorMail){
                    console.log(errorMail);
                    res.header('Access-Control-Allow-Origin', "*");     // TODO - Make this more secure!!
                    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
                    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
                    res.send({state : false, message : 'Mail Gonderme hatasi'});
                    return;
                }
                else{
                    console.log("Mail Gönderildi: " + response.message);
                }
                smtpTransport.close();
                res.header('Access-Control-Allow-Origin', "*");     // TODO - Make this more secure!!
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
                res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
                res.send({state : true, response : response.message});

            });
        }); 
    });
    
    return router;
    */
}
module.exports = Diger;