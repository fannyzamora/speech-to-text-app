import { useEffect, useState } from "react";
import MicButton from "./components/MicButton";
import Title from "./components/Title";
import StateMessage from "./components/StateMessage";
import Transcript from "./components/Transcript";
import CopyButton from "./components/CopyButton";
// import SaveButton from "./components/SaveButton";

function App() {
  const [recordingState, setRecordingState] = useState(false);
  const [transcript, setTranscript] = useState("Transcript will appear here");
  const [tooltipCopy, setTooltipCopy] = useState("Click to copy text");
  const [tooltipSave, setTooltipSave] = useState("Click to save text");
  // const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
  //   "idle"
  // );

  const copyToClipBoard = async (transcript: string) => {
    navigator.clipboard.writeText(transcript);
    setTooltipCopy("Copied to clipboard!");
    // To reset
    setTimeout(() => setTooltipCopy("Click to copy text"), 1000);
  };

  const saveTranscript = async (text: string) => {
    const result = await fetch("http://127.0.0.1:8000/transcripts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text }),
    });

    if (result.ok) {
      // setSaveStatus("success");
      setTooltipSave("Saved!");
    } else {
      // setSaveStatus("error");
      setTooltipSave("Failed to save...");
    }

    //setTimeout(() => setSaveStatus("idle"), 1000);
    setTimeout(() => setTooltipSave("Click to save text"), 1000);
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
    recognition.lang = "fr";

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
      <div className="buttons">
        <CopyButton
          onClick={() => copyToClipBoard(transcript)}
          tooltip={tooltipCopy}
          name="Copy Transcript"
        />
        <CopyButton
          onClick={() => saveTranscript(transcript)}
          tooltip={tooltipSave}
          name="Save Transcript"
        />
        {/* <SaveButton onClick={() => saveTranscript(transcript)} />
        {saveStatus === "success" && (
          <div className="feedback success">Saved!</div>
        )}
        {saveStatus === "error" && (
          <div className="feedback error">Failed to save...</div>
        )} */}
      </div>
    </>
  );
}

export default App;
