let fillbar = document.querySelector(".fill");
let audios = ["media/Audio_One.mp3", "media/Audio_Two.mp3", "media/Audio_Three.mp3"];
let covers = ["media/cover1.jpg", "media/cover2.jpg", "media/cover3.jpg"];
let names = ["Song 1","Song 2","Song 3"];
let artists = ["Artist 1 - Name 1","Artist 2 - Name 2","Artist 3 - Name 3"]
let currentTime = document.querySelector(".time");

let audio = new Audio();
let currentSong = 0;

// alert(document.getElementById("img").src)

window.onload = playSong;


function playSong() {
  audio.src = audios[currentSong];
  audio.play();
}

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    let playBtn = document.querySelector(".play-pause");
    playBtn.innerHTML = '<i class="fa fa-pause"></i>';
    playBtn.style.paddingLeft = "30px";
    document.querySelector(".img").classList.add("bounce");
    document.querySelector("body").classList.add("animate")

  } else {
    audio.pause();
    playBtn = document.querySelector(".play-pause");
    playBtn.innerHTML = '<i class="fa fa-play"></i>';
    playBtn.style.paddingLeft = "33px";
    document.querySelector(".img").classList.remove("bounce")

  }
}


audio.addEventListener("timeupdate", function() {
  let position = audio.currentTime / audio.duration;
  fillbar.style.width = position * 100 + "%";

  convertTime(Math.round(audio.currentTime));


  if (audio.ended) {
    nextAudio();
  }
});

function convertTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;

  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  currentTime.textContent = min + ":" + sec;
  totalTime(Math.round(audio.duration));
}

function totalTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;

  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  currentTime.textContent += " & " + min + ":" + sec;
}

function addToFav() {
  var element = document.getElementById("heart");
  element.classList.toggle("fas");
}

function nextAudio() {
  currentSong++;
  if (currentSong > 2) {
    currentSong = 0;
  }
  playSong();
  playBtn = document.querySelector(".play-pause");
  playBtn.innerHTML = '<i class="fa fa-pause"></i>';
  playBtn.style.paddingLeft = "30px";

  document.getElementById("img").src= covers[currentSong];
  document.getElementById("nameOfSong").innerHTML= names[currentSong];
  document.getElementById("artist").innerHTML= artists[currentSong];

}

function prevAudio() {
  currentSong--;
  if (currentSong < 0) {
    currentSong = 2;
  }
  playSong();
  playBtn = document.querySelector(".play-pause");
  playBtn.innerHTML = '<i class="fa fa-pause"></i>';
  playBtn.style.paddingLeft = "30px";

  document.getElementById("img").src=covers[currentSong];
  document.getElementById("nameOfSong").innerHTML= names[currentSong];
  document.getElementById("artist").innerHTML= artists[currentSong];

}

function decreaseVolume() {
  audio.volume -= 0.25;
}

function increaseVolume() {
  audio.volume += 0.25;
}


let volumeUp = document.querySelector(".volume-up");
volumeUp.addEventListener("click", function() {
  if (audio.volume === 1) {
    audio.volume = 0;
    document.querySelector(".volume-up i").className = "fa fa-volume-mute";
  } else {
    audio.volume = 1;
    document.querySelector(".volume-up i").className = "fa fa-volume-up";
  }
});
