rssmailer.vm.leftmenu = rssmailer.vm.leftmenu || {};
var model = rssmailer.vm.leftmenu;

model.showCreateWidgetView = function(){
    $("#mainview").load("/view/create_widget_view.html");
}

model.showWidgetsView = function(){
    $("#mainview").load("/view/widgetsview.html");
}

model.showCreateLetterView = function(){
    $("#mainview").load("/view/create_letter_view.html");
}

model.showNewFeedView = function(){
    $("#mainview").load("/view/news_feed_view.html");
}