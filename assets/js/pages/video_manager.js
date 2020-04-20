// Attribute where all the video related information will be saved as a JSON Object
let videos, current_video_index = 0, playlist_ended=false;

// Read video information json
get_videos_information();

// This function creates an <iframe> (and YouTube player)
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
            controls: 1,
            modestbranding: 0,
            rel: 0,
            showinfo: 0,
            fullscreen: 1,
            frameborder: 0,
            enablejsapi: 1,
            wmode: 'transparent'
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
    console.log("[!] Player loaded correctly. Checking video informations..");
    // Check if videos array is empty
    if(!isArrayEmpty(videos)){
        // Array contains informations

        console.log("Playing video with index " + current_video_index);

        // Get video id
        let video_id = videos[current_video_index]["link"];

        // Load video
        player.loadVideoById(video_id);

        // Set max volume
        player.setVolume(100);

        // Play video
        player.playVideo();
    }
    else{
        // Array doesn't have any video information

        // Load data and refresh
        get_videos_information();

        // Check if data has been loaded correctly, otherwise show error on page
        if(isArrayEmpty(videos)){
            // Cannot reload data, wait 1 minute and retry

            console.warn("ERROR WHILE RELOADING VIDEOS. PROBABLY AN API ERROR");

            // Hide iframe
            $("#player").addClass("d-none");
        }
        else{
            // Reload event
            onPlayerReady(event);
        }
    }
}

// The API calls this function when the player's state changes.
function onPlayerStateChange(event) {
    // Check when the video it's finished
    if (event.data == YT.PlayerState.ENDED) {
        console.log("[!] Video ended");

        // Increment video index
        current_video_index++;

        console.log("Incremented playlist index. Current index: " + current_video_index);

        // Check if the playlist has ended
        if(isPlaylistEnded(videos, current_video_index)){
            // Log warning
            console.warn("Playlist has ended. Reloading videos...");

            // Reload videos
            get_videos_information();

            // TODO: CHECK IF IT HAS REALLY FILLED THE VIDEO ARRAY AND THEN REPLAY

            // Check if data has been loaded correctly, otherwise show error on page
            if(isArrayEmpty(videos)){
                // Cannot reload data, wait 1 minute and retry

                console.warn("ERROR WHILE RELOADING VIDEOS. PROBABLY AN API ERROR");

                // Hide iframe
                $("#player").addClass("d-none");
            }
            else{
                // Reset playlist index
                current_video_index = 0;

                // Reload event
                onPlayerReady(event);
            }
        }
        else{
            // Force to reload video
            onPlayerReady(event);
        }
    }
}


function isArrayEmpty(data){
    return data == null || data == undefined || Object.keys(data).length == 0
}

function isPlaylistEnded(data, video_index){
    return video_index >= data.length;
}
