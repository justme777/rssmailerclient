var rssmailer = window.store||{};
rssmailer.vm =rssmailer.vm||{};
rssmailer.util = rssmailer.util||{}; 
rssmailer.util.startup = rssmailer.util.startup || {};
var model = rssmailer.util.startup;

model.loadConfig = function(){
    $.getJSON("config.json", function (json) {
        $.each(json, function (k, v) {
            localStorage.setItem(k, v);
        });
    });
}

model.loadViews=function(){
    $("#sidebar-wrapper").load("/view/leftmenuview.html");
    $("#mainview").load("/view/mainview.html");    
}

model.login = function(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var postData = { 'username': username, 'password': password };



    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: localStorage.getItem("services_url") + "system/auth?token=0",
        data: JSON.stringify(postData),
        dataType: "json",
        success: function (res) {
            alert(res);
            localStorage.setItem("token", res);
            if (res == 401) {

            }
            else {
                window.location = "index.html";
            }
        }
    });
}