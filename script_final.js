const audio = document.getElementById("audio");
audio.src = "assets/die-hard.mp3";
audio.loop = false;
audio.volume = 0.6;

const playBtn = document.querySelector(".play-btn");
const playIcon = playBtn.querySelector("i");
let isPlaying = false;

// Play/pause toggle
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

// Progress bar
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

// Volume slider
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

/* ===================================================
   J. Cole Slider Functionality
   =================================================== */

const jColeTrigger = document.getElementById("jcole-trigger");
const sliderOverlay = document.getElementById("jcole-overlay");
const sliderCards = document.querySelectorAll("#jcole-overlay .slider-card");

// Open slider when clicking J. Cole
if (jColeTrigger) {
  jColeTrigger.addEventListener("click", function() {
    sliderOverlay.style.display = "flex";
  });
}

// Click outside to close slider
if (sliderOverlay) {
  sliderOverlay.addEventListener("click", function(e) {
    if (e.target === sliderOverlay) {
      sliderOverlay.style.display = "none";
    }
  });
}
// Artist card hover sound effect (visual feedback only)
const artistCards = document.querySelectorAll(".artist-card");

artistCards.forEach(card => {
  card.addEventListener("mouseenter", function() {
    this.style.transition = "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
  });
});

// Keyboard shortcuts
document.addEventListener("keydown", function(e) {
  // Space bar to play/pause
  if (e.code === "Space" && e.target.tagName !== "INPUT") {
    e.preventDefault();
    playBtn.click();
  }
  
  // Escape to close J. Cole slider
  if (sliderOverlay && sliderOverlay.style.display === "flex" && e.code === "Escape") {
    e.preventDefault();
    sliderOverlay.style.display = "none";
  }
});
