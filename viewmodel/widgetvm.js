rssmailer.vm.widget = rssmailer.vm.widget||{};
var model = rssmailer.vm.widget;

model.widgets = ko.observableArray();

model.createWidget = function(){
    var r = document.getElementById("txtRssLink").value;
    var u = 1;
    var postData = { 'rss': r, 'userId': u };
    
    
     $.ajax({
        type: "POST",
        url: "http://rssmailer/rest.php?name=createWidget",
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
    var postData = { 'userId': 1 };
    $.ajax({
        type: "POST",
        url: "http://rssmailer/rest.php?name=getWidgets",
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
    $("#widgetModal").modal();
}

