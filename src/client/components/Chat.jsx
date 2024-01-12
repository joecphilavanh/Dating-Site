import { useEffect, useRef } from "react";

const Chat = ({ messages }) => {
  const bottomScroll = useRef(null);

  useEffect(() => {
    bottomScroll.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <section id="chat">
      {messages.map((message) => {
        return (
          <section key={message.message_id}>{<p>{message.content}</p>}</section>
        );
      })}
      <div ref={bottomScroll}></div>
    </section>
  );
};

export default Chat;
