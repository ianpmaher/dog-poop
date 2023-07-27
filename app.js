window.onload = (event) => {
  
  
  // declare fetch() function
  const fetchImage = () => {
    const url = "https://api.thedogapi.com/v1/images/search";

    fetch(url, {
      headers: {
        // "x-api-key": "live_HrMNIJaTAebFXphkPGrvAcwT6K4ojinQBHMbeK0H76tGbXd9at62d4tnrQNCuwFy",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          imagesData = data[0];
          document.querySelector("#dog-pic").src = imagesData.url;
          console.log(imagesData.url);
        },
        (err) => console.log(err)
      );
  };
  

  // function to toggle display of attributions
  const toggleAttributions = () => {
    let attrElem = document.querySelector("#attributions")
    if (attrElem.style.display === "none") {
      attrElem.style.display = "block";
    } else {
      attrElem.style.display = "none"
    }
  }


  // buttons declarations and function assignment
  // pic button to randomize picture
  const picButton = document.querySelector("#pic-button");
  picButton.addEventListener("click", fetchImage);
  // attributions button to toggle display of attributions
  const attributionsButton = document.querySelector("#attributions-button");
  attributionsButton.addEventListener("click", toggleAttributions)



};