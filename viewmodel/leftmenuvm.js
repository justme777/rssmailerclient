rssmailer.vm.leftmenu = rssmailer.vm.leftmenu || {};

rssmailer.vm.leftmenu.showRegistrationView = function(){
    $("#mainview").load("/view/registrationview.html");
}