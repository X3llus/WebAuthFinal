function signUp() {
  let _email = document.getElementById("email").value;
  let _fname = document.getElementById("fname").value;
  let _lname = document.getElementById("lname").value;
  let _pass = document.getElementById("pass").value;
  let _passC = document.getElementById("passC").value;

  var x = 1;

  //password Check
  if (_pass == "" || _pass != _passC) {
    alert("Error: Please check that you've entered and confirmed your password!");
    x = 0;
  }

  if (x == 1) {
    console.log("one");
    var url = "signUp";
    var xhr = new XMLHttpRequest();
    var data = {
      email: _email,
      pass: _pass,
      fname: _fname,
      lname: _lname
    };
    data = JSON.stringify(data);
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() { //Call a function when the state changes.
      console.log(xhr.responseText);
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log("returned");
        var thing = JSON.parse(xhr.responseText);
        if (thing.success == true) {
          sessionStorage.setItem("email", _email);
          window.location.href = './profile'; //Will take you to profile page.
        } else {
          alert("Email in use");
        }
      }
    }
    xhr.send(data);
  }
}
