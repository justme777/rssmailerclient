rssmailer.vm.widget = rssmailer.vm.widget||{};
var model = rssmailer.vm.widget;

model.createWidget = function(){
    var r = document.getElementById("txtRssLink").value;
    var u = 1;
    var postData = { 'rss': r, 'userId': u };
    
    
     $.ajax({
        type: "POST",
        url: "http://rssmailer:8181/rest.php?name=createWidget",
        data: { rss:r, userId:u},
        dataType: 'html',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
        success: function (result) {
            alert(result);
        }
     });    
    /*
     $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://rssmailer:8181/rest.php?name=createWidget",
        data: JSON.stringify(postData),
        dataType: "json",
        success: function (res) {
            alert(res);
        }
    });
    */
}

