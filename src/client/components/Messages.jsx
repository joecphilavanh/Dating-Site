import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSocket} from "../context/socketContext";

const Messages = () => {
    const { selectedUserId } = useParams();
    const { userId } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const socket = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on('newMessage', (receivedMessage) => {
                setMessages(messages => [...messages, receivedMessage]);
            });
        }

        return () => {
            if (socket) {
                socket.off('newMessage');
            }
        };
    }, [socket]);

    useEffect(() => {
        fetchMessages();
    }, [userId, selectedUserId]);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`/api/message/history/${userId}/${selectedUserId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const response = await fetch('/api/message/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sender_id: userId,
                    receiver_id: selectedUserId,
                    content: newMessage,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const sentMessage = await response.json();
            setMessages([...messages, sentMessage]);
            setNewMessage('');
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto my-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Message History</h1>
            <div className="space-y-2">
                {messages.map(message => (
                    <div
                        key={message.message_id}
                        className={`p-3 rounded-lg max-w-xs ${
                            message.sender_id === userId ? 'ml-auto' : 'mr-auto'
                        }`}
                    >
                        <p className={`${
                            message.sender_id === userId ? 'text-indigo-600 font-bold' : 'text-green-600'
                        }`}>
                            {message.content}
                        </p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="mt-6">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
                />
                <button type="submit" className="mt-2 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300">
                    Send
                </button>
            </form>
        </div>
    );
};

export default Messages;


