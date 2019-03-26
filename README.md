# TJBot - Hour Of Code
An hour of code using the [TJBot Node.js Simulator](https://github.com/jeancarl/tjbot-simulator)

A [TJBot](https://ibmtjbot.github.io) is an open source project designed to help you access IBM Watson Services.

[Javascript Introduction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)

[Node.js Introduction](https://www.w3schools.com/nodejs/nodejs_intro.asp)

To use the TJBot IBM Watson services, you will need to sign up for an [IBM Cloud account](https://console.bluemix.net).

You will need to provision the lite (free) versions of the following services:
* Speech to Text
* Text to Speech
* Watson Assistant
* Language Translator

Run the [simulator](https://my-tjbot.mybluemix.net)

Click on the env tab and add the following environment variables with the values from the serivces created above.

```javascript
TEXT_TO_SPEECH_API_KEY=
SPEECH_TO_TEXT_API_KEY=
ASSISTANT_API_KEY=
ASSISTANT_WORKSPACE_ID=
LANGUAGE_TRANSLATOR_API_KEY=
```

Copy the source code from one of the javascript examples files in this repository to the app.js tab in the simulator tab and then click on the run icon.
