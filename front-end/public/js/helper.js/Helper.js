function wsPost(url, data, cb) {
    $.ajax({
        dataType: 'json',
        headers: {
            "Content-Type" :"application/json"
        },
        type:'POST',
        data: JSON.stringify(data),
        url: url,
        success: function(data)
        {
            cb(null, data);
        },
        error: function(data)
        {
            cb(data, null);
        }
    });
}

function wsGet(url, cb) {
    $.ajax({
        dataType: 'json',
        headers: {
            Accept :"application/json"
        },
        type:'GET',
        url: url,
        success: function(data)
        {
            cb(null, data);
        },
        error: function(data)
        {
            cb(data, null);
        }
    });
}

function reset () {
    $("#toggleCSS").attr("href", "/css/alertify.default.css");
    alertify.set({
        labels : {
            ok     : "Onayla",
            cancel : "İptal Et"
        },
        delay : 5000,
        buttonReverse : false,
        buttonFocus   : "ok"
    });
}

function giveMessage(message,type)
{
    if(type == "standart")
    {
        reset();
        alertify.log(message);
    }
    if(type == "success")
    {
        reset();
        alertify.success(message);
    }
    if(type == "error")
    {
        reset();
        alertify.error(message);
    }
}
var myLocation;
function showPosition(position)
{
    if(myLocation){
        myLocation.setMap(null);   
    }
    var lat = position.coords.latitude;
    var lang = position.coords.longitude;
    
    var latLng = new google.maps.LatLng(lat, lang);
    map.setZoom(17);
    map.panTo(latLng);
    myLocation = new google.maps.Marker({
        position : latLng,
        map : map,
        icon : "/my_location_2.GIF",
        draggable : true
    });
    ///my_location.PNG"
    $('#latitude').attr('placeholder', lat);
    $('#longitude').attr('placeholder', lang);
    
    $('#liLoading').attr('style','display:none;');
}

function reset () {
    $("#toggleCSS").attr("href", "/css/alertify.default.css");
    alertify.set({
        labels : {
            ok     : "Onayla",
            cancel : "İptal Et"
        },
        delay : 5000,
        buttonReverse : false,
        buttonFocus   : "ok"
    });
}
function removeFromTable(tableClass,url,callback){
    $("."+tableClass).on("click",".sil",function(){
        var id=$(this).closest("tr").attr("id");
        //console.log('id : ' + id);
        var tr=$("."+tableClass).find("tbody").find("tr[id="+id+"]");
        alertify.confirm("Silmek istediğinizden emin misiniz?",
            function(){
                wsPost(url,{_id:id},function(err,data){
                    if(err){
                        console.error(err);
                        return;
                    }
                    alertify.success('Başarı ile silindi.');
                    tr.remove();
                    orderTable("."+tableClass);
                    callback(id);
                }); 
                },
            function() {
               alertify.error('İşlem iptal edildi.');
        });       
    });
}

function removeFromTableNew(tableClass,url,tdOrder,callback){
    $("."+tableClass).on("click",".sil",function(){
        var id=$(this).closest("tr").attr("id");
        var id2=$(this).closest("td").attr("id");
        var data = {icerik : {dosyaAdi : $(this).closest("tr").find('td').eq(tdOrder).text()}};
        //console.log('id : ' + id);
        console.log('data : ' + JSON.stringify(data));
        var tr=$("."+tableClass).find("tbody").find("tr[data="+id2+"]");
        alertify.confirm("Silmek istediğinizden emin misiniz?",
            function(){
                wsPost(url,{_id:id, arrayItem : data},function(err,data){
                    if(err){
                        console.error(err);
                        return;
                    }
                    alertify.success('Başarı ile silindi.');
                    tr.remove();
                    orderTable("."+tableClass);
                    callback(id);
                });
            },
            function() {
               alertify.error('İşlem iptal edildi.');
        });       
    });
}
function updateFromTable(tableClass, url, data, callback){
    $("."+tableClass).on("click",".cancel",function(){
        var id=$(this).closest("td").attr("id");
        var tr=$("."+tableClass).find("tbody").find("tr[id="+id+"]");
        alertify.confirm("Iptal etmek istediğinizden emin misiniz?",
            function(){
                wsPost(url,{ offerId : id, status : data },function(err,data){
                    if(err){
                        console.error(err);
                        return;
                    }
                    alertify.success('Başarı ile guncellendi.');
                    tr.remove();
                    orderTable("."+tableClass);
                    callback(id);
                }); 
                },
            function() {
               alertify.error('İşlem iptal edildi.');
        });       
    });
}
function orderTable(table){
   var trs=$(table+" tbody tr");
    $.each(trs,function(index,item){
       $(table+" tbody tr").eq(index+1).find("td").eq(0).html((index+1)+".");
    }); 
}
function regexMultiKriterOlustur(string) {
    string = string.trim();
    var words = string.split(" ");
 
    var searchString = "";
    for(var i=0; i<words.length; i++) {
        var word = words[i].trim();
 
        if(i + 1 == words.length)
            searchString += word;
        else
            searchString += word + " ";
    }
 
    return {
        $regex : searchString,
        $options : 'i'
    };
}
//divId içini silmek istediğiniz div'in id'sidir
function clearInputs(divId){
    $("#"+divId+" input[type='text']").val("");
    $("#"+divId+" input[type='password']").val("");
    $("#"+divId+" input[type='number']").val(0);
    $("#"+divId+" input[type='email']").val("");
    $("#"+divId+" input[type='url']").val("");
    $("#"+divId+" input[type='checkbox']").prop('checked', false);
}
function restoreSelects(divId){
    $("#"+divId+" select").find('option:contains("Seçiniz")').attr('selected', true);
}
function clearSelects(divId){
    $("#"+divId+" select").empty();
}
function clearTextareas(divId){
   $("#"+divId+" textarea[type='text']").text("");
   $("#"+divId+" textarea[type='text']").val("");
}
function clearTable(tableId){
    $("#"+tableId+" tbody").empty();
}

function organizeDate(my_date){
    var today = new Date(my_date);
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    today = yyyy+'-'+mm+'-'+dd;
    return today;
}

function isNumber(o) {
  return ! isNaN (o-0) && o !== null && o !== "" && o !== false;
}

function toHash(text) {
  var hash = 0, i, chr, len;
  if (text.length == 0) return hash;
  for (i = 0, len = text.length; i < len; i++) {
    chr   = text.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
