window.onload = (event) => {
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

  // const fetchImage = () => {
  //   fetch("https://api.thedogapi.com/v1/images/search", {
  //     method: "get"
  //   })
  //     .then(response => response.json()
  //     ).then(
  //       (data) => {
  //         let imagesData = data
  //         let photoURL = data.url;
  //         const imageElement = document.querySelector("#dog-pic");
  //         imageElement.src = photoURL;

  //         // const container = document.querySelector("#dog-pic");
  //         // container.appendChild(imageElement);
  //       },
  //       (err) => console.log(err)
  //     );
  // };

  const picButton = document.querySelector("#pic-button");
  picButton.addEventListener("click", fetchImage);
};
