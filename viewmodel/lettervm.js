rssmailer.vm.letter = rssmailer.vm.letter||{};
var model = rssmailer.vm.letter;

model.emails = ko.observable("smartdevkz@mail.ru,almasmyltykbayev@mail.ru");
model.subject = ko.observable("Рассылка");
model.html = ko.observable();

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
