import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const botResponses = {
  greeting: "Hello! 👋 I'm your Sri Lanka travel assistant. I can help you plan your perfect trip! How many days are you planning to visit Sri Lanka?",
  
  days_3: "Great! For a 3-day trip, I recommend:\n\n📍 Day 1: Colombo (capital city, shopping, Galle Face Green)\n📍 Day 2: Galle Fort & Unawatuna Beach\n📍 Day 3: Hikkaduwa Beach & water sports\n\nWould you like hotel recommendations for these locations?",
  
  days_5: "Perfect! For a 5-day trip, here's an ideal itinerary:\n\n📍 Day 1-2: Colombo & Negombo\n📍 Day 3: Sigiriya Rock Fortress\n📍 Day 4: Kandy (Temple of Tooth, cultural shows)\n📍 Day 5: Nuwara Eliya (tea plantations)\n\nInterested in booking accommodations?",
  
  days_7: "Excellent choice! A week gives you time to explore:\n\n📍 Day 1: Colombo\n📍 Day 2-3: Sigiriya & Dambulla\n📍 Day 4: Kandy\n📍 Day 5: Nuwara Eliya\n📍 Day 6-7: Ella & South Coast beaches\n\nShould I show you vehicle rentals for this trip?",
  
  days_more: "Amazing! With 10+ days you can see it all:\n\n📍 Week 1: Cultural Triangle (Anuradhapura, Polonnaruwa, Sigiriya, Kandy)\n📍 Week 2: Hill Country (Nuwara Eliya, Ella) + South Coast (Galle, Mirissa, Unawatuna)\n\nPlus: Whale watching, safari at Yala National Park!\n\nWant me to help book your stays?",
  
  hotels: "I can help you find:\n🏨 Luxury hotels\n🏡 Cozy villas\n🏖️ Beachfront resorts\n\nType 'browse' to see all our listings or tell me your budget!",
  
  vehicles: "You'll need transportation! We offer:\n🚗 Cars with drivers\n🏍️ Bikes for solo adventures\n🛺 Three-wheelers for local experience\n\nType 'vehicles' to see rentals or let me know your preference!",
  
  budget: "Great question! Here's a rough budget per person:\n\n💰 Budget: $30-50/day (guesthouses, local food, buses)\n💵 Mid-range: $70-120/day (nice hotels, private transport)\n💎 Luxury: $200+/day (5-star resorts, private tours)\n\nWhat's your budget range?",
  
  food: "Sri Lankan food is incredible! 🍛\n\nMust-try dishes:\n• Rice & Curry (national dish)\n• Hoppers (breakfast)\n• Kottu Roti (street food)\n• Fresh seafood\n• Ceylon Tea\n\nMost meals: $3-10 at local spots, $15-30 at restaurants.",
  
  weather: "🌤️ Sri Lanka Weather:\n\n• Coastal areas: 25-30°C year-round\n• Hill country (Kandy, Nuwara Eliya): 15-25°C\n• Best time: December-March (dry season)\n• Monsoon: May-September (southwest coast)\n\nFor live weather forecasts, check weather.com\n\nWhat else can I help with?",
  
  activities: "🎯 Popular Activities:\n\n• Whale watching (Mirissa)\n• Safari at Yala National Park\n• Surfing (Arugam Bay, Hikkaduwa)\n• Temple visits & cultural tours\n• Tea plantation tours (Nuwara Eliya)\n• Rock climbing (Sigiriya, Pidurangala)\n• Waterfall visits\n\nWhich interests you?",
  
  default: "I can help with:\n• Trip duration & itinerary planning\n• Hotel & vehicle bookings\n• Budget estimates\n• Food recommendations\n• Weather info\n• Activities & places to visit\n\nWhat would you like to know?"
};

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: botResponses.greeting, time: new Date() }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userText) => {
    const text = userText.toLowerCase();
    
    // Weather responses (check FIRST before other topics)
    if (text.includes("weather") || text.includes("temperature") || text.includes("rain") || 
        text.includes("hot") || text.includes("cold") || text.includes("climate") || 
        text.includes("forecast") || text.includes("sunny") || text.includes("cloudy")) {
      return botResponses.weather;
    }

    // Activities responses
    if (text.includes("activity") || text.includes("activities") || text.includes("things to do") || 
        text.includes("what to do") || text.includes("safari") || text.includes("whale") || 
        text.includes("surf") || text.includes("beach")) {
      return botResponses.activities;
    }
    
    // Days responses
    if (text.match(/\b[1-2]\b/) || text.includes("couple") || text.includes("weekend")) {
      return botResponses.days_3;
    }
    if (text.match(/\b[3-5]\b/) || text.includes("week")) {
      return botResponses.days_5;
    }
    if (text.match(/\b[6-9]\b/) || text.includes("7") || text.includes("seven")) {
      return botResponses.days_7;
    }
    if (text.match(/\b1[0-9]\b/) || text.includes("ten") || text.includes("two weeks") || text.includes("month")) {
      return botResponses.days_more;
    }

    // Topic responses
    if (text.includes("hotel") || text.includes("stay") || text.includes("accommodation") || 
        text.includes("villa") || text.includes("resort")) {
      return botResponses.hotels;
    }
    if (text.includes("car") || text.includes("bike") || text.includes("vehicle") || 
        text.includes("transport") || text.includes("rental") || text.includes("rent")) {
      return botResponses.vehicles;
    }
    if (text.includes("budget") || text.includes("cost") || text.includes("price") || 
        text.includes("expensive") || text.includes("cheap") || text.includes("money")) {
      return botResponses.budget;
    }
    if (text.includes("food") || text.includes("eat") || text.includes("restaurant") || 
        text.includes("dish") || text.includes("lunch") || text.includes("dinner") || 
        text.includes("breakfast")) {
      return botResponses.food;
    }
    if (text.includes("browse") || text.includes("listing") || text.includes("show me")) {
      return "Perfect! Click here to browse all listings, or I can keep helping you plan. 😊";
    }

    // Default
    return botResponses.default;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input, time: new Date() };
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const botMessage = { 
        sender: "bot", 
        text: getBotResponse(input),
        time: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const quickReplies = ["3 days", "1 week", "Weather", "Activities", "Hotels", "Budget"];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="font-serif text-4xl text-sand-900">AI Trip Planner 🤖</h1>
        <p className="mt-2 text-sand-700">
          Get personalized Sri Lanka travel recommendations
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-sand-200 bg-white shadow-soft">
        {/* Chat messages */}
        <div className="h-[500px] overflow-y-auto bg-gradient-to-b from-sand-50 to-white p-6">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    msg.sender === "user"
                      ? "bg-sand-900 text-sand-50"
                      : "border border-sand-200 bg-white text-sand-900"
                  }`}
                >
                  <p className="whitespace-pre-line text-sm leading-relaxed">{msg.text}</p>
                  <span
                    className={`mt-1 block text-xs ${
                      msg.sender === "user" ? "text-sand-300" : "text-sand-500"
                    }`}
                  >
                    {msg.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick replies */}
        <div className="border-t border-sand-200 bg-sand-50 px-6 py-3">
          <div className="mb-2 text-xs font-semibold text-sand-600">Quick replies:</div>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => {
                  setInput(reply);
                }}
                className="rounded-full border border-sand-300 bg-white px-3 py-1 text-xs font-medium text-sand-700 transition hover:border-sand-400 hover:bg-sand-100"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Input area */}
        <div className="border-t border-sand-200 bg-white p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              className="flex-1 rounded-full border border-sand-300 px-5 py-3 text-sm outline-none focus:border-sand-500"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="rounded-full bg-sand-900 px-6 py-3 text-sm font-semibold text-sand-50 transition hover:bg-sand-800 disabled:opacity-40"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-sand-200 bg-white p-4">
        <div className="text-sm text-sand-700">
          Ready to book? Browse our listings
        </div>
        <Link
          to="/listings"
          className="rounded-full bg-sand-900 px-5 py-2 text-sm font-semibold text-sand-50 transition hover:bg-sand-800"
        >
          View Listings
        </Link>
      </div>

      <div className="mt-4 text-center">
        <Link to="/" className="text-sm text-sand-700 hover:text-sand-900">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
