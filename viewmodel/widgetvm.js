rssmailer.vm.widget = rssmailer.vm.widget||{};
var model = rssmailer.vm.widget;

model.widgets = ko.observableArray();

model.createWidget = function(){
    var r = document.getElementById("txtRssLink").value;
    var u = getCookie('userId') ;
    var postData = { 'rss': r, 'userId': u };
    
    
     $.ajax({
        type: "POST",
        url: localStorage.getItem('services_url')+"?name=createWidget",
        data: { rss:r, userId:u},
        dataType: 'html',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
        success: function (result) {
            console.log("ura!");
        }
     });    
}

model.loadWidgets = function(){
    var postData = { 'userId': getCookie('userId') };
    $.ajax({
        type: "POST",
        url: localStorage.getItem('services_url')+"?name=getWidgets",
        data: postData,
      dataType: "json",
        success: function (res) {
            model.widgets(res);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
    
}

model.showWidget = function(){
    var guid = this['guid'];
    var html= "<div id='rssmailer-container' data-widget='"+guid+"'></div><script src='http://"+window.location.hostname+"/js/widget_loader.js' async></script>";
    $('#txtWidgetHtml').val(html);
    $("#widgetModal").modal();
}

