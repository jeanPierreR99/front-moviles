firebase.initializeApp({
  apiKey: "AIzaSyCUoydTYO5LPGtHF6Va8aUd8WWBWFvq6T0",
  authDomain: "moviles-ecda5.firebaseapp.com",
  projectId: "moviles-ecda5",
  storageBucket: "moviles-ecda5.appspot.com",
  messagingSenderId: "861847196493",
  appId: "1:861847196493:web:1727cd9e9a77a3e3fe1d04"
});

const db = firebase.firestore();
const ref_admin = db.collection("Admin");

var sendForm = document.getElementById("sendForm");

$("#view_pass").on("click", () => {
  var passwordInput = document.getElementById("password");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});


var user = document.getElementById("user");
var data = "";

user.addEventListener("input", async (e) => {
  var val = e.target.value;

  if (val.length == 8) {
    data = await fetch(`https://apis-unamads.vercel.app/apis_js_ps/${val}`)
      .then(response => response.json())
      .then(data => {
        return data
      })
    console.log("loader")

    if (data != "") {
      $("#div-email").toggleClass("hidden block")
      console.log("si hay")
    }
    else {
      $("#div-email").removeClass("block")
      $("#email").val("")
      console.log("no hay")
    }
  }
  else {
    $("#div-email").removeClass("block")
    $("#email").val("")
    $("#div-email").addClass("hidden")
  }
})

sendForm.addEventListener("submit", (e) => {
  e.preventDefault()
  var code = $("#user").val();
  var email = $("#email").val();
  var password = $("#password").val();
  var type_user_storage = [];

  if (code != "" && email != "" && password != "") {
    console.log("es un usuario normal")

    $(".loader").removeClass("hidden")
    var lengthData = data[0].fullName;
    var lengthDataSplit = lengthData.split(" ").pop() + data[0].admisionDate;
    console.log(lengthDataSplit)
    if (password == lengthDataSplit) {
      $(".loader").addClass("hidden")

      type_user_storage = {
        id: code,
        name_user: data[0].fullName,
        mail: email
      };

      localStorage.setItem(
        "current_user",
        JSON.stringify(type_user_storage)
      );

      window.location = "/client"
    }
    else {
      $(".loader").addClass("hidden")
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Su cuenta no existe",
        showConfirmButton: false,
        timer: 1500,
      });
    }

  }
  else if (code != "" && password != "") {
    console.log("es un usuario admi")

    $(".loader").removeClass("hidden")
    ref_admin
      .where("user_user", "==", "" + code + "")
      .where("user_password", "==", "" + password + "")
      .get()
      .then((snapshop) => {
        if (!snapshop.empty) {
          var data = snapshop.docs[0].data();
          if (data.user_type == "1") {
            ref_admin
              .doc(data.id)
              .update({
                user_status: "online",
              })
              .then(function () {
                type_user_storage = {
                  id: data.id,
                  name_user: data.name_user,
                };

                localStorage.setItem(
                  "current_user",
                  JSON.stringify(type_user_storage)
                );
                $(".loader").addClass("hidden")
                window.location = "./admin";
              });
          }
        } else {
          $(".loader").addClass("hidden")
          Swal.fire({
            position: "center",
            icon: "info",
            title: "Su cuenta no existe",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });

  }
  else if (code == "" || email == "" || password == "") {
    Swal.fire({
      position: "center",
      icon: "info",
      title: "Rellene los campos",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});
