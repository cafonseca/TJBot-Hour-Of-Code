var spkr = new TJBot(["speaker"], {
    robot: {
      gender: "female"
    },
    speak: {
      language: "fr-FR"
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

var tr = new TJBot([], {}, {
  language_translator: {
    apikey: process.env.LANGUAGE_TRANSLATOR_API_KEY
  }
});


mic.listen((text) => {
  console.log(text);
  tr.translate(text, "en", "fr")
	  .then((response) => spkr.speak(response.translations[0].translation));
  mic.stopListening();
});
