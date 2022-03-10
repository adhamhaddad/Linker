$(document).ready(function(){

    var passwd = $("div.container div.login-box div.form form #pass").val(),
        username = $("div.container div.login-box div.form form #user").val();

    /*
    $("div.container div.login-box div.form form button[type='submit']").on("submit",function(){
        if (passwd === 12345 && username === "adham"){
            
            return;
        };
    })
    */
    // $("div.container div.login-box div.form form").preventDefault();

    $("div.container div.login-box div.form form").submit(function(event){
        // event.preventDefault();
    });
    // $("div.container div.login-box div.form form > span").css({display:"block"});



    $("div.container div.login-box div.form form button").attr() = "enabled"
});
// /Tests/HTML/gui users/profile-port.html
// preventDefault()
// isDefaultPrevented()