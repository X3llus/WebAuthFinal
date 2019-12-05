function getDestinations() {
  var data = JSON.stringify({
    empty: "string"
  })
  var url = "getDestinations"
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");

  xhr.onreadystatechange = function() { //Call a function when the state changes.
      if (xhr.readyState == 4 && xhr.status == 200) {
          var thing = JSON.parse(xhr.responseText);
          listListings(thing.data)
      }
  }
  xhr.send(data);
}

function listListings(_listings) {
  console.log("run");
  var _numList = _listings.length;

  let node;
  let nodeImage;
  let nodeTitle;
  let nodeDesc;
  let nodeTeam;

  for(i = 0; i < _numList; i++) {
    node = document.createElement(`button`);
    node.setAttribute("class", "destination");
    node.setAttribute("id", _listings[i].location);
    node.setAttribute("type", "button");
    node.setAttribute("onclick", "viewLocation(this.location)")
    nodeImage = document.createElement(`img`);
    nodeImage.setAttribute("src", "../images/" + _listings[i].imageurl);
    nodeImage.setAttribute("width", "200");
    nodeImage.setAttribute("height", "200");
    nodeTitle = document.createElement(`h2`);
    nodeTitle.appendChild(document.createTextNode(_listings[i].location));
    nodeDesc = document.createElement(`p`);
    nodeDesc.appendChild(document.createTextNode(_listings[i].description));
    node.appendChild(nodeImage);
    node.appendChild(nodeTitle);
    node.appendChild(nodeDesc);
    document.getElementById("allDestinations").appendChild(node)
  }
}

function viewLocation(location) {
  sessionStorage.setItem("location", location);
  window.location.href = "/detail";
}
