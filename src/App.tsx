import { useEffect, useState } from "react";
import MicButton from "./components/MicButton";
import Title from "./components/Title";
import StateMessage from "./components/StateMessage";
import Transcript from "./components/Transcript";
import CopyButton from "./components/CopyButton";

function App() {
  const [recordingState, setRecordingState] = useState(false);
  const [transcript, setTranscript] = useState("Transcript will appear here");
  const [tooltip, setTooltip] = useState("Click to copy text");

  const copyToClipBoard = async (transcript: string) => {
    navigator.clipboard.writeText(transcript);
    setTooltip("Copied to clipboard!");
    // To reset
    setTimeout(() => setTooltip("Click to copy text"), 1000);
  };

  useEffect(() => {
    // Check for browser support of Web Speech API
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Web Speech API not supported in this browser");
    }

    // Set new object for SpeechRecognition, make it english
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    // Start or stop recording based on recordingState (mic button)
    if (recordingState) {
      recognition.start();
      setTranscript("");
    } else {
      recognition.stop();
    }

    recognition.onresult = (event: any) => {
      let currentTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);
    };

    return () => {
      recognition.stop(); // Cleanup
    };
  }, [recordingState]); // Runs every time recordingState changes

  return (
    <>
      <Title title="Transcription App" />
      <MicButton
        onClick={() => setRecordingState((prev) => !prev)}
        recordingState={recordingState}
      />
      <StateMessage
        state={recordingState ? "Recording..." : "Ready to record"}
      />
      <Transcript transcript={transcript} />
      <CopyButton
        onClick={() => copyToClipBoard(transcript)}
        tooltip={tooltip}
      />
    </>
  );
}

export default App;
