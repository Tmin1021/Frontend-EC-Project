import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, X } from 'lucide-react';

function Chatbot() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    // Currently set the time limit for sending the request
    const now = Date.now();
    const minInterval = 0;
    if (now - lastSubmitTime < minInterval) {
      setChatHistory((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Please wait ${Math.ceil((minInterval - (now - lastSubmitTime)) / 1000)} seconds.`,
        },
      ]);
      return;
    }

    setLoading(true);
    const userMessage = { role: 'user', content: message };
    setChatHistory((prev) => [...prev, userMessage]); // concate the chat history

    try {
      const res = await axios.post('http://127.0.0.1:5000/api/chat', { message }, { timeout: 0 });
      const aiResponse = { role: 'assistant', content: res.data.response };
      setChatHistory((prev) => [...prev, aiResponse]);
      setLastSubmitTime(now);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            error.response && error.response.status === 429
              ? 'Too many requests. Please try again later.'
              : 'Error communicating with the server.',
        },
      ]);
    }

    setMessage('');
    setLoading(false);
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chatbot Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-50 w-[90%] sm:w-[400px] h-[500px] bg-white shadow-xl border rounded-lg flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-3 border-b bg-blue-600 text-white rounded-t-lg">
            <h2 className="text-lg font-semibold">Chatbot</h2>
            <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
          </div>

          {/* Chat History */}
          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 bg-gray-100">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-md text-sm max-w-[75%] ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white ml-auto text-right'
                    : 'bg-gray-300 text-gray-800 mr-auto text-left'
                }`}
                dangerouslySetInnerHTML={{
                  __html: msg.content
                    .replace(/\n/g, '<br />')
                    .replace(/<br \/>([ \t]+)/g, (match, spaces) => {
                      return '<br />' + '&nbsp;'.repeat(spaces.length);
                    }),
                }}
              >
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t bg-white">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="2"
              className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-2 py-2 rounded-md text-white font-semibold ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 transition-colors'
              }`}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Chatbot;