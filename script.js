let button = document.querySelector(".btn");
let output = document.querySelector(".output");

// optional debug div for phone testing
let debug = document.createElement("div");
document.body.appendChild(debug);

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

console.log("SpeechRecognition supported:", !!SpeechRecognition);

if (SpeechRecognition) {
    let recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    let isRecognizing = false;

    recognition.onstart = () => {
        isRecognizing = true;
        console.log("SpeechRecognition started ✅");
        debug.textContent = "DEBUG: Listening...";
    };

    recognition.onresult = (event) => {
        let transcript = event.results[0][0].transcript;
        output.textContent = `You said: ${transcript}`;
        console.log("Recognized:", transcript);
        debug.textContent = `DEBUG: recognized "${transcript}"`;
    };

    recognition.onerror = (event) => {
        output.textContent = "Error: " + event.error;
        console.error("SpeechRecognition error:", event.error);
        debug.textContent = `DEBUG: error "${event.error}"`;
        isRecognizing = false;
    };

    recognition.onend = () => {
        console.log("Recognition ended ✅");
        isRecognizing = false;
        debug.textContent = "DEBUG: Recognition ended";
    };

    button.addEventListener("click", async () => {
        if (isRecognizing) {
            output.textContent = "Already listening... 🎤";
            return;
        }

        try {
            console.log("Requesting microphone permission...");
            await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log("Microphone permission granted ✅");

            output.textContent = "Listening... 🎤";
            recognition.start();

        } catch (err) {
            output.textContent = "Mic permission denied or error: " + err.message;
            console.error("Mic request error:", err);
            debug.textContent = `DEBUG: mic error "${err.message}"`;
        }
    });

} else {
    output.textContent = "Your browser doesn't support Speech Recognition 😢";
    console.error("SpeechRecognition API not supported.");
    debug.textContent = "DEBUG: API not supported";
}
