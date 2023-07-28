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
  // pic button to randomize picture
  const picButton = document.querySelector("#pic-button");
  picButton.addEventListener("click", fetchImage);

  // **** TIMER FUNCTION ****
  // went down rabbit hole based on apparent unreliability of JavaScript's timing functions
  // decided to keep DRY and refrain from massive undertaking in order to rectify milliseconds
  // https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript
  // in depth reading here: https://johnresig.com/blog/how-javascript-timers-work/
  // https://www.sitepoint.com/creating-accurate-timers-in-javascript/

  // target date is so many minutes from "now"
  let targetDatePom = new Date().getTime() + 25 * 60 * 1000;
  const startTimerPom = () => {
    // const countdown = setInterval(function() {
    let now = new Date().getTime() + 500;
    let timeLeft = targetDatePom - now;
    let mins = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let sec = Math.floor((timeLeft % (1000 * 60)) / 1000);
    const counterMinElem = document.querySelector("#minutes");
    counterMinElem.innerHTML = mins.toString() + ":" + (sec < 10 ? "0" : "");
    const counterSecElem = document.querySelector("#seconds");
    counterSecElem.innerHTML = String(sec);
  };

  // this seems to work, but with a DELAY. Not sure why the timer starts regardless of button
  // button only seems to display the numbers since page loaded?
  const timerButtonElem = document.querySelector("#timer-button");
  timerButtonElem.addEventListener(
    "click",
    () => {
      setInterval(startTimerPom, 1000);
    },
    { once: true }
  );

  // const timerResetButtonElem = document.querySelector("#timer-reset");

  // timerButtonElem.addEventListener("click", )

  // timerResetButtonElem.addEventListener("click", clearInterval(timerFunction));

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
