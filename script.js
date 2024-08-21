console.log("Welcome to Spotify!!")

// Intialize some variables 
let songIndex = 0;
let audioElement = new Audio("./songs/1.mp3");
let masterPlay = document.getElementById("masterplay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songItemPlay = Array.from(document.getElementsByClassName("songItemPlay"));
let masterSongName = document.getElementById("masterSongName");

let songs = [
    {songname:"Warriyo - Mortals [NCS Release]", filePath:"songs/1.mp3", coverPath:"covers/1.jpg"},
    {songname:"Cielo - Huma Huma", filePath:"songs/2.mp3", coverPath:"covers/2.jpg"},
    {songname:"DEAF KEV - Invincible [NCS Release]", filePath:"songs/3.mp3", coverPath:"covers/3.jpg"},
    {songname:"Different Heaven & EH!DE - My Heart", filePath:"songs/4.mp3", coverPath:"covers/4.jpg"},
    {songname:"Janji-Heroes-Tonight ", filePath:"songs/5.mp3", coverPath:"covers/5.jpg"},
    {songname:"Rabba - Salam-e-ishq", filePath:"songs/6.mp3", coverPath:"covers/6.jpg"},
    {songname:"Sakhiyaan - Salam-e-ishq", filePath:"songs/7.mp3", coverPath:"covers/7.jpg"},
    {songname:"Bhula Dena - Salam-e-ishq", filePath:"songs/8.mp3", coverPath:"covers/8.jpg"},
    {songname:"Tumhari Kasam - Salam-e-ishq", filePath:"songs/9.mp3", coverPath:"covers/9.jpg"},
    {songname:"Naa Jaana - Salam-e-ishq", filePath:"songs/10.mp3", coverPath:"covers/10.jpg"}
]
// audioElement.play();

/////////////////////////////////////////LISTEN TO EVENTS////////////////////////////////////////////

//cover and songname change 
songItems.forEach((element,i) =>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songname;      // should not use "value" , use "innerText" as inside span we have text 
});

//////////////////////////// MASTER PLAY /////////////////////////
// Handle play/plause events of masterplay 
masterPlay.addEventListener("click", () => {
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
});

/////////////// PROGRESS BAR ///////////////////////////////////////
// update the progress bar value with the time of song// 
audioElement.addEventListener("timeupdate", ()=>{ 
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

// song duration change on clicking the progress bar // 
myProgressBar.addEventListener("change",()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
});


////////////////// ICONS ////////////////////////////////////////////
// make all the icons of play //
const makeallplays = () => {
    songItemPlay.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
};

// song functionality of icons upon clicking //
songItemPlay.forEach((element) =>{
    element.addEventListener('click', (e) =>{
        makeallplays();
        console.log(audioElement);
        
        songIndex = parseInt(e.target.id);
        audioElement.src = `./songs/${songIndex+1}.mp3`;
        // conditions on bottom part 
        masterSongName.innerText = songs[songIndex].songname;
        masterPlay.classList.add('fa-circle-pause');
        masterPlay.classList.remove('fa-circle-play');
        
        if(audioElement.paused || audioElement.currentTime<=0){
            audioElement.play();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.currentTime = 0;
            gif.style.opacity = 1;
        }
        else{
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        }
    })
});

/////////////////////////// PREVIOUS AND NEXT ICONS /////////////////////////////////
document.getElementById('next').addEventListener("click", () => {
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex +=1;
    }
    makeallplays();
    audioElement.src = `./songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.add('fa-circle-pause');
    masterPlay.classList.remove('fa-circle-play');
});

document.getElementById('previous').addEventListener('click', () => {
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -=1
    }
    makeallplays();
    audioElement.src = `./songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.add('fa-circle-pause');
    masterPlay.classList.remove('fa-circle-play');
});

