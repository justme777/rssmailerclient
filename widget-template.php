<?
header('Access-Control-Allow-Origin: *');
header('Content-type: text/plain; charset=utf-8');
?>
<link rel="Stylesheet" href="http://<?=$_SERVER['SERVER_NAME']?>/css/widget.css" />
<div class="form">
        <input type="text" id="email" class="email" placeholder="Введите email" />
        <br />
        <div style="height:36px;">
        <a class="link" href="#">Настройки</a>
            <input type="button" id="btn_subscribe" onclick="btn_subscribe_click()" value="Подписаться" >
        </div>
        <div id='loadingmessage' style='display:none'>
            <img src='http://<?=$_SERVER['SERVER_NAME']?>/images/ajax-loader.gif'/>
        </div>
        <div id="widgetResult" class="result"></div>
    </div>