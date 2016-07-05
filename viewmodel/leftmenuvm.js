rssmailer.vm.leftmenu = rssmailer.vm.leftmenu || {};
var model = rssmailer.vm.leftmenu;
model.showRegistrationView = function(){
    $("#mainview").load("/view/registrationview.html");
}

model.showCreateWidgetView = function(){
    $("#mainview").load("/view/create_widget_view.html");
}

model.showWidgetsView = function(){
    $("#mainview").load("/view/widgetsview.html");
    
}