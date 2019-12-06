function signUp() {
  let _email = document.getElementById("email").value;
  let _pass = document.getElementById("pass").value;

  console.log("one");
  var url = "confirm";
  var xhr = new XMLHttpRequest();
  var data = {
    email: _email,
    pass: _pass
  };
  data = JSON.stringify(data);
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function() { //Call a function when the state changes.
    console.log(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == 200) {
      var thing = JSON.parse(xhr.responseText);
      if (thing.success == true) {
        sessionStorage.setItem("email", _email);
        window.location.href = './profile'; //Will take you to profile page.
      } else {
        alert("password incorrect")
      }
    }
  }
  xhr.send(data);
}
