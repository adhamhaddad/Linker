// Variables
$(document).ready(function(){
    $("div.container-msg form div.input-msg div.inp input").focus();
});

$("div.container div.top div.status h4").delay(2000).fadeIn(1000);
$("div.container div.top div.status h4 span").text("offline");
$("div.container div.top div.status h4 span").text("online");


if ($("div.container div.top div.status h4 span").text() == "offline") {
    $("div.container div.top div.status h4 span").css({
        color:"#888"
    });
    $("div.container div.top div.status h4 i").css({
        background:"#888"
    });
} else if ($("div.container div.top div.status h4 span").text() == "online") {
    $("div.container div.top div.status h4 span").css({
        color:"#fff"
    });
    $("div.container div.top div.status h4 i").css({
        background:"#080"
    });
}


/*
var msg = $("div.container-msg form div.input-msg div.inp input").val();
$("div.container-msg form div.input-msg div.btn button").on("click",function(e){
    e.preventDefault();
    $("div.container div.content div.bottom-side:last-of-type").append("<input type='text' class='test'/>").css({
        content: msg,
        color: "#000"
    });
});
*/

var msg = $("div.container-msg form div.input-msg div.inp input").val();
var bot = "<div class='bottom-side'>"+acuser+"</div>",
    acuser = "<div class='acc-user'>"+msg2+"</div>",
    msg2 = "<span>"+msg+"</span>";


    $("div.container-msg form div.input-msg div.btn button").on("click",function(e){
        e.preventDefault();
        $("div.container div.content div.bottom-side:last-of-type").append($(bot));
    });

/*
    content bottom-side
    acc-user span="new msg"
*/



// Scroll bar
$(function() {
    $("div.container div.content").niceScroll({
        cursorcolor:"#fff",
        cursorwidth:"2.5px",
        smoothscroll: true,
        cursoropacitymin: 0.3,
        cursoropacitymax: 1
    });
});