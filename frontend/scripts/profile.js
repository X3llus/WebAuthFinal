function checkSignIn() {
  if (sessionStorage.getItem("email") == null) {
    window.location.href = "/signup";
  } else {
    let _email = sessionStorage.getItem("email");

    data = JSON.stringify({
      email: _email
    });
    url = "getProfile"
    xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var thing = JSON.parse(xhr.responseText);
        if (thing.success) {
          makePage(thing.data);
        }
      }
    }
    xhr.send(data)

  }
}

function makePage(data) {

  let _name = data.fname + " " + data.lname;

  let node;
  let nCost;
  let nDate;
  let nAmount;

  document.getElementById("name").innerHTML = _name;

  for (let i = 0; i < data.orders.length; i++) {
    const it = data.orders[i];

    node = document.createElement(`div`);
    node.setAttribute("class", "location");
    nTitle = document.createElement(`h2`);
    nTitle.appendChild(document.createTextNode(it.title));
    nCost = document.createElement(`h4`);
    nCost.appendChild(document.createTextNode("Cost per person: " + it.cost));
    nDate = document.createElement(`h3`);
    nDate.appendChild(document.createTextNode(it.start.substring(0, 10) + " to " + it.end.substring(0, 10)));
    nAmount = document.createElement(`h5`);
    nAmount.appendChild(document.createTextNode("tickets: " + it.num))
    node.appendChild(nTitle);
    node.appendChild(nDate);
    node.appendChild(nCost);
    node.appendChild(nAmount);

    document.getElementById("locations").appendChild(node);

  }
}
