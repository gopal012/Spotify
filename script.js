console.log("Welcome to spotify");

//initialising the variable
let songIndex = 1;
var audioElements = new Audio("songs/song1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let masterSong = document.getElementById("masterSong");
var gif = document.querySelector("#gif");
var botbg = document.querySelector(".bottom");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let prevIndex = 0;
let currTime=document.getElementById("currTime");

let songs = [
  {songName: "Besharam Rang",filePath: "songs/song1.mp3",coverPath: "cover_pic/c1.jpg",},
  {songName: "Kesariya",filePath: "songs/song2.mp3",coverPath: "cover_pic/c2.jpg",},
  {songName: "Srivali",filePath: "songs/song3.mp3",coverPath: "cover_pic/c3.jpg",},
  {songName: "Iktara",filePath: "songs/song4.mp3",coverPath: "cover_pic/c4.jpg",},
  {songName: "Daku",filePath: "songs/song5.mp3",coverPath: "cover_pic/c5.jpg",},
  {songName: "Shambu",filePath: "songs/song6.mp3",coverPath: "cover_pic/c6.jpg",},
  {songName: "Raatan Lambiyan",filePath: "songs/song7.mp3",coverPath: "cover_pic/c7.jpg",},
  {songName: "Mera Dil Ye Pukare",filePath: "songs/song8.mp3",coverPath: "cover_pic/c8.jpg",},
  {songName: "Tum Hi Ho",filePath: "songs/song9.mp3",coverPath: "cover_pic/c9.jpg",},
  {songName: "Jeetne Ke Liye",filePath: "songs/song10.mp3",coverPath: "cover_pic/c10.jpg",},
  {songName: "Chal Ghar Chalein",filePath: "songs/song11.mp3",coverPath: "cover_pic/c11.jpg",},
  {songName: "Humnava",filePath: "songs/song12.mp3",coverPath: "cover_pic/c12.jpg",},
  {songName: "No Love",filePath: "songs/song13.mp3",coverPath: "cover_pic/c13.jpg",},
  {songName: "Elevated",filePath: "songs/song14.mp3",coverPath: "cover_pic/c14.jpg",},
  {songName: "KGF Mashup",filePath: "songs/song15.mp3",coverPath: "cover_pic/c15.jpg",},
  {songName: "Banjaara",filePath: "songs/song16.mp3",coverPath: "cover_pic/c16.jpg",},
  {songName: "Beetein Lamhe",filePath: "songs/song17.mp3",coverPath: "cover_pic/c17.jpg",},
  {songName: "Parwah Nahi",filePath: "songs/song18.mp3",coverPath: "cover_pic/c18.jpg",},
  {songName: "Let Me Down Slowly",filePath: "songs/song19.mp3",coverPath: "cover_pic/c19.jpg",},
  {songName: "Mann Mera",filePath: "songs/song20.mp3",coverPath: "cover_pic/c20.jpg",},
];


// ----------------------------------------------------------------INITIAL LOOP FOR ASSIGNING VALUES------------------------------------------------
songItem.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByTagName("span")[0].innerText = songs[i].songName;
  var aud = new Audio();
  aud.src = songs[i].filePath;
  aud.addEventListener("loadedmetadata", function () {
    var duration = aud.duration;
    var minutes = Math.floor(duration / 60);
    var Rmin = Math.floor(duration % 60);
    if (Rmin < 10) Rmin = "0" + Rmin;
    element.getElementsByTagName("span")[1].firstElementChild.innerHTML = minutes + ":" + Rmin
  });
});


// ----------------------------------------------------------------MASTERPLAY BUTTON------------------------------------------------
masterPlay.addEventListener("click", () => {
  if (audioElements.paused || audioElements.currentTime <= 0) {
    masterSong.innerText = songs[songIndex - 1].songName;
    dur;
    audioElements.src = `songs/song${songIndex}.mp3`;
    audioElements.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    document.getElementById(songIndex).classList.remove("fa-circle-play");
    document.getElementById(songIndex).classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    audioElements.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    document.getElementById(songIndex).classList.remove("fa-circle-pause");
    document.getElementById(songIndex).classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});

// ---------------------------------------------------------------SEEKBAR TIME------------------------------------------------
audioElements.addEventListener("timeupdate", () => {
  progress = parseInt(
    (audioElements.currentTime / audioElements.duration) * 100
  );
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElements.currentTime =
    (myProgressBar.value * audioElements.duration) / 100;
});

// ----------------------------------------------------------------MAKE ALL PLAY BUTTON-----------------------------------------------
const makeAllPlay = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};

// ---------------------------------------------------------------SMALL PLAY BUTTON FUNCTIONING------------------------------------------------
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener("click", (e) => {
        songIndex = parseInt(e.target.id);
        if(document.getElementById(songIndex).classList.contains('fa-circle-pause')){
            e.target.classList.remove("fa-circle-pause");
            e.target.classList.add("fa-circle-play");
            audioElements.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");
            var ur = songs[songIndex - 1].coverPath;
            botbg.style.backgroundImage = `url(cover_pic/c${songIndex}.jpg)`; 
            prevIndex = songIndex;
        }
        else if(document.getElementById(songIndex).classList.contains('fa-circle-play')){
            if(audioElements.currentTime>0 && prevIndex == songIndex){
                audioElements.play();
                e.target.classList.remove("fa-circle-play");
                e.target.classList.add("fa-circle-pause");
                masterPlay.classList.remove("fa-circle-play");
                masterPlay.classList.add("fa-circle-pause");
                gif.style.opacity = 1;
                prevIndex = songIndex;
                dur;
            }
            else{
                masterSong.innerText = songs[songIndex - 1].songName;
                audioElements.src = `songs/song${songIndex}.mp3`;
                makeAllPlay();
                e.target.classList.remove("fa-circle-play");
                e.target.classList.add("fa-circle-pause");
                audioElements.play();
                gif.style.opacity = 1;
                masterPlay.classList.remove("fa-circle-play");
                masterPlay.classList.add("fa-circle-pause");
                var ur = songs[songIndex - 1].coverPath;
                botbg.style.backgroundImage = `url(cover_pic/c${songIndex}.jpg)`;
                prevIndex = songIndex; 
                dur;
            }
            
        }
    })
})
// Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
//     element.addEventListener("click", (e) => {
//         makeAllPlay();
//         songIndex = parseInt(e.target.id);
//         audioElements.src = `songs/song${songIndex}.mp3`;
    //   masterSong.innerText = songs[songIndex - 1].songName;
    //   e.target.classList.remove("fa-circle-play");
    //   e.target.classList.add("fa-circle-pause");
    //   audioElements.currentTime = 0;
    //   audioElements.play();
    //   gif.style.opacity = 1;
    //   masterPlay.classList.remove("fa-circle-play");
    //   masterPlay.classList.add("fa-circle-pause");
    //   var ur = songs[songIndex - 1].coverPath;
    //   botbg.style.backgroundImage = `url(cover_pic/c${songIndex}.jpg)`; 
    // }
//   }
// )});

// ----------------------------------------------------------------PREVIOUS BUTTON------------------------------------------------
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex < 2) {
    songIndex = 20;
  } else {
    songIndex = songIndex - 1;
  }
  makeAllPlay();
  gif.style.opacity = 1;
  masterSong.innerText = songs[songIndex - 1].songName;
  audioElements.src = `songs/song${songIndex}.mp3`;
  audioElements.currentTime = 0;
  audioElements.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  var ur = songs[songIndex - 1].coverPath;
  botbg.style.backgroundImage = `url(cover_pic/c${songIndex}.jpg)`;
  document.getElementById(songIndex).classList.remove("fa-circle-play");
  document.getElementById(songIndex).classList.add("fa-circle-pause");
  dur;
});

// ----------------------------------------------------------------FORWARD BUTTON------------------------------------------------
document.getElementById("forward").addEventListener("click", () => {
  if (songIndex > 19) {
    songIndex = 1;
  } else {
    songIndex = songIndex + 1;
  }
  makeAllPlay();
  gif.style.opacity = 1;
  masterSong.innerText = songs[songIndex - 1].songName;
  audioElements.src = `songs/song${songIndex}.mp3`;
  audioElements.currentTime = 0;
  audioElements.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  var ur = songs[songIndex - 1].coverPath;
  botbg.style.backgroundImage = `url(cover_pic/c${songIndex}.jpg)`;
  document.getElementById(songIndex).classList.remove("fa-circle-play");
  document.getElementById(songIndex).classList.add("fa-circle-pause");
  dur;
});

// ----------------------------------------------------------WHEN SONG ENDED----------------------------------
audioElements.addEventListener('ended',function(){
  songIndex = songIndex+1;
  gif.style.opacity = 1;
  masterSong.innerText = songs[songIndex - 1].songName;
  audioElements.src = `songs/song${songIndex}.mp3`;
  audioElements.currentTime = 0;
  audioElements.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  var ur = songs[songIndex - 1].coverPath;
  botbg.style.backgroundImage = `url(cover_pic/c${songIndex}.jpg)`;
  document.getElementById(songIndex-1).classList.remove("fa-circle-pause");
  document.getElementById(songIndex-1).classList.add("fa-circle-play");
  document.getElementById(songIndex).classList.remove("fa-circle-play");
  document.getElementById(songIndex).classList.add("fa-circle-pause");
  dur;
});

// -------------------------------------------------searching using search bar-------------------------
function search_music() {
  let input = document.getElementById("SearchMusic").value;
  console.log(input);
  input=input.toLowerCase();
  let x = document.getElementsByClassName('songItem');
    
  for (i = 0; i < x.length; i++) { 
      console.log(x[i].innerHTML);
      if (!x[i].innerHTML.toLowerCase().includes(input)) {
          x[i].style.display="none";
      }
      else {
          x[i].style.display="flex  ";                 
      }
  }
}

//----------------------------------------------------running time------------------------------------------
setInterval( () => {
  let min = Math.floor(audioElements.currentTime / 60);
  let sec = Math.floor(audioElements.currentTime % 60);
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;
  console.log(currTime.innerHTML);
  currTime.innerText=min+":"+sec;
},1000);

//--------------------------------------------------maxduration-----------------------------------------------
let dur=audioElements.addEventListener("loadedmetadata", () => {
  let min = Math.floor(audioElements.duration / 60);
  let sec = Math.floor(audioElements.duration % 60);
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;
  document.getElementById('durTime').innerText = min + ":" + sec;
});