import React, { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your RoomNook AI assistant. How can I help you find the perfect PG, roommate, or mess service today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // No need to load external API script anymore

  // Auto scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const getContextualResponse = (userInput) => {
    const input = userInput.toLowerCase()
    
    // PG related queries
    if (input.includes('pg') || input.includes('paying guest') || input.includes('accommodation')) {
      if (input.includes('price') || input.includes('cost') || input.includes('budget')) {
        return "PG prices in Dehradun typically range from ₹3,000 to ₹15,000 per month depending on location, room type, and facilities. Single rooms cost more (₹6,000-₹15,000) while shared rooms are more affordable (₹3,000-₹8,000)."
      }
      if (input.includes('location') || input.includes('area') || input.includes('where')) {
        return "Popular PG areas in Dehradun include Clement Town, Rajpur Road, Dharampur, and Sahastradhara. These areas offer good connectivity to universities and tech parks with various amenities."
      }
      if (input.includes('facility') || input.includes('amenity') || input.includes('wifi') || input.includes('ac')) {
        return "Most PGs offer WiFi, RO water, food services, and security. Premium PGs also provide AC rooms, parking, laundry, and gym facilities. You can filter PGs by specific amenities on our listings page."
      }
      return "I can help you find the perfect PG! You can search by location, budget, room type, and facilities. Would you like to know about specific areas, prices, or amenities?"
    }
    
    // Roommate related queries
    if (input.includes('roommate') || input.includes('flatmate') || input.includes('sharing')) {
      if (input.includes('find') || input.includes('search') || input.includes('looking')) {
        return "You can find compatible roommates on our platform! We match based on lifestyle, preferences, and compatibility. Visit the roommate listings page to see profiles and connect with potential roommates."
      }
      if (input.includes('compatible') || input.includes('match') || input.includes('suitable')) {
        return "Our roommate matching considers factors like lifestyle, cleanliness preferences, noise tolerance, and daily routines. We help you find roommates who share similar values and living habits."
      }
      return "Looking for a roommate? I can help you find compatible roommates based on your preferences. You can filter by location, age, occupation, and lifestyle preferences."
    }
    
    // Mess related queries
    if (input.includes('mess') || input.includes('food') || input.includes('meal')) {
      if (input.includes('price') || input.includes('cost')) {
        return "Mess services in Dehradun typically cost ₹2,000-₹4,000 per month. Prices vary based on food type (veg/non-veg), meal frequency, and quality. Some messes offer flexible plans."
      }
      if (input.includes('vegetarian') || input.includes('veg') || input.includes('non-veg')) {
        return "You can find both vegetarian and non-vegetarian mess services. Many messes offer both options or specialize in one type. You can filter mess listings by food type preference."
      }
      return "I can help you find the perfect mess service! You can search by location, food type, price range, and meal timings. Most messes offer breakfast, lunch, and dinner with good quality food."
    }
    
    // General help
    if (input.includes('help') || input.includes('how') || input.includes('what')) {
      return "I'm your RoomNook AI assistant! I can help you with:\n• Finding PGs by location, price, and facilities\n• Connecting with compatible roommates\n• Discovering mess services\n• Understanding our Perfect Match Score™\n\nWhat would you like to know?"
    }
    
    // Greetings
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! Welcome to RoomNook AI. I'm here to help you find the perfect accommodation, roommates, and mess services. How can I assist you today?"
    }
    
    // Default response
    return "I'm here to help you with PG accommodations, roommate matching, and mess services. You can ask me about locations, prices, facilities, or how to find the perfect match. What specific information do you need?"
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = inputMessage
    setInputMessage('')
    setIsLoading(true)

    try {
      // Use backend API with Hugging Face integration
      const response = await fetch('http://localhost:5000/api/ai/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: currentInput
        })
      })

      if (response.ok) {
        const data = await response.json()
        
        const botMessage = {
          id: Date.now() + 1,
          text: data.message,
          sender: 'bot',
          timestamp: new Date()
        }

        setMessages(prev => [...prev, botMessage])
      } else {
        throw new Error('API request failed')
      }
    } catch (error) {
      console.error('Chat API error:', error)
      // Fallback to contextual responses
      const fallbackMessage = {
        id: Date.now() + 1,
        text: getContextualResponse(currentInput),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, fallbackMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center">
          <Bot className="h-5 w-5 mr-2" />
          <div>
            <h3 className="font-semibold">RoomNook AI Assistant</h3>
            <p className="text-xs text-blue-100">Online</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-gray-200 transition-colors"
          aria-label="Close chat"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-start">
                {message.sender === 'bot' && (
                  <Bot className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                )}
                {message.sender === 'user' && (
                  <User className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 p-3 rounded-lg max-w-[80%]">
              <div className="flex items-center">
                <Bot className="h-4 w-4 mr-2" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about PGs, roommates, or mess services..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatBot
