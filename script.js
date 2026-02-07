const audio = document.getElementById("audio");
audio.src = "assets/die-hard.mp3";
audio.loop = true;
audio.volume = 0.6;

const playBtn = document.querySelector(".play-btn");
const playIcon = playBtn.querySelector("i");
let isPlaying = false;

// play/pause toggle
playBtn.addEventListener("click", function() {
  if (isPlaying) {
    audio.pause();
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
    isPlaying = false;
  } else {
    audio.play();
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
    isPlaying = true;
  }
});

// progress bar stuff
const progressBar = document.querySelector(".progress-bar input");
const currentTime = document.querySelector(".progress-bar span:first-child");
const duration = document.querySelector(".progress-bar span:last-child");

audio.addEventListener("loadedmetadata", function() {
  progressBar.max = audio.duration;
  duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", function() {
  progressBar.value = audio.currentTime;
  currentTime.textContent = formatTime(audio.currentTime);
  
  let percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.setProperty("--progress", percent + "%");
});

progressBar.addEventListener("input", function() {
  audio.currentTime = progressBar.value;
});

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  if (sec < 10) {
    sec = "0" + sec;
  }
  return min + ":" + sec;
}

// volume slider
const volumeSlider = document.getElementById("volume-slider");
const volumeIcon = document.querySelector(".fa-volume-high");

volumeSlider.addEventListener("input", function() {
  audio.volume = volumeSlider.value / 100;
  
  if (audio.volume == 0) {
    volumeIcon.className = "fa-solid fa-volume-xmark";
  } else if (audio.volume < 0.5) {
    volumeIcon.className = "fa-solid fa-volume-low";
  } else {
    volumeIcon.className = "fa-solid fa-volume-high";
  }
});
