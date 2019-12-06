function getLocation() {
  var _location = sessionStorage.getItem("location");
  sessionStorage.removeItem("location");

  document.getElementById("destination").appendChild(document.createTextNode(_location));

  data = JSON.stringify({
    location: _location
  });
  url = "getLocation"
  xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var thing = JSON.parse(xhr.responseText);
      makePage(thing.data);
      console.log(thing);
    }
  }
  xhr.send(data)
}

function makePage(data) {
  var _len = data.length;

  let node;
  let nLeft;
  let nRight;
  let nTitle;
  let nCost;
  let nStart = new Date();
  let nEnd = new Date();
  let nDate;
  let nAvailable;
  let nLabel;
  let nCounter;

  /*
  I really despised making this part but it works and that makes me happy
  */
  for (let i = 0; i < _len; i++) {
    const it = data[i];

    node = document.createElement(`div`);
    node.setAttribute("class", "location");
    nLeft = document.createElement(`div`);
    nLeft.setAttribute("class", "left");
    nRight = document.createElement(`div`);
    nRight.setAttribute("class", "right");
    nTitle = document.createElement(`h2`);
    nTitle.appendChild(document.createTextNode(it.title));
    nCost = document.createElement(`h4`);
    nCost.setAttribute("class", "cost");
    nCost.appendChild(document.createTextNode("Cost per person: " + it.cost));
    nDate = document.createElement(`h3`);
    nDate.appendChild(document.createTextNode(it.start.substring(0, 10) + " to " + it.end.substring(0, 10)))
    nLabel = document.createElement(`label`);
    nLabel.setAttribute("for", it.id);
    nLabel.appendChild(document.createTextNode("How many?"))
    nCounter = document.createElement(`input`);
    nCounter.setAttribute("id", it.id);
    nCounter.setAttribute("type", "number");
    nCounter.setAttribute("name", it.id);
    nCounter.setAttribute("min", "0");
    nCounter.setAttribute("max", it.available);
    nCounter.setAttribute("value", "0");
    nLeft.appendChild(nTitle);
    nLeft.appendChild(nDate);
    nLeft.appendChild(nCost);
    nRight.appendChild(nLabel);
    nRight.appendChild(nCounter);
    node.appendChild(nLeft);
    node.appendChild(nRight);
    document.getElementById("locations").appendChild(node);
  }

  let submit = document.createElement(`input`);
  submit.setAttribute("type", "button");
  submit.setAttribute("value", "Purchase");
  submit.setAttribute("onclick", "order()");
  document.getElementById("locations").appendChild(submit);
}

function order() {
  let _destinations = document.querySelectorAll("input[type=number]");
  let _orders = [];

  if (sessionStorage.getItem("email") == null) {
    alert("Not signed in");
  } else {
    let _email = sessionStorage.getItem("email");

    for (var i = 0; i < _destinations.length; i++) {
      let it = _destinations[i];
      if (it.value > 0) {
        _orders.push({
          id: it.id,
          numOf: it.value
        });
      }
    }

    data = JSON.stringify({
      email: _email,
      orders: _orders
    });

    url = "makeOrders"
    xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var thing = JSON.parse(xhr.responseText);
        makePage(thing.data);
        console.log(thing);
      }
    }
    xhr.send(data)
  }
}
