const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

toggle.addEventListener("click", togglePlay);

video.addEventListener("timeupdate", handlerProgress);

for (let skip of skipButtons) {
  skip.addEventListener("click", forwardOrBackward);
}

for (let range of ranges) {
  range.addEventListener("change", handleRangeUpdate);
}

function togglePlay() {
  if (video.paused) {
    video.play();
    toggle.innerText = "❚ ❚";
  } else {
    video.pause();
    toggle.innerText = "►";
  }
}

function handlerProgress() {
  const currentProgress = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${currentProgress}%`;
}

function forwardOrBackward(event) {
  let element = event.target;
  video.currentTime += parseFloat(element.attributes["data-skip"].value);
}

function handleRangeUpdate(event) {
  let element = event.target;
  video[element.name] = element.value;
}