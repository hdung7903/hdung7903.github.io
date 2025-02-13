import React, { useEffect, useRef } from "react";

export default function Messages({ messages }: { messages: React.ReactNode }) {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (el.current) {
      el.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  });
  return (
    <div className="messages">
      {messages}
      <div id={"el"} ref={el} />
    </div>
  );
}
