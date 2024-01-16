import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import Chat from "./Chat.jsx";
import "../styles/ChatRoom.css";

const supabase = createClient(
  import.meta.env.VITE_DATABASE_URL,
  import.meta.env.VITE_DATABASE_KEY
);

const ChatRoom = () => {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const senderId = 1;
  const receiverId = 2;

  const fetchMsgs = async () => {
    try {
      const { data, error } = await supabase.from("Messages").select();
      if (error) {
        console.log("fetchMsgs error:", error);
      } else {
        setMessages(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useState(() => {
    fetchMsgs();

    supabase
      .channel("message-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "Messages" },
        (payload) => {
          fetchMsgs();
        }
      )
      .subscribe();
  }, []);

  const addMsg = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("Messages").insert({
        sender_id: senderId,
        receiver_id: receiverId,
        content: content,
      });

      if (error) {
        console.log("handleSendMessage Error:", error);
      }
    } catch (error) {
      console.log(error);
    }
    setContent("");
  };

  return (
    <section id="chat-room">
      <h1>Chat Room Feature</h1>
      <Chat messages={messages} />
      <form onSubmit={addMsg}>
        <label>
          Message:
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </section>
  );
};

export default ChatRoom;
