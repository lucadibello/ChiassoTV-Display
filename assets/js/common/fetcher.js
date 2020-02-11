// Fetcher script

// Global attributes
var json_config_path = "/config.json"; // Path to config file
var config; // Object where the config file JSON will be saved


// Initial functions calls
get_json_settings(); // load config

// Read information from ChiassoTV APIs
function get_videos_information(){
    $.ajax({
        dataType: 'json',
        url: config.api_url,
        method: "post",
        async: false,
        data: {
            token: config.api_token
        },
        success: function (data) {
            console.log("Fetched video information");
            videos = data;

            // Log video data in terminal
            console.log(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.error("Cannot fetch video information from " + config.api_url);
            console.log(xhr);
        }
    });
}



// Load config script
function get_json_settings() {
    $.ajax({
        dataType: 'json',
        url: json_config_path,
        async: false,
        success: function (json) {
            console.log("[Config] Config file read");
            config = json;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}