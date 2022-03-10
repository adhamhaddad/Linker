$(document).ready(function(){
    // Variables
    var notifival = 5,
        msgval = 10,
        allalerts = notifival + msgval;

    /*------------------------------------------------------------------------------*/

    // Messages
    $("div.navbar div.content ul li.msg a").on("click",function(){
        $("div.navbar div.content ul li.msg a div.all-msg").toggleClass("show");
    });
    // This Functions
    $("div.navbar div.content ul li a i.msg span").css({display:"block"}).text(msgval);
    if (msgval === 0 || msgval === "") {
        $("div.navbar div.content ul li a i.msg span").css({display:"none"});
    };
    if (msgval > 99) {
        $("div.navbar div.content ul li a i.msg span").text("+99");
    };

    /*------------------------------------------------------------------------------*/

    // Notifications
    /*
    $("div.navbar div.content ul li.notifi a").on("focus",function(){
        if ( $("div.navbar div.content ul li.msg a div.all-msg").css({display:"block"}) || $("div.navbar div.content ul li.sett ul").css({display:"block"}) ){
            // msg
            $("div.navbar div.content ul li.msg a div.all-msg").css({display:"none"});
            // sett
            $("div.navbar div.content ul li.sett ul").css({display:"none"});
        }
    });
    */
    $("div.navbar div.content ul li.notifi a").on("click",function(){
        $("div.navbar div.content ul li.notifi a div.all-notifi").toggleClass("show");
    });
    // This Functions
    $("div.navbar div.content ul li a i.notifi span").css({display:"block"}).text(notifival);
    if (notifival === 0 || notifival === "") {
        $("div.navbar div.content ul li a i.notifi span").css({display:"none"});
    };
    if (notifival > 99) {
        $("div.navbar div.content ul li a i.notifi span").text("+99");
    };
    if (notifival >= 1) {
        $("div.navbar div.content ul li a i.fa-bell").css({
            animationName:"bell2",
            animationDuration:"1.5s",
            animationIterationCount:notifival
        });
    }

    /*------------------------------------------------------------------------------*/

    // Settings
    $("div.navbar div.content ul li.sett a").on("click",function(){
        $("div.navbar div.content ul li.sett ul").toggleClass("show");
    });

    /*------------------------------------------------------------------------------*/

    // Menu Bar
    $("div.navbar div.menu-bar i span").css({display:"block"}).text(allalerts);
    if (allalerts === 0 || allalerts === "") {
        $("div.navbar div.menu-bar i span").css({display:"none"});
    };
    if (allalerts > 99) {
        $("div.navbar div.menu-bar i span").text("+99");
    };
    // This Functions
    $("div.navbar div.menu-bar i.fa-bars").on("click",function(){
        if ($(window).width() > 345) {
            $("div.navbar div.menu-bar i.fa-bars").toggleClass("test1");
            $("div.navbar div.content").toggleClass("show");
        };
        if ($(window).width() <= 345) {
            $("div.navbar div.menu-bar i.fa-bars").toggleClass("test2");
            $("div.navbar div.content").toggleClass("show");
        };
    });

    /*------------------------------------------------------------------------------*/

    // Posts
    $("div.container-body div.posts div.user-post div.post-date p span.min").text(new Date().getMinutes() + "min");
    // Post Social Icons
    $("div.container-body div.posts div.social div.input input").focus(function(){
        $("div.container-body div.posts div.social div.input i").css({
            color:"#1DA1F2"
        });
    });
    $("div.container-body div.posts div.social div.input input").blur(function(){
        $("div.container-body div.posts div.social div.input i").css({
            color:"#000"
        });
    });

    /*------------------------------------------------------------------------------*/

    // Navbar Social Links
    $(function(){
        if ($(window).width() <= 345) {
            $("div.links").delay(5000).fadeIn(1500);
        };
    });

    /*------------------------------------------------------------------------------*/
});
// Scroll bar
$(function() {
    $("div.navbar div.content ul li.msg div.all-msg .msg-iframe , div.navbar div.content ul li.notifi div.all-notifi .notifi-iframe").niceScroll({
        cursorcolor:"#fff",
        cursorwidth:"2.5px",
        smoothscroll: true,
        cursoropacitymin: 0.7,
        cursoropacitymax: 1
    });
});
// Scroll bar
$(function() {
    $("body").niceScroll({
        cursorcolor:"rgb(32, 32, 32)",
        cursorwidth:"7px",
        zindex:"1200",
        cursoropacitymin: "0.4",
        cursoropacitymax: "1",
        smoothscroll: true
    });
});