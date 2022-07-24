const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Chill',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Machine',
        artist: 'Jacinto Design',
    }
];

let isPlaying = false;

function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('Pause','title');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong():playSong()));

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

let songIndex = 0;

function prevSong(){
    if(songIndex<0){
        songIndex = songs.length-1;
    }
    else songIndex--;
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong(){
    if(songIndex>songs.length-1){
        songIndex = 0;
    }
    else songIndex++;
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

//On load - Select First Song
loadSong(songs[songIndex]);

function updateProgressBar(e) {
    if(isPlaying) {
        const {duration, currentTime} = e.srcElement;
        console.log(duration,currentTime);
        // Update progress bar width
        const progressPercent = (currentTime/duration)*100;
        progress.style.width = `${progressPercent}%`;

        //Duration
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration%60)
        if(durationSeconds<10) {
            durationSeconds =  `0${durationSeconds}`;
        }
        // Delay
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60)
        if(currentSeconds<10) {
            currentSeconds =  `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        
    }
}

function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width) * duration;
}

//Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
