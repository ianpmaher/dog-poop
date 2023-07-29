window.onload = (event) => {
  // declare fetch() function
  const fetchImage = () => {
    const url = "https://api.thedogapi.com/v1/images/search?limit=3";

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
          imagesData1 = data[0];
          imagesData2 = data[1];
          imagesData3 = data[2]
          document.querySelector("#dog-pic1").src = imagesData1.url;
          document.querySelector("#dog-pic2").src = imagesData2.url;
          document.querySelector("#dog-pic3").src = imagesData3.url;
        },
        (err) => console.log(err)
      );
  };
  // by default, will be fetching imagae
  fetchImage();
  // pic button to randomize picture
  const picButton = document.querySelector("#pic-button");
  picButton.addEventListener("click", fetchImage);

  // FETCH DOG FACTS
  // API is same as above
  // I am extremely proud I got this to work
  let arrBreedFacts = [];

  const fetchFact = () => {
    const url = "https://api.thedogapi.com/v1/breeds";

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
          // filtering out the entries that do not have picture, on documentation of theCatAPI
          data = data.filter((img) => img.image?.url != null);
          // for their dog breed json info, they have 264 breeds with unique id numbers (1-264)
          // this took me SO LONG to get right, but it makes sense to me now. I was getting errors
          // because I had filtered out entries without images, and my number of random elements was incorrect as a result
          let randomBreed = Math.floor(Math.random() * data.length)
          arrBreedFacts = data;
          document.querySelector("#breed").textContent = String(arrBreedFacts[randomBreed]["name"]);
          document.querySelector("#example-pic").setAttribute("src", arrBreedFacts[randomBreed].image.url)
          document.querySelector("#purpose").textContent = String(arrBreedFacts[randomBreed]["bred_for"])
          document.querySelector("#breed-group").textContent = String(arrBreedFacts[randomBreed]["breed_group"])
          document.querySelector("#temperament").textContent = String(arrBreedFacts[randomBreed]["temperament"])

          console.log(arrBreedFacts[randomBreed].name);
        },
        (err) => console.log(err)
      );
  };

  // display a breed's info on default when load
  fetchFact();
  // dog fact button to randomize breed
  const factButton = document.querySelector("#fact-button");
  factButton.addEventListener("click", fetchFact)

  // **** TIMER FUNCTION ****
  // went down rabbit hole based on apparent unreliability of JavaScript's timing functions
  // decided to keep DRY and refrain from massive undertaking in order to rectify milliseconds
  // https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript
  // in depth reading here: https://johnresig.com/blog/how-javascript-timers-work/
  // https://www.sitepoint.com/creating-accurate-timers-in-javascript/

  // I found this to be the simpler way of constructing user buttons that will start the counter
  const userTimeInputArr = [25, 10, 5];

  let userSelect25 = document.querySelector("#user-time-pom");
  userSelect25.addEventListener("click", () => {
    sessionAmount = userTimeInputArr[0];
    pomTimer();
  });
  let userSelect10 = document.querySelector("#user-time-10");
  userSelect10.addEventListener("click", () => {
    sessionAmount = userTimeInputArr[1];
    pomTimer();
  });
  let userSelect5 = document.querySelector("#user-time-5");
  userSelect5.addEventListener("click", () => {
    sessionAmount = userTimeInputArr[2];
    pomTimer();
  });

  let pomInterval;
  let state = true;

  const minsElem = document.querySelector("#minutes");
  minsElem.textContent = "00";
  const secElem = document.querySelector("#seconds");
  secElem.textContent = "00";

  const pomTimer = () => {
    if (state) {
      state = false;
      let totalSeconds = sessionAmount * 60;

      const updateSeconds = () => {
        // Function code here.
        // const minsElem = document.querySelector("#minutes");
        // const secElem = document.querySelector("#seconds");

        totalSeconds--;

        let minutesLeft = Math.floor(totalSeconds / 60);
        let secondsLeft = totalSeconds % 60;

        if (secondsLeft < 10) {
          secElem.textContent = "0" + secondsLeft;
        } else {
          secElem.textContent = secondsLeft;
        }
        minsElem.textContent = `${minutesLeft}`;

        if (minutesLeft === 0 && secondsLeft === 0) {
          clearInterval(pomInterval);
        }
      };
      pomInterval = setInterval(updateSeconds, 1000);
    } else {
      console.log("already selected");
    }
  };

  const timerResetButtonElem = document.querySelector("#timer-reset");
  timerResetButtonElem.addEventListener("click", () => {
    clearInterval(pomInterval);
    minsElem.textContent = "00";
    secElem.textContent = "00";
    pomTimer();
  });

  // const timerStopButtonElem = document.querySelector("#timer-stop");
  // timerStopButtonElem.addEventListener("click", () => {
  //   clearInterval(pomInterval);
  //   pomTimer(25);
  // });

  // this seems to work, but with a DELAY. Not sure why the timer starts regardless of button
  // button only seems to display the numbers since page loaded?

  // I am adapting below to allow for buttons to work, I think issue is with scope

  // function to toggle display of attributions
  const toggleAttributions = () => {
    let attrElem = document.querySelector("#attributions");
    if (attrElem.style.display === "none") {
      attrElem.style.display = "block";
    } else {
      attrElem.style.display = "none";
    }
  };

  // buttons declarations and function assignment

  // attributions button to toggle display of attributions
  const attributionsButton = document.querySelector("#attributions-button");
  attributionsButton.addEventListener("click", toggleAttributions);
};

// modal test adapted from MDN page: https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal
// and from https://www.freecodecamp.org/news/how-to-build-a-modal-with-javascript/

const modalElem = document.querySelector(".modal");
// obscuring everything in background
const fillerElem = document.querySelector(".filler");
const modalButton = document.querySelector("#modal-button");
const cancelButton = document.querySelector("#cancel");

const modalOpen = () => {
  modalElem.classList.remove("hidden");
  fillerElem.classList.remove("hidden");
};

modalButton.addEventListener("click", modalOpen);

const closeModal = () => {
  modalElem.classList.add("hidden");
  fillerElem.classList.add("hidden");
};

cancelButton.addEventListener("click", closeModal);
// to allow modal to close when clicked outside of it
fillerElem.addEventListener("click", closeModal);
