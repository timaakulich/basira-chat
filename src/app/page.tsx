"use client"
import {useState} from "react";
import BackendService from "@/api/backend";


interface Message {
    id: number
    text: string
    type: string
}

const MIN_MESSAGE_FOR_SUGGESTIONS = 5

export default function Home() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [messagesCount, setMessagesCount] = useState(0)

    const backendClient = new BackendService();

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;
        messages.push({id: Math.random() * 100000, text: inputValue, type: 'human'})
        setMessagesCount(prevState => prevState + 1)
        setMessages(messages);
        try {
            const response = await backendClient.createMessage(inputValue)
            // @ts-ignore
            const responseJson = JSON.stringify(response.data)
            setMessages([...messages, {id: new Date().getTime(), text: responseJson, type: 'ai'}]);
        } catch (e) {
            setMessages([...messages, {
                id: new Date().getTime(),
                text: "Can not get response from backend",
                type: 'ai'
            }]);
        }
        setInputValue('');
    };

    const handleGetRecommendations = async () => {
        try {
            const response = await backendClient.createSuggestions()
            // @ts-ignore
            const responseJson = JSON.stringify(response.data)
        } catch (e) {
            setMessages([...messages, {
                id: new Date().getTime(),
                text: "Can not get recommendations from backend",
                type: 'ai'
            }]);
        }
    }

    return <div className="App">
        <div className="chat-container">
            {messages.map((message) => (
                <div key={message.id} className={`message message-${message.type}`}>
                    {message.text}
                </div>
            ))}
            {messagesCount >= MIN_MESSAGE_FOR_SUGGESTIONS ? <button className="recommendation-button" onClick={handleGetRecommendations}>Get my recommendations</button> : <></>}
            <div className="input-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyUp={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    </div>;
}
