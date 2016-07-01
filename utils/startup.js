var rssmailer = window.store||{};
rssmailer.vm =rssmailer.vm||{};
rssmailer.util = rssmailer.util||{}; 
rssmailer.util.startup = rssmailer.util.startup || {};

rssmailer.util.startup.loadViews=function(){
    $("#mainview").load("/view/mainview.html");
}
