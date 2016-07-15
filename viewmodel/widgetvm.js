rssmailer.vm.widget = rssmailer.vm.widget||{};
var model = rssmailer.vm.widget;

model.widgets = ko.observableArray();

model.settings_widgetId = ko.observable();
model.settings_sender_name = ko.observable();
model.settings_email = ko.observable();
model.settings_password = ko.observable();

model.createWidget = function(){
    var r = document.getElementById("txtRssLink").value;
    var u = getCookie('userId') ;
    var postData = { 'rss': r, 'userId': u };
    
    
     $.ajax({
        type: "POST",
        url: document.serverUrl+"?name=createWidget",
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
        url: document.serverUrl+"?name=getWidgets",
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
    var html= "<div id='rssmailer-container' data-widget='"+guid+"'></div><script src='http://"+window.location.hostname+"/config.js'></script><script src='http://"+window.location.hostname+"/js/widget_loader.js'></script>";
    $('#txtWidgetHtml').val(html);
    $("#widgetModal").modal();
}

model.showWidgetSettings = function(){
    model.settings_widgetId = this['id'];
    $('#widgetSettingsModal').modal();
}

model.create_widget_settings=function(){

    var obj={};
    obj.widgetId = model.settings_widgetId;
    obj.email=model.settings_email();
    obj.password=model.settings_password();
    obj.sender_name = model.settings_sender_name();
    
    var postData = { 'widget_settings': obj };
    $.ajax({
        type: "POST",
        url: document.serverUrl+"?name=createWidgetSettings",
        data: postData,
      dataType: "html",
        success: function (res) {
            alert(res);
            $('#widgetSettingsModal').modal('hide');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
    
}