rssmailer.vm.widget = rssmailer.vm.widget||{};
var model = rssmailer.vm.widget;

model.widgets = ko.observableArray();

model.settings_Id;
model.settings_widgetId;
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

model.loadWidgetSettings = function(){
    var postData = { 'widgetId': model.settings_widgetId };
    $.ajax({
        type: "POST",
        url: document.serverUrl+"?name=getWidgetSettings",
        data: postData,
      dataType: "json",
        success: function (res) {
            model.settings_Id = res['id'];
            model.settings_sender_name(res['sender_name']);
            model.settings_email(res['email']);
            model.settings_password(res['password']);
            
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
    
}

model.showWidgetSettings = function(){
    model.settings_widgetId = this['id'];
    model.loadWidgetSettings();
    $('#widgetSettingsModal').modal();

}

model.create_widget_settings=function(){
    var obj={};
    obj.widgetId=model.settings_widgetId;
    obj.email=model.settings_email();
    obj.password=model.settings_password();
    obj.sender_name = model.settings_sender_name();
    var functionName = "createWidgetSettings";
    if(model.settings_Id>0){ functionName="updateWidgetSettings"; }
    var postData = { 'widget_settings': obj };
    $.ajax({
        type: "POST",
        url: document.serverUrl+"?name="+functionName,
        data: postData,
      dataType: "html",
        success: function (res) {
            $('#widgetSettingsModal').modal('hide');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
    
}

model.create_letter = function(){
    document.widgetGuid =this['guid'];
    $("#mainview").load("/view/create_letter_view.html");
}

model.showNewsContent = function(){
    var widgetId = this['id'];
    var url = this['rss'];
    $.ajax({ 
        type: "POST",
        url: document.serverUrl+"?name=getHtmlFromRss",
        data: { rss:url },
        dataType: 'html',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
        success: function (result) {
            $( ".newsfeed_item" ).each(function(index){
                var id =$(this).text(); 
                if(id==widgetId){
                    $(this).html(result);
                    $(this).css('margin-top','0px'); 
                    $(this).css('height','auto');        
                }
            });   
        }
    });    
    
}
