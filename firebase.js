
// all the firebasae functions in one js file






//sign up a new user
function signUp() {

  var ending = "@somemail.com"
  var username = document.getElementById("user").value;
  var email = username.concat(ending);
  var password = document.getElementById("pass").value;


  return new Promise((resolve, reject) => {

    // craete a new user
    firebase.auth().createUserWithEmailAndPassword(email, password)

      .then(function (user) {
        resolve(user);
      })

        .catch(function (error) {
       
          reject(error);
          // ...
        });
  });


}



// log in a new user
function Login() {
  var ending = "@somemail.com" //firebase needs an email ending
  var username = document.getElementById("user").value;
  var email = username.concat(ending); // conact the user and the email ending 
  var password = document.getElementById("pass").value;


  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    authfunc();
    // ...
  });


}


//log out a user
function logout() {



  firebase.auth().signOut();
  window.location.replace("Login.html");

}
// check if the user is sign in or not
function authfunc() {


  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      //const userUID = user.uid;
      // User is signed in.
      //alert('welcome');
      //  window.location.replace("Homepage.html");
    }
    else {

      document.getElementById("validation_notes").style.visibility = "visible";
     //window.location.replace("Login.html");


    }
  });
}


