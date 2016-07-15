rssmailer.vm.letter = rssmailer.vm.letter||{};
var model = rssmailer.vm.letter;

model.emails = ko.observable("");
model.subject = ko.observable("Рассылка");
model.html = ko.observable();

model.getSubcribersAddress = function(){ 

    if(document.getElementById('cbLoadEmails').checked) {
        var postData = { 'guid': document.widgetGuid };
        $.ajax({
            type: "POST",
            url: document.serverUrl+"?name=getSubcribersAddress",
            data: postData,
        dataType: "json",
            success: function (res) {
                model.displayEmails(res);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
            },
        });    
    } else {
        $('#txtEmails').val('');
        
    }
}

model.displayEmails =function(emails){
    var txt="";
    for(var i=0;i<emails.length;i++){
        if(txt!="")txt+=",";
        txt+=emails[i].email;
    }
    $('#txtEmails').val(txt);
}

model.sendLetter = function(){
    var receivers = model.emails().split(",");
    var sub =model.subject();
    var txt = model.html();

    for(var i=0;i<receivers.length;i++){
         var em = receivers[i];
         $.ajax({
            type: "POST",
            url: document.serverUrl+"?name=sendEmail",
            data: { email:em, subject:sub,text:txt},
            dataType: 'html',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
            },
            success: function (result) {
                console.log(em+":"+result);
            }
        });
    }
}

model.generateNewsText = function(){
    var today=getTodayDate();
    var url="http://kazakh-tv.kz/rss-ru.xml";
    $.ajax({
            type: "POST",
            url: document.serverUrl+"?name=getNewsHtmlFromRSS",
            data: { date:today, rss:url },
            dataType: 'html',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
            },
            success: function (result) {
                model.html(result);
            }
        });
}
