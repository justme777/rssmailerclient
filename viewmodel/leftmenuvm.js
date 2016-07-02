rssmailer.vm.leftmenu = rssmailer.vm.leftmenu || {};

rssmailer.vm.leftmenu.onRegistrationItemClick = function(){
    $("#mainview").load("/view/registrationview.html");
}