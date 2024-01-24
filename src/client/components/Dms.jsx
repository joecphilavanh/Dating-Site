import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Dms = () => {
    const [messages, setMessages] = useState([]);
    const { userId } = useAuth();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`/api/message/inbox/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    alert('Failed to fetch messages');
                }

                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages', error);
            }
        };

        fetchMessages();
    }, [userId]);

    return (
        <div className="inbox-container">
            <ul className="message-list">
                {messages.map((message) => (
                    <li key={message.message_id} className="message-item">
                        <span className="sender-name">{message.senderName}</span>
                        <span className="message-content">{message.content}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dms;
