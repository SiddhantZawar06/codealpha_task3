const songs = [
    {
        title: "Song One",
        artist: "Artist A",
        src: "songs/song1.mp3"
    },
    {
        title: "Song Two",
        artist: "Artist B",
        src: "songs/song2.mp3"
    },
    {
        title: "Song Three",
        artist: "Artist C",
        src: "songs/song3.mp3"
    }
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const playBtn = document.getElementById("playBtn");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

let currentIndex = 0;

/* Load Song */
function loadSong(index){
    const song = songs[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    updateActive();
}

loadSong(currentIndex);

/* Play / Pause */
function playPause(){
    if(audio.paused){
        audio.play();
        playBtn.textContent = "⏸";
    }else{
        audio.pause();
        playBtn.textContent = "▶";
    }
}

/* Next Song */
function nextSong(){
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    audio.play();
    playBtn.textContent = "⏸";
}

/* Previous Song */
function prevSong(){
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    audio.play();
    playBtn.textContent = "⏸";
}

/* Update Progress */
audio.addEventListener("timeupdate", () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent || 0;

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

/* Seek */
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

/* Volume */
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

/* Format Time */
function formatTime(time){
    if(isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2,"0");
    return `${minutes}:${seconds}`;
}

/* Autoplay Next */
audio.addEventListener("ended", nextSong);

/* Playlist */
songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
        currentIndex = index;
        loadSong(index);
        audio.play();
        playBtn.textContent = "⏸";
    });
    playlist.appendChild(li);
});

function updateActive(){
    const items = document.querySelectorAll("#playlist li");
    items.forEach(item => item.classList.remove("active"));
    items[currentIndex].classList.add("active");
}
