import { useEffect, useState } from "react";

function UserMessage({ content }: { content: string | Blob }) {
  const [audioURL, setAudioURL] = useState<string | null>(null);

  useEffect(() => {
    if (content instanceof Blob) {
      const url = URL.createObjectURL(content);
      setAudioURL(url);

      // Cleanup the URL when the component unmounts
      return () => URL.revokeObjectURL(url);
    }
  }, [content]);

  return (
    <div className="message-container">
      <div className="user-message">
        {typeof content === "string" ? (
          content
        ) : (
          <audio controls>
            <source src={audioURL || ""} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
}

export default UserMessage;
