import React, { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, Send, Bot, User, Zap, Star } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import api from '../api/axios'
import toast from 'react-hot-toast'

const ChatAssistant = () => {
  const { user } = useSelector((state) => state.auth)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your RoomNook AI assistant. I can help you find the perfect PG, compatible roommates, and mess services using our Perfect Match Score™ system. What are you looking for?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await api.post('/ai/assistant', { query: inputMessage })
      const { message, recommendations } = response.data

      const botMessage = {
        id: Date.now() + 1,
        text: message,
        sender: 'bot',
        timestamp: new Date(),
        recommendations: recommendations || []
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('AI chat error:', error)
      toast.error('Failed to get AI response')
      
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble processing your request right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const exampleQueries = [
    "Find me a PG under ₹6000 near Clement Town",
    "Show me compatible roommates for a night owl student",
    "What are the best vegetarian mess options?",
    "Find PGs with WiFi and AC under ₹8000"
  ]

  return (
    <div className="relative min-h-screen pb-24">
      <div className="absolute inset-0 bg-hero-radiance opacity-30 blur-3xl"></div>
      <div className="container relative z-10 flex flex-col gap-12 pt-10 md:pt-16">
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-champagne-500 rounded-2xl mb-4 shadow-glow">
            <MessageCircle className="h-10 w-10 text-ivory" />
          </div>
          <h1 className="text-4xl font-display font-bold text-ivory mb-2">AI Assistant</h1>
          <p className="text-ink-100/70 text-lg">Get personalized recommendations using our Perfect Match Score™ system</p>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="glass-panel border-white/10 h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-champagne-500 text-midnight p-4 rounded-t-3xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">RoomNook AI</h3>
                  <p className="text-sm text-midnight/70">Online • Perfect Match Score™</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === 'user' 
                          ? 'bg-blue-500' 
                          : 'bg-gradient-to-r from-purple-500 to-pink-500'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div className={`rounded-2xl px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-emerald-500/20 text-emerald-100 border border-emerald-400/30'
                          : 'bg-white/5 text-ink-100 border border-white/10'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        {message.recommendations && message.recommendations.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {message.recommendations.map((rec, index) => (
                              <div key={index} className="bg-white bg-opacity-20 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-semibold text-sm">{rec.pg}</span>
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-4 w-4 text-yellow-400" />
                                    <span className="text-sm font-bold">{rec.score}</span>
                                  </div>
                                </div>
                                <div className="text-xs space-y-1">
                                  <p><strong>Roommate:</strong> {rec.roommate}</p>
                                  <p><strong>Mess:</strong> {rec.mess}</p>
                                  <p><strong>Total Cost:</strong> ₹{rec.totalCost}/month</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me about PGs, roommates, or mess services..."
                  className="input flex-1"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="btn btn-primary cursor-pointer relative z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Example Queries */}
          <div className="glass-panel border-white/10 p-6">
            <h3 className="text-lg font-display font-semibold text-ivory mb-4 flex items-center">
              <Zap className="h-5 w-5 text-champagne-200 mr-2" />
              Try These Queries
            </h3>
            <div className="space-y-2">
              {exampleQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(query)}
                  className="w-full text-left p-3 bg-white/5 hover:bg-emerald-400/10 rounded-lg text-sm text-ink-100/70 hover:text-emerald-100 transition-all duration-200 cursor-pointer relative z-10"
                  type="button"
                >
                  "{query}"
                </button>
              ))}
            </div>
          </div>

          {/* Perfect Match Score Info */}
          <div className="glass-panel border-white/10 p-6">
            <h3 className="text-lg font-display font-semibold text-ivory mb-4">Perfect Match Score™</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-100/70">PG Compatibility</span>
                <span className="text-sm font-semibold text-emerald-200">40%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-100/70">Roommate Match</span>
                <span className="text-sm font-semibold text-emerald-200">40%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-100/70">Mess Service</span>
                <span className="text-sm font-semibold text-emerald-200">20%</span>
              </div>
              <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs text-ink-100/60">
                  Our AI analyzes your preferences, budget, location, lifestyle, and food habits to calculate the perfect match score.
                </p>
              </div>
            </div>
          </div>

          {/* User Profile */}
          {user && (
            <div className="glass-panel border-white/10 p-6">
              <h3 className="text-lg font-display font-semibold text-ivory mb-4">Your Profile</h3>
              <div className="space-y-2 text-sm text-ink-100/70">
                <p><strong className="text-ink-100/80">Name:</strong> {user.name}</p>
                <p><strong className="text-ink-100/80">Role:</strong> {user.role}</p>
                {user.budget_min && user.budget_max && (
                  <p><strong className="text-ink-100/80">Budget:</strong> ₹{user.budget_min}-{user.budget_max}</p>
                )}
                {user.preferred_location && (
                  <p><strong className="text-ink-100/80">Location:</strong> {user.preferred_location}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
    </div>
  )
}

export default ChatAssistant
