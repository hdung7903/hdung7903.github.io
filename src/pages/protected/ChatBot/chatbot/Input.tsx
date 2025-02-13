import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faPaperPlane, faFile } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useRef } from "react";
import "./input.css";

export default function Input({
  onSend,
}: {
  onSend: (text: string | Blob) => void;
}) {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null); // Ref for storing the media stream

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim() !== "") {
      onSend(text);
      setText("");
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream; // Store the media stream for later use
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        console.log("Audio Blob:", audioBlob);

        // Send the recorded audio Blob to the parent
        onSend(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone: ", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }

    // Stop the media stream (to fully release the microphone)
    if (mediaStreamRef.current) {
      const tracks = mediaStreamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  };

  return (
    <div className="input">
      <form className="form-input-container" onSubmit={handleSend}>
     
        <input
          type="text"
          onChange={handleInputChange}
          style={{ width: "50%" }}
          value={isRecording ? "Đang ghi âm..." : text}
          placeholder="Enter your message here"
        />
        <div className="submit-icon">
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
          >
            <FontAwesomeIcon
              icon={faMicrophone}
              color={isRecording ? "red" : "black"}
            />
          </button> 
          <button
            type="button" 
          >
            <FontAwesomeIcon
              icon={faFile} color="black"
            />
          <input type="file" onChange={handleInputChange} hidden />

          </button>
          <button type="submit">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 500 500"
            >
              <g>
                <g>
                  <polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75" />
                </g>
              </g>
            </svg>
          </button>
        </div>
      </form>

      {/* Audio playback for verification */}
      <audio ref={audioRef} controls hidden></audio>
    </div>
  );
}
