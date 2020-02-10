// Attribute where all the video related information will be saved as a JSON Object
let videos, current_video_index = 0;

// Read video information json
get_videos_information();

// This function creates an <iframe> (and YouTube player)
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'lTTajzrSkCw',
        playerVars: {
            autoplay: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            fullscreen: 1,
            frameborder: 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
    // Set volume to max
    event.target.setVolume(100);

    // Play the video
    event.target.playVideo();

    player.fullscreen();
}

// The API calls this function when the player's state changes.
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        console.log("Video ended");
    }
}