let button = document.querySelector(".btn");
let output = document.querySelector(".output");

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

console.log("SpeechRecognition supported:", !!SpeechRecognition);

if (SpeechRecognition) {
    let recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
        console.log("SpeechRecognition started ✅");
    };

    recognition.onresult = (event) => {
        let transcript = event.results[0][0].transcript;
        output.textContent = `You said: ${transcript}`;
        console.log("Recognized:", transcript);
    };

    recognition.onerror = (event) => {
        output.textContent = "Error: " + event.error;
        console.error("SpeechRecognition error:", event.error);
    };

    button.addEventListener("click", async () => {
        console.log("Button clicked 🚀");
        try {
            console.log("Requesting microphone permission...");
            await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log("Microphone permission granted ✅");

            output.textContent = "Listening... 🎤";
            console.log("Starting SpeechRecognition...");
            recognition.start();

        } catch (err) {
            output.textContent = "Mic permission denied or error: " + err.message;
            console.error("Mic request error:", err);
        }
    });

} else {
    output.textContent = "Your browser doesn't support Speech Recognition 😢";
    console.error("SpeechRecognition API not supported.");
}
