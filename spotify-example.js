// TJ bot example that uses listen to execute different actions. 
// This example also uses spotify's API to play a music preview for a given artist.
// Since spotify requires a token, we need to generate one first. You will need a spotify account for this. 
// Access this link: https://developer.spotify.com/console/get-artist/
// Click on "GET TOKEN" and in the POP-UP, select "user-top-read" and click "REQUEST TOKEN". 
// Spotify will now request for you to login.
// Copy the generated token and copy it in the "token" variable bellow.
// example:
// var token = "BQBJnLEjVzrXTE88upMWK2vRZvEFTgJqqvxHbeEUczu3tJnso2ghBxuvTa_RIG8ibV5iLNdm7K-8iWn1KKtJoR3bqS2hNEdP66C6Qjq0TEFrVM_u-MJ7mGyI4AQiKDZouwcW26NMAS0nNMf1swbnbG9ULJPe";

var token = "";
var tjName = "Johnny";

var tj = new TJBot(["servo", "led", "speaker", "microphone"], {
    robot: { gender: "male" },
    speak: { language: "en-US" }
},
    {
        text_to_speech: {
            apikey: process.env.TEXT_TO_SPEECH_API_KEY
        },
        speech_to_text: {
            apikey: process.env.SPEECH_TO_TEXT_API_KEY
        },
        assistant: {
            apikey: process.env.ASSISTANT_API_KEY
        }
    });

tj.listen(function (msg) {

    // check to see if they are talking to TJBot
    if (msg.startsWith(tjName)) {

        // remove our name from the message
        var turn = msg.toLowerCase().replace(tjName.toLowerCase(), "");

        if (turn.trim().startsWith("change light to")) {
            var color = turn.toLowerCase().replace("change light to", "").replace(".", "");
            tj.shine(color.trim())

        } else if (turn.trim().startsWith("put your arm up")) {
            tj.raiseArm();

        } else if (turn.trim().startsWith("put your arm down")) {
            tj.lowerArm();

        } else if (turn.trim().startsWith("move your arm")) {
            tj.wave();

        } else if (turn.trim().startsWith("play")) {
            var toSearch = turn.toLowerCase().replace("play", "").replace(".", "");
            spotifyPlay(toSearch);

        } else if (turn.trim().startsWith("stop")) {
            tj.stopListening();

        } else {
            // send to the conversation service
            tj.converse(process.env.ASSISTANT_WORKSPACE_ID, turn, function (response) {
                console.log(response)
                // speak the result
                tj.speak(response.description);
            });
        }
    }
});

// spotifyPlay receives an artist name as a search term and plays the preview of the song with the highest popularity.
function spotifyPlay(searchTerm) {

    if (token === "") {
        console.log("No spotify token was found!")
        return
    }

    $.ajax({
        url: "https://api.spotify.com/v1/search",
        data: {
            q: searchTerm,
            type: "track",
            market: "us",
            limit: 10
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token)
        },
    })
        .done(function (data) {
            $.each(data, function (key, value) {
                var popularity = 0;
                var preview_url = "";

                // get the preview with the highest popularity
                for (var i = 0; i < data.tracks.items.length; i++) {
                    if (data.tracks.items[i].preview_url != null) {
                        preview_url = data.tracks.items[i].popularity > popularity ? data.tracks.items[i].preview_url : preview_url;
                        popularity = data.tracks.items[i].popularity > popularity ? data.tracks.items[i].popularity : popularity;
                    }
                }

                var audio = new Audio(preview_url);
                audio.type = 'audio/wav';
                var playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.then(function () {
                        console.log('Playing....');
                    }).catch(function (error) {
                        console.log('Failed to play....' + error);
                    });
                }
            })
        })
        .fail(function (jqXHR, textStatus) {
            console.log("Error searching in spotify");
        })
}
