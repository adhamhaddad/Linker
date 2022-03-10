$(document).ready(function(){
    $(function() {
        $("div.navbar div.content ul li a[title='Profile']")
        .focus()
        .css({backgroundColor: "rgb(55, 55, 55)"});
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