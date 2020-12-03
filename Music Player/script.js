const image = document.querySelector('#cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const background = document.getElementById("background");

// Music
const songs = [
  {
    path: 'https://github.com/WilliamWTC/Extra-Time/blob/master/Music%20Player/songs/Love%20someone.mp3?raw=true',
    displayName: 'Love Someone',
    artist: 'Da Capo',
    cover: "https://github.com/WilliamWTC/Extra-Time/blob/master/Music%20Player/songs/love.jpg?raw=true",
  },
  {
    path: 'https://github.com/WilliamWTC/Extra-Time/blob/master/Music%20Player/songs/Things%20Change.mp3?raw=true',
    displayName: 'Things Change',
    artist: 'Omen ft J.Cole',
    cover: "https://github.com/WilliamWTC/Extra-Time/blob/master/Music%20Player/songs/change.jpg?raw=true",
  },
  {
    path: 'https://github.com/WilliamWTC/Extra-Time/blob/master/Music%20Player/songs/Room%20Service.mp3?raw=true',
    displayName: 'Room Service',
    artist: 'Jenerik Soulz',
    cover: "https://github.com/WilliamWTC/Extra-Time/blob/master/Music%20Player/songs/room.jpg?raw=true",
  },
  {
    path: 'https://github.com/WilliamWTC/Extra-Time/blob/master/Music%20Player/songs/Dosline%20Ft.%20Nonto.mp3?raw=true',
    displayName: 'Ngifunana Nawe',
    artist: 'Dosline ft Nonto',
    cover: "https://github.com/WilliamWTC/Extra-Time/blob/master/Music%20Player/songs/looking.jpg?raw=true",
  },
  {
    path: 'https://github.com/WilliamWTC/Extra-Time/blob/master/Music%20Player/songs/Grown%20Simba.mp3?raw=true',
    displayName: 'Grown Simba',
    artist: 'J.Cole',
    cover: "https://github.com/WilliamWTC/Extra-Time/blob/master/Music%20Player/songs/Simba.jpg?raw=true",
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = song.path;
  changeCover(song.cover);
}

function changeCover(cover) {
  image.classList.remove('active');
  setTimeout(() => {
    image.src = cover;
    image.classList.add('active');
  }, 100)
  background.src = cover;
} 

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
