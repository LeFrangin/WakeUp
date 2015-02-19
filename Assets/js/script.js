function getDataUser()
{
      getQuotesUser();
      getFriendsUser();
      saveToken();
}

function getQuotesUser()
{
    var login = localStorage.getItem("login");
    $.ajax({
        type: "POST",
        crossDomain: true,
        url: "http://ns503844.ip-192-99-12.net/~quoteme/API/request.php",
        data: { qm_quotes_user: "true", login: login},
        success : function(msg){
            if (msg == "no_user")
              logout();
            else
            {
              $("#quotes #quotes-list").html("");
              $("#quotes #quotes-list").prepend(msg);
              localStorage.setItem("quotes", msg);
            }
          },
        error : function(){
            var quotes = localStorage.getItem("quotes");
            $("#quotes #quotes-list").prepend(quotes);
          }
      });
}
function seen()
{
    var login = localStorage.getItem("login");
    $.ajax({
        type: "POST",
        crossDomain: true,
        url: "http://ns503844.ip-192-99-12.net/~quoteme/API/request.php",
        data: { qm_seen_quotes: "true", login: login},
        success : function(msg){
            if (msg == "no_user")
              logout();
            clearTimeout(tim);
          },
        error : function(){
            alert("Houston we lost Internet, over");
          }
      });
}
function getFriendsUser()
{
  var login = localStorage.getItem("login");
  $.ajax({
      type: "POST",
      crossDomain: true,
      url: "http://ns503844.ip-192-99-12.net/~quoteme/API/request.php",
      data: { qm_friends_user: "true", login: login},
      success : function(msg){
              if (msg == "no_user")
                logout();
              else
              {
                $("#friends .list-items").html("");
                $("#friends .list-items").prepend(msg);
                localStorage.setItem("friends", msg);
              }
            },
      error : function(){
            var friends = localStorage.getItem("friends");
            $("#friends .list-items").prepend(friends);
          }
    });
}

function saveToken()
{
  var token = localStorage.getItem("deviceToken");
  var login = localStorage.getItem("login");
  $.ajax({
      type: "POST",
      crossDomain: true,
      url: "http://ns503844.ip-192-99-12.net/~quoteme/API/request.php",
      data: { qm_device_token: "true", token: token, login: login},
        success : function(msg){
            
        },
    });
}
function logout()
{
  localStorage.removeItem('login');
  localStorage.removeItem('deviceToken');
  $.mobile.changePage( "#index", { transition: "flip", changeHash: false });

  $("#quotes .list-items").html("");
  $("#friends .list-items").html("");
}

function goToQuotes()
{
  $.mobile.changePage( "#quotes", { transition: "flip", changeHash: false });
}
function goToFriends()
{
  $.mobile.changePage( "#friends", { transition: "slide", changeHash: false });
}
function openAlert(title, content)
{
  $("#dialog p").html(content);
  $("#dialog h2").html(title);
  $("#dialog, .overlay").fadeIn();
}
function closeAlert()
{
  $("#dialog, .overlay").fadeOut();
}
function signUp()
{
  if ($("#signup input[name=password]").val() == "" || $("#signup input[name=login]").val() == "" )
          {
            //alert("Come on, cut the crap, put your Log in and Password");
            openAlert("Too bad..", "Come on, cut the crap, put your Log in and Password");
            return false;
          }

          var str = $("#signup input[name=login]").val();
          if(/^[a-zA-Z0-9-]*$/.test(str) == false) {
              alert('You are so French, do not use Special Characters, sacré Hubert!');
              return false;
          }

          if ($("#signup input[name=password]").val() != $("#signup input[name=confirm_password]").val() )
          {
            //alert("Seriously, you can't type the same password twice in a row? Get some help!");
            openAlert("Too bad..", "Seriously, you can't type the same password twice in a row? Get some help!");
            return false;
          }


          $.ajax({
            type: "POST",
            crossDomain: true,
            url: "http://ns503844.ip-192-99-12.net/~quoteme/API/request.php",
            data: { qm_signup: "true", login: $("#signup input[name=login]").val(), password: $("#signup input[name=password]").val() },
            success : function(msg){
              if (msg == 'good')
                {
                  localStorage.setItem("login", $("#signup input[name=login]").val());
                  getDataUser();
                  $.mobile.changePage( "#quotes", { transition: "flow", changeHash: false });
                  $("#signup input").val("");
                }
              else
                openAlert("Too bad..", "Your Login has already been taken, like your Mum! :)");
                //alert(" Your Login has already been taken, like your Mum! :)");
            },
             error : function(){
              openAlert("Oops", "Houston we lost Internet, over");
              //alert("Houston we lost Internet, over");
            }
          });
}

function signIn()
{
  if ($("#signin input[name=password]").val() == "" || $("#signin input[name=login]").val() == "" )
          {
            //alert("Come on, cut the crap, put your Log in and Password");
            openAlert("Too bad..", "Come on, cut the crap, put your Log in and Password");
            return false;
          }

          var str = $("#signin input[name=login]").val();
          if(/^[a-zA-Z0-9-]*$/.test(str) == false) {
              //alert('You are so French, do not use Special Characters, sacré Hubert!');
              openAlert("Too bad..", "You are so French, do not use Special Characters, sacré Hubert!");
              return false;
          }

          $.ajax({
            type: "POST",
            crossDomain: true,
            url: "http://ns503844.ip-192-99-12.net/~quoteme/API/request.php",
            data: { qm_signin: "true", login: $("#signin input[name=login]").val(), password: $("#signin input[name=password]").val() },
            success : function(msg){
              if (msg == 'is_user')
                {
                  localStorage.setItem("login", $("#signin input[name=login]").val());
                  $.mobile.changePage( "#quotes", { transition: "flow", changeHash: false });
                  $("#signin input").val("");
                  getDataUser();
                }
              else
                openAlert("Too bad..", "Yo Bitch! Wrong password!");
                //alert("Yo Bitch! Wrong password!");
            },
             error : function(){
              //alert("Houston we lost Internet, over");
              openAlert("Oops", "Houston we lost Internet, over");
            }
          });
}
function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 
function chooseQuote(id)
{
  localStorage.setItem("quote", id);
  $.mobile.changePage( "#friends", { transition: "slide", changeHash: false });
}

function chooseFriend(name)
{
  if ($("#friends .friend[data-name="+name+"] input").is( ":checked" ) )
  {
    $("#friends-list .friend[data-name="+name+"] input").prop( "checked", false );
    $("#friends-list .friend[data-name="+name+"]").removeClass('friend-selected');
  }
  else
  {
    $("#friends-list .friend[data-name="+name+"] input").prop( "checked", true );
    $("#friends-list .friend[data-name="+name+"]").addClass('friend-selected');
  }
}

function sendNewQuote()
{
  var login = localStorage.getItem("login");

  if ($("#new-quote").val() == "")
    {
      //alert("You have to fill the quote");
       openAlert("Too bad..", "Come on, cut the crap, put the quote");
      return;
    }

  $.ajax({
      type: "POST",
      crossDomain: true,
      url: "http://ns503844.ip-192-99-12.net/~quoteme/API/request.php",
      data: { qm_new_quote: "true", login: login, quote: $("#new-quote").val() },
      success : function(msg){
          $("#quotes #quotes-list").prepend(msg);
          localStorage.setItem("quotes", $("#quotes #quotes-list").html());
          $("#new-quote").val("");
          goToQuotes();
      },
      error : function(){
          //alert("Houston we lost Internet, over.");
           openAlert("Oops", "Houston we lost Internet, over.");
        }
    });
}

function sendNewFriend()
{
  var login = localStorage.getItem("login");

  if ($("#add-friends input").val() == "")
    {
      //alert("Come on, cut the crap, put the name of your friend");
      openAlert("Too bad..", "Come on, cut the crap, put the name of your friend");
      return;
    }

  $.ajax({
      type: "POST",
      crossDomain: true,
      url: "http://ns503844.ip-192-99-12.net/~quoteme/API/request.php",
      data: { qm_new_friend: "true", login: login, friend: $("#add-friends input").val() },
      success : function(msg){

          $("#add-friends input").val("");

          if (msg == "no_user")
            openAlert("Too bad..", "Casper doesn't count as a friend");
            //alert("Sorry, your friend doesn't exist.");
          else if (msg == "already_friend")
            openAlert("Too bad", "Idiot ! You are already friends");
           // alert("Idiot ! You are already friend.");
          else
          {
            $("#friends #friends-list").prepend(msg);
            localStorage.setItem("friends", $("#friends #friends-list").html());
            goToFriends();
          }
      },
       error : function(){
          //alert("Houston we lost Internet, over.");
          openAlert("Oops", "Houston we lost Internet, over.");
        }
    });
}
function sendInviteFriend()
  {
    var login = localStorage.getItem("login");
    var email = $("#invite-friends input").val();
    if (email == "")
    {
      //alert("Come on, cut the crap, put the name of your friend");
      openAlert("Too bad..", "Come on, cut the crap, put the name of your friend");
      return;
    }
    if (!validateEmail(email))
    {
      //alert("Don' stop on the bird and write a valid email !");
      openAlert("Too bad..", "Don' stop on the bird and write a valid email !");
      return;
    }

      $.ajax({
        type: "POST",
        crossDomain: true,
        url: "http://ns503844.ip-192-99-12.net/~quoteme/API/request.php",
        data: { qm_invite_friend: "true", login: login, email: email },
        success : function(msg){

            $("#invite-friends input").val("");
            goToFriends();
            //alert("We have send the invitation to your friend.");
            openAlert("Great !", "We have send the invitation to your friend.");
        },
         error : function(){
          //alert("Houston we lost Internet, over.");
          openAlert("Oops", "Houston we lost Internet, over.");
        }
    });
  }
  function sendNotification()
  {
      var login = localStorage.getItem("login");
      var quote = localStorage.getItem("quote");

      var target = $("#form-list-friends").serialize();
      $("#friends .btn-send").hide();
      $("#friends .loader").show();

      $.ajax({
        type: "POST",
        crossDomain: true,
        url: "http://ns503844.ip-192-99-12.net/~quoteme/API/request.php",
        data: target+"&qm_send_quote=true&login="+login+"&quote="+quote,
        success : function(msg){

            goToQuotes();
            $("#friends-list .friend").children('input').prop( "checked", false );
            $("#friends-list .friend").removeClass('friend-selected');
            localStorage.removeItem('target');
            localStorage.removeItem('quote');
            $("#friends .btn-send").show();
            $("#friends .loader").hide();
            //alert("Quote sent, High five Bro ! :-D");
            openAlert("Great !", "Quote sent, High five Bro ! :-D");

        },
         error : function(){
          //alert("Houston we lost Internet, over.");
          openAlert("Oops", "Houston we lost Internet, over.");
        }
    });
  }

function checkConnected()
{
  var login = localStorage.getItem("login");
  if (login != null)
    {
      getDataUser();
      $.mobile.changePage( "#quotes", { transition: "none", changeHash: false });
    }
}

$(document).on("pageshow","#index",function() {
    checkConnected();
});

$(document).on("pagecreate","#signin",function() {
    $("#signin, #signup").on("swiperight",function(){
      $.mobile.changePage( "#index", { transition: "slide", reverse: true, changeHash: false });
  });
});
$(document).on("pagecreate","#signup",function() {
    $("#signin, #signup").on("swiperight",function(){
      $.mobile.changePage( "#index", { transition: "slide", reverse: true, changeHash: false });
  });
});

$(document).bind("mobileinit", function(){
  $.mobile.pushStateEnabled = false;
  $.mobile.defaultPageTransition = 'none';
});

$(document).on("pagecreate","#friends",function() {

  $("#friends").on("swiperight",function(){
      $.mobile.changePage( "#quotes", { transition: "slide", reverse: true, changeHash: false });
  });


});

var tim = setTimeout(function(){
    seen();
}, 5000);