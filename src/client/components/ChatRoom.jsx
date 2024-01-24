// import { createClient } from "@supabase/supabase-js";
// import { useState, useEffect } from "react";
// import Chat from "./Chat.jsx";
//
// const supabase = createClient(
//   import.meta.env.VITE_DATABASE_URL,
//   import.meta.env.VITE_DATABASE_KEY
// );
//
// const ChatRoom = () => {
//   const [content, setContent] = useState("");
//   const [messages, setMessages] = useState([]);
//   const senderId = 1;
//   const receiverId = 2;
//
//   const fetchMsgs = async () => {
//     try {
//       const { data, error } = await supabase.from("Messages").select();
//       if (error) {
//         console.log("fetchMsgs error:", error);
//       } else {
//         setMessages(data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//
//   useState(() => {
//     fetchMsgs();
//
//     supabase
//       .channel("message-changes")
//       .on(
//         "postgres_changes",
//         { event: "INSERT", schema: "public", table: "Messages" },
//         (payload) => {
//           fetchMsgs();
//         }
//       )
//       .subscribe();
//   }, []);
//
//   const addMsg = async (e) => {
//     e.preventDefault();
//     try {
//       const { error } = await supabase.from("Messages").insert({
//         sender_id: senderId,
//         receiver_id: receiverId,
//         content: content,
//       });
//
//       if (error) {
//         console.log("handleSendMessage Error:", error);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     setContent("");
//   };
//
//   return (
//       <section id="chat-room" className="text-center">
//         <h1 className="text-2xl font-bold">Chat Room Feature</h1>
//         <Chat messages={messages} className="h-[500px] p-2 border border-gray-400 text-lg overflow-y-scroll" />
//         <form onSubmit={addMsg} className="my-4">
//           <label className="block">
//             Message:
//             <input
//                 type="text"
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 className="w-full p-2 mt-1 border border-gray-300 rounded-md"
//             />
//           </label>
//           <button type="submit" className="bg-blue-500 text-white p-2 rounded-md mt-2 hover:bg-blue-600">
//             Send
//           </button>
//         </form>
//       </section>
//   );
// };
//
// export default ChatRoom;