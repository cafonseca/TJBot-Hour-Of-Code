var name = "Johnny";

var tj = new TJBot([], {
  robot: {
    gender: "male"
  }
},
{
  assistant: {
    apikey: process.env.ASSISTANT_API_KEY
  }
});

var led = new TJBot(["led"], {}, {});
led.shine(led.randomColor());

var spkr = new TJBot(["speaker"], {
    robot: {
      gender: "male"
    },
    speak: {
      language: "en-US"
    }
  },
  {
  text_to_speech: {
    apikey: process.env.TEXT_TO_SPEECH_API_KEY
  }
});

var mic = new TJBot(["microphone"], {}, {
  speech_to_text: {
    apikey: process.env.SPEECH_TO_TEXT_API_KEY
  }
});

mic.listen((text) => {
  console.log(text);
  if (text.startsWith(name)) {
    led.shine(led.randomColor());
   
    var msg = text.toLowerCase().replace(name.toLowerCase(), "");
    if (msg.trim().startsWith("turn off")) {
        mic.stopListening();
  	}
    
    tj.converse(process.env.ASSISTANT_WORKSPACE_ID, msg, response => {
  		console.log(response.description);
      	spkr.speak(response.description);
	});
  }
});

