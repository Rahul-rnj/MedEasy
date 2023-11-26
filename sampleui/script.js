fetch("http://localhost:3000/products/656343df48aa8493fc42b826")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then(data => {
    console.log(data);
    displayData(data)
  })
  .catch((error) => console.error("FETCH ERROR:", error));

  function displayData(data) {
    const dataDiv = document.getElementById("data");
    document.getElementById("title").innerHTML = data["title"];
    document.getElementById("des").innerHTML = data["description"];
    document.getElementById("price").innerHTML = data["price"];
    document.getElementById("category").innerHTML = data["category"];
    console.log("Image : "+data["image"]["data"]["data"]);

    var imgsrc = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, data["image"]["data"]["data"]));
    document.getElementById("img").src = imgsrc

  }   