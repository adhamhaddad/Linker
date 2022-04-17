$(document).ready(function(){
    $(function() {
        $("div.navbar div.content ul li a[title='Profile']")
        .focus()
        .css({backgroundColor: "rgb(55, 55, 55)"});
    });

    // Left Side Name
    $(function(){
        $("div.container div.user-left div.user-id div.name i").on("click",function(){
            $("div.container div.user-left div.user-id div.name input");
        });
    });
    
    
    
    
    // Left Side Info
    $(function(){
        $("div.container div.user-left div.user-info ul li span.edit").on("click",function(){

            $(this).before("div.container div.user-left div.user-info ul li input").css({display:"inline-block"});
            $("div.container div.user-left div.user-info ul li input").on("change",function(){
                $(this).css({display:"none"});
                $("span.edit2").text($("div.container div.user-left div.user-info ul li input").val()).css({display:"inline-block"});
            })
        });

    });






    // Right Side Bio
    $(function(){
        $("div.container div.user-right div.user-bio button.edit").on("click",function(){
            $("div.container div.user-right div.user-bio input").css({
                display: "block"
            });
            $("div.container div.user-right div.user-bio button.save").css({
                display: "inline-block"
            });
        });
    });
    $(function(){
        $("div.container div.user-right div.user-bio button.save").on("click",function(){
            $("div.container div.user-right div.user-bio > p").text($("div.container div.user-right div.user-bio input").val());
            $("div.container div.user-right div.user-bio input").css({
                display: "none"
            });
            $("div.container div.user-right div.user-bio button.save").css({
                display: "none"
            });
        });
    });

    $("div.container div.user-right div.user-bio > p").attr("disabled")






    $(function(){
        $("div.container-body div.creat-post div.post-options div.opt span").on("click",function(){
            $("div.container-body div.creat-post div.post-content").css({display: "block"});
            $("div.container-body div.creat-post div.post-content div.content").append("<input type='text'/>");
            $("div.container-body div.creat-post div.post-content div.content input").css({
                width: "100%",
                height: "50px",
                padding: "5px",
                background: "rgb(55,55,55)",
                border: "none"
            });
            $("div.container-body div.creat-post div.post-content div.save").css({display: "block"});
        });
        $("div.container-body div.creat-post div.post-content div.save").on("click",function(){
            $("div.container-body div.creat-post div.post-content div.content").text($("div.container-body div.creat-post div.post-content div.content input").val());
            $(this).css({display: "none"});
        });
    });



    // Coding Here (Beta)
    var windd = $(window).scrollTop();

    (function(){
        $(window).on("scrollTop",function(){
            if($(this).height() == 100){
                $("h4").css({
                    display: "block"
                })
            };
        })
    });

});
// Scroll bar

$(function() {
    $("div.container div.user-right div.user-bio , div.container div.user-right div.user-footer").niceScroll({
        cursorcolor:"#fff",
        cursorwidth:"2.5px",
        smoothscroll: true,
        cursoropacitymin: 0.7,
        cursoropacitymax: 1
    });
});
$(function() {
    $("div.container-body div.creat-post div.post-content div.content").niceScroll({
        cursorcolor:"#000",
        cursorwidth:"2.5px",
        smoothscroll: true,
        cursoropacitymin: 0.7,
        cursoropacitymax: 1
    });
});