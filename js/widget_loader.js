(function($){ 
    
getWidgetHtml(); 

function getWidgetHtml(){
    $.ajax({ url: 'http://rssmailerweb/widget-template.php', success: function(data) { 
        $('#rssmailer-container').html(data);
     } });
}
})(jQuery);


function btn_subscribe_click(){
                var g = $('#rssmailer-container').attr('data-widget');
                var em = $('#email').val();
                $('#loadingmessage').show();
                if(validateEmail(em)==true){
                    $.ajax({
                        type: "POST",
                        url: "http://rssmailer/rest.php?name=createSubscription",
                        data: {email:em, guid:g},
                        dataType: 'html',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            $('#loadingmessage').hide();
                            alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                        },
                        success: function (result) {
                            alert(result.d);
                            $('#loadingmessage').hide();
                            $('#rssmailer-container .result').html(result);
                        }
                    });     
                }else{
                    $('#loadingmessage').hide();
                    $('#rssmailer-container .result').html("error");;
                } 
            }
            
            function validateEmail(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }    