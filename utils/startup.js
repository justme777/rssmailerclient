var rssmailer = window.store||{};
rssmailer.vm =rssmailer.vm||{};
rssmailer.util = rssmailer.util||{}; 
rssmailer.util.startup = rssmailer.util.startup || {};
var model = rssmailer.util.startup;

model.loadConfig = function(){
   /* $.getJSON("config.json", function (json) {
        $.each(json, function (k, v) {
            localStorage.setItem(k, v);
        });
    });*/
}

model.loadViews=function(){
    $("#sidebar-wrapper").load("/view/leftmenuview.html");
    $("#mainview").load("/view/mainview.html");    
}

model.login = function(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var postData = { 'email': email, 'password': password };
    
    $.ajax({
        type: "POST",
        url: document.serverUrl+"?name=getUser",
        data: postData,
        dataType: "json",
        success: function (res) {
            if(res['id']){
                setCookie('email',res['email'], 7);
                setCookie('password',res['password'], 7);
                setCookie('userId',res['id'], 7);
                setCookie('reg_date',res['reg_date'], 7);
                window.location = 'index.html';
            }else{
                alert('error');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}