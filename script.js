const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('Play');
const nextBtn = document.getElementById('next');

//Music
const songs  = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Aryan'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Aryan'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Aryan'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Aryan'
    }

];

let isPlaying = false;
//play music
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

//play or pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


//Updating the dom
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

let songInd = 0;
//next and prev songs 
function nextSong(){
    songInd++;
    if(songInd> songs.length-1) songInd = 0;
    loadSong(songs[songInd]);
    playSong();
}
function prevSong(){
    songInd--;
    if(songInd<0) songInd = songs.length-1;
    loadSong(songs[songInd]);
    playSong();
}

//On load - select first song
loadSong(songs[songInd]);

//update progress bar time
function updateProgressBar(e){
    if(isPlaying){
        const {duration, currentTime} = e.srcElement;
        //update progress width
        const progressPercent = (currentTime/duration)*100;
        progress.style.width = `${progressPercent}%`;

        //calculation display for duration
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration%60);
        if(durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
        
        //delay switching duration Element to avoid NAN;
        if(durationSeconds){
            durationEl.textContent = `0${durationMinutes}:${durationSeconds}`;
        }

        //calculation display for duration
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60);
        if(currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
        currentTimeEl.textContent = `0${currentMinutes}:${currentSeconds}`;
    }
}

//setting the clicking of progress bar to play a part
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width)*duration;
}

//next and prev event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
//progress bar event listener
