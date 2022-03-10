$(document).ready(function(){
    $(function() {
        $("div.navbar div.content ul li a[title='Home']")
        .focus()
        .css({backgroundColor: "rgb(55, 55, 55)"});
    });

    /** Menu bar (Beta) **/
    /*
    $("div.navbar div.menu-bar i.fa-bars").on("click",function(){
        if ($(window).width() > 345) {
            $("div.navbar div.menu-bar i.fa-bars").css({float:"left"});
            $("div.navbar div.content").css({display:"block"});
        };
        if ($(window).width() <= 345) {
            $("div.navbar div.menu-bar i.fa-bars").css({float:"right"});
            $("div.navbar div.content").css({display:"block"});
        };
    });
    $("div.navbar div.menu-bar i.fa-bars").on("dblclick",function(){
        if ($(window).width() > 345) {
            $(this).css({float:"right"});
            $("div.navbar div.content").css({display:"none"});
        };
        if ($(window).width() <= 345) {
            $("div.navbar div.menu-bar i.fa-bars").css({float:"left"});
            $("div.navbar div.content").css({display:"none"});
        };
    });
    */
    

    /*
    // Navbar Content-li.sett
    $("li.sett").on("mouseenter",function(){
        $(".sett ul").css({
            display:"block"
        },1500);
    });
    $("li.sett").on("mouseleave",function(){
        $(".sett ul").css({
            display:"none"
        });
    });
    */




    // h4 Hint
    $("h4.hint span").text("published today !");
    $("h4.hint").delay(2000).fadeIn(2500,function(){
        $(this).delay(3000).fadeToggle(2500);
    });
});
/*
$(function(){
    if ($(window).width() > 345 && $("div.navbar div.content").css({display:"block"})) {
        $("div.navbar div.menu-bar i.fa-bars").css({float:"left"});
    }
    if ($(window).width() <= 345 && $("div.navbar div.content").css({display:"block"})) {
        $("div.navbar div.menu-bar i.fa-bars").css({float:"right"});
    }
});
*/