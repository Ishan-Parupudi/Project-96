//YOUR FIREBASE LINKS
var firebaseConfig = {
    apiKey: "AIzaSyDv7dH-CRD1iJjzEwAiNxwbLWHR0fpgdto",
    authDomain: "edchemy-jr.firebaseapp.com",
    databaseURL: "https://edchemy-jr-default-rtdb.firebaseio.com",
    projectId: "edchemy-jr",
    storageBucket: "edchemy-jr.appspot.com",
    messagingSenderId: "62250456771",
    appId: "1:62250456771:web:79047284ceb205af4e7476",
    measurementId: "G-PDLS29ZFTV"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  username=localStorage.getItem("user_name");
  Room_names=localStorage.getItem("Room_names");

  function send()
  {
      msg=document.getElementById("msg").value;
      firebase.database().ref(Room_names).push({
name: username,
message:msg,
like:0       
      });
      document.getElementById("msg").value="";
  }


function getData() { firebase.database().ref("/"+Room_names).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
    console.log(firebase_message_id);
    console.log(message_data);
    name=message_data['name'];
    message=message_data['message'];
    like=message_data['like'];
    var name_with_tag="<h4>" + name + "<img class='user_tick' src='tick.png'> </h4>";
    var message_with_tag="<h4 class='message_h4'>" + message + "</h4>";
    var like_button="<button class='btn btn-danger' id=" + firebase_message_id +"value= " + like + "onclick='updateLike(this.id)'>"; 
    var span_with_tag= "<span class='glyphicon glyphicon-star'> Like:"  + like + "</span> </button> <hr>";
    var row= name_with_tag + message_with_tag + like_button + span_with_tag;

document.getElementById("output").innerHTML +=row;
//End code
      } });  }); }

     getData();

      function logout2()
      {
localStorage.removeItem("user_name");
localStorage.removeItem("password");

            window.location="kwitter.html";
      }

function updateLike(message_id)
{
 console.log("clicked on like button - " + message_id);
 button_id= message_id;
 likes= document.getElementById(button_id).value;
 updated_likes= Number(likes) + 1;
 console.log(updated_likes);
 firebase.database().ref(Room_names).child(message_id).update({
     like: updated_likes
 });
 document.getElementById(likes).innerHTML=updated_likes;
}

function goBack()
{
    window.location="kwitter_room.html"
}