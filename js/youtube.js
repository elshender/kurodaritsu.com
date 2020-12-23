var player;

var vidArray = [{videoId: '2b5QNj-BVhs'}, {videoId: '9ge5PzHSS0Y'}, {videoId: 'OWsCt7B-KWs'}];
var playerSettings = {autoplay: 1, autohide: 1, modestbranding: 1, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3, mute: 1};

var randomVid = Math.floor(Math.random() * vidArray.length);
var currentVid = randomVid;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
  videoId: vidArray[currentVid]["videoId"],
  events: {
   'onReady': onPlayerReady,
   'onStateChange': onPlayerStateChange
          }, playerVars: playerSettings
        });
      }

function onPlayerReady(event) {
  event.target.loadVideoById();
 }

function onPlayerStateChange(event) {
  
    if (event.data === YT.PlayerState.ENDED && currentVid !== vidArray.length -1 && !done){
      currentVid++;
      loadVid();
    } else if (event.data === YT.PlayerState.ENDED && currentVid     === vidArray.length -1 && !done){
      console.log("change")
      currentVid = 0;
      loadVid();
    }
  }

function loadVid(){
  player.loadVideoById(vidArray[currentVid]);
 
}