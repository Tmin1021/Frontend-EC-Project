import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { BotMessageSquare, MessageSquare, X } from 'lucide-react';

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
      <div  onClick={() => setIsOpen(!isOpen)}
            className="fixed bottom-6 right-6 p-4 bg-white/60 backdrop-blur-sm shadow-gray-300 shadow-md rounded-full text-pink-700 hover:text-pink-500 hover:shadow-lg transition-all z-50">
        <BotMessageSquare className='w-8 h-8' />
      </div>

      {/* Chatbot Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-50 w-[90%] sm:w-[400px] h-[500px] shadow-gray-300 shadow-md border-1 border-gray-100 rounded-lg flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-3 text-gray-700 bg-white/80 backdrop-blur-sm">
            <h2 className="text-xl font-semibold">Chatbot of Hoa</h2>
            <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
          </div>

          {/* Chat History */}
          <div ref={chatRef} className="bg-white/10 backdrop-blur-lg flex-1 overflow-y-auto p-4 ">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-md text-sm max-w-[75%] ${
                  msg.role === 'user'
                    ? 'bg-blue-200 shadow-gray-100 shadow-lg text-shadow-gray-800 ml-auto text-right'
                    : 'bg-pink-200 shadow-gray-100 shadow-lg text-gray-800 mr-auto text-left'
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
          <form onSubmit={handleSubmit} className="p-3 bg-white/20 backdrop-blur-sm">
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
                  : 'bg-blue-500/60 hover:bg-blue-700/60 backdrop-blur-lg transition-colors'
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