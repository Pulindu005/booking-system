import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// Comprehensive knowledge base
const knowledge = {
  // Weather by month
  weather: {
    january: { temp: "25-30°C", condition: "Dry & sunny - Perfect!", coast: "Excellent", hills: "Cool (15-20°C)" },
    february: { temp: "26-31°C", condition: "Dry & sunny - Peak season!", coast: "Excellent", hills: "Cool (16-21°C)" },
    march: { temp: "27-32°C", condition: "Getting hotter", coast: "Good", hills: "Warm (18-23°C)" },
    april: { temp: "27-32°C", condition: "Hot & humid, some showers", coast: "Fair", hills: "Warm (19-24°C)" },
    may: { temp: "27-31°C", condition: "Southwest monsoon starts", coast: "Rainy", hills: "Wet (18-23°C)" },
    june: { temp: "26-30°C", condition: "Monsoon - heavy rain", coast: "Very rainy", hills: "Wet (17-22°C)" },
    july: { temp: "26-30°C", condition: "Monsoon continues", coast: "Rainy", hills: "Wet (17-22°C)" },
    august: { temp: "26-30°C", condition: "Monsoon easing", coast: "Some rain", hills: "Improving (17-22°C)" },
    september: { temp: "26-30°C", condition: "Transitional", coast: "Occasional rain", hills: "Better (17-22°C)" },
    october: { temp: "25-29°C", condition: "Northeast monsoon", coast: "Variable", hills: "Rain (16-21°C)" },
    november: { temp: "24-29°C", condition: "Some rain clears", coast: "Improving", hills: "Cool (15-20°C)" },
    december: { temp: "25-29°C", condition: "Dry season returns", coast: "Excellent", hills: "Cool (15-20°C)" }
  },

  // Location-specific info
  locations: {
    colombo: {
      stay: "Business hotels, city apartments near Galle Face",
      do: ["Visit Gangaramaya Temple", "Walk Galle Face Green at sunset", "Shop at Pettah Market", "See National Museum"],
      food: "Try street food on Galle Road, restaurants in Colombo 7",
      transport: "Tuk-tuks everywhere, use Uber/PickMe apps"
    },
    kandy: {
      stay: "Hotels near the lake, guesthouses in hills",
      do: ["Temple of the Tooth", "Kandy Lake walk", "Cultural dance show", "Peradeniya Botanical Gardens"],
      food: "Try local rice & curry at Devon Restaurant",
      transport: "Tuk-tuks, taxis, or rent a bike"
    },
    ella: {
      stay: "Scenic guesthouses with mountain views",
      do: ["Hike Little Adam's Peak (1hr)", "Nine Arch Bridge", "Ella Rock trek", "Train ride from Nuwara Eliya"],
      food: "Cafes with western & local fusion",
      transport: "Walk everywhere, tuk-tuks for远 places"
    },
    galle: {
      stay: "Boutique hotels inside the Fort, beach resorts nearby",
      do: ["Walk Galle Fort walls", "Visit lighthouse", "Browse antique shops", "Unawatuna beach (20min)"],
      food: "Fort restaurants, beach cafes",
      transport: "Walk in Fort, tuk-tuks to beaches"
    },
    mirissa: {
      stay: "Beach guesthouses, budget to mid-range",
      do: ["Whale watching tour (Nov-Apr)", "Relax on beach", "Surf lessons", "Coconut Tree Hill sunset"],
      food: "Beach shacks for seafood",
      transport: "Tuk-tuks, rental bikes/scooters"
    },
    sigiriya: {
      stay: "Resorts near rock, budget guesthouses in Inamaluwa",
      do: ["Climb Sigiriya Rock (2-3hrs)", "Visit Pidurangala Rock", "Safari at Minneriya (elephants)"],
      food: "Hotel restaurants, local eateries",
      transport: "Rent tuk-tuk with driver for day trips"
    },
    nuwaraeliya: {
      stay: "Colonial hotels, tea estate bungalows",
      do: ["Visit tea factories", "Horton Plains trek", "Gregory Lake", "Scenic train to Ella"],
      food: "English-style tea rooms, local restaurants",
      transport: "Tuk-tuks, taxis, or rent a car"
    }
  },

  // Travel essentials
  essentials: {
    visa: "ETA (Electronic Travel Authorization) - Apply online before arrival. $50 for most countries, 30 days.",
    currency: "Sri Lankan Rupee (LKR). $1 ≈ 300 LKR. Use ATMs in cities, carry cash for rural areas.",
    simcard: "Buy at airport: Dialog or Mobitel. ~$10 for tourist package with data.",
    safety: "Very safe for tourists. Watch belongings in crowded areas. Dress modestly at temples.",
    packing: "Light clothes, sunscreen, insect repellent. Light jacket for hills. Modest wear for temples."
  }
};

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { 
      sender: "bot", 
      text: "Hello! 👋 I'm your personal Sri Lanka travel assistant.\n\nI can help you with:\n✈️ Trip planning based on season & duration\n🌤️ Weather forecasts for your dates\n🏨 Where to stay & what to do\n💰 Budget planning\n🗺️ Customized itineraries\n📱 Practical tips (visa, SIM, safety)\n\nJust tell me: When are you visiting and for how many days?", 
      time: new Date() 
    }
  ]);
  const [input, setInput] = useState("");
  const [userContext, setUserContext] = useState({
    month: null,
    days: null,
    interests: [],
    budget: null
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getSmartResponse = (userText) => {
    const text = userText.toLowerCase();
    
    // Extract month if mentioned
    const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    const monthMatch = months.find(m => text.includes(m) || text.includes(m.slice(0, 3)));
    
    if (monthMatch && knowledge.weather[monthMatch]) {
      const weather = knowledge.weather[monthMatch];
      return `🌤️ ${monthMatch.charAt(0).toUpperCase() + monthMatch.slice(1)} Weather:\n\n` +
             `Temperature: ${weather.temp}\n` +
             `Conditions: ${weather.condition}\n` +
             `Coast: ${weather.coast}\n` +
             `Hill Country: ${weather.hills}\n\n` +
             `${weather.condition.includes("Perfect") || weather.condition.includes("Peak") || weather.condition.includes("Excellent") 
               ? "✅ Great time to visit!" 
               : weather.condition.includes("monsoon") || weather.condition.includes("rainy") 
               ? "⚠️ Consider east coast instead (Arugam Bay, Trincomalee)" 
               : "Fair travel conditions"}\n\n` +
             `How many days do you have?`;
    }

    // Check for specific locations
    const locationKeys = Object.keys(knowledge.locations);
    const locationMatch = locationKeys.find(loc => text.includes(loc));
    
    if (locationMatch) {
      const loc = knowledge.locations[locationMatch];
      return `📍 ${locationMatch.charAt(0).toUpperCase() + locationMatch.slice(1)} Guide:\n\n` +
             `🏨 Where to stay: ${loc.stay}\n\n` +
             `🎯 Things to do:\n${loc.do.map(item => `• ${item}`).join('\n')}\n\n` +
             `🍽️ Food: ${loc.food}\n` +
             `🚕 Transport: ${loc.transport}\n\n` +
             `Want hotel recommendations? Type 'hotels' or 'browse'`;
    }

    // Weather/forecast queries
    if (text.includes("weather") || text.includes("forecast") || text.includes("temperature") || 
        text.includes("rain") || text.includes("climate") || text.includes("hot") || text.includes("cold")) {
      return "I can tell you the weather for any month!\n\n" +
             "Sri Lanka has two main seasons:\n" +
             "🌞 Dry Season (Dec-Mar): Best for west/south coast & cultural sites\n" +
             "🌧️ Monsoon (May-Sep): Southwest gets rain, but east coast is great!\n\n" +
             "Which month are you visiting? Just type the month name.";
    }

    // Duration-based itineraries
    const daysMatch = text.match(/(\d+)\s*(day|days|week|weeks)/);
    if (daysMatch) {
      const days = parseInt(daysMatch[1]) * (daysMatch[2].includes("week") ? 7 : 1);
      
      if (days <= 3) {
        return "📅 Perfect 3-Day Itinerary:\n\n" +
               "Day 1: Colombo - City tour, Galle Face\n" +
               "Day 2: Galle Fort & Unawatuna Beach\n" +
               "Day 3: Mirissa (whale watching) or Hikkaduwa\n\n" +
               "🏨 Stay: Colombo (1 night), Galle/Unawatuna (2 nights)\n" +
               "🚗 Need: Car rental with driver\n\n" +
               "Want to browse hotels?";
      } else if (days <= 7) {
        return "📅 Amazing 7-Day Itinerary:\n\n" +
               "Day 1: Colombo\n" +
               "Day 2-3: Sigiriya (rock climb, safari)\n" +
               "Day 4: Kandy (Temple, cultural show)\n" +
               "Day 5: Nuwara Eliya (tea plantations)\n" +
               "Day 6: Ella (hiking, Nine Arch Bridge)\n" +
               "Day 7: Galle & South Coast\n\n" +
               "🏨 Stay rotates by location\n" +
               "🚗 Rent car with driver or train for hill country\n\n" +
               "Which area interests you most?";
      } else {
        return "📅 Ultimate 10-14 Day Itinerary:\n\n" +
               "Week 1: Cultural Triangle\n" +
               "• Colombo → Sigiriya → Polonnaruwa → Kandy → Nuwara Eliya\n\n" +
               "Week 2: Nature & Beaches\n" +
               "• Ella → Yala Safari → Mirissa → Galle → Bentota\n\n" +
               "Optional add-ons:\n" +
               "• Whale watching (Mirissa)\n" +
               "• Surfing (Arugam Bay)\n" +
               "• Adam's Peak hike\n\n" +
               "What activities interest you? (wildlife, beaches, culture, adventure)";
      }
    }

    // Essential travel info
    if (text.includes("visa") || text.includes("entry")) {
      return `🛂 Visa Information:\n\n${knowledge.essentials.visa}\n\nApply at: www.eta.gov.lk\nProcess time: Instant to 24 hours`;
    }

    if (text.includes("currency") || text.includes("money") || text.includes("atm") || text.includes("rupee")) {
      return `💵 Money Matters:\n\n${knowledge.essentials.currency}\n\nTips:\n• Notify your bank before travel\n• Keep small bills for tuk-tuks\n• Cards accepted in cities, cash needed in rural areas`;
    }

    if (text.includes("sim") || text.includes("phone") || text.includes("internet") || text.includes("data")) {
      return `📱 SIM Card:\n\n${knowledge.essentials.simcard}\n\nWhere: Airport arrival hall\nWhat you need: Passport copy\nPackage: 5-10GB for 30 days with calls`;
    }

    if (text.includes("safe") || text.includes("safety") || text.includes("dangerous") || text.includes("crime")) {
      return `🛡️ Safety:\n\n${knowledge.essentials.safety}\n\nTips:\n• Use registered tuk-tuks or Uber/PickMe\n• Don't flash valuables\n• Temples: Remove shoes, cover shoulders/knees\n• Beach safety: Watch for rip currents`;
    }

    if (text.includes("pack") || text.includes("bring") || text.includes("clothes") || text.includes("what to wear")) {
      return `🎒 Packing List:\n\n${knowledge.essentials.packing}\n\nEssentials:\n• Sunscreen SPF 50+\n• Mosquito repellent\n• Light rain jacket\n• Comfortable walking shoes\n• Power adapter (UK style)\n• First aid kit`;
    }

    // Budget queries
    if (text.includes("budget") || text.includes("cost") || text.includes("price") || text.includes("expensive") || text.includes("cheap")) {
      return "💰 Daily Budget Per Person:\n\n" +
             "🏕️ Budget: $30-50\n" +
             "• Guesthouses: $15-25\n" +
             "• Local food: $5-10\n" +
             "• Local transport: $5-10\n\n" +
             "🏨 Mid-Range: $70-120\n" +
             "• Nice hotels: $40-70\n" +
             "• Mix of restaurants: $15-25\n" +
             "• Private car: $40-50\n\n" +
             "💎 Luxury: $200+\n" +
             "• 5-star resorts: $150+\n" +
             "• Fine dining: $30-50\n" +
             "• Private guides: $50+\n\n" +
             "What's your budget level?";
    }

    // Activities
    if (text.includes("do") || text.includes("activities") || text.includes("things") || text.includes("safari") || text.includes("whale")) {
      return "🎯 Must-Do Activities:\n\n" +
             "🐘 Wildlife:\n• Safari at Yala/Udawalawe (elephants, leopards)\n• Whale watching in Mirissa (Nov-Apr)\n\n" +
             "🏞️ Nature & Adventure:\n• Climb Sigiriya Rock\n• Hike Little Adam's Peak (Ella)\n• Visit tea plantations\n• Waterfall hunting\n\n" +
             "🏛️ Culture:\n• Temple of the Tooth (Kandy)\n• Galle Fort walk\n• Traditional dance shows\n\n" +
             "🏄 Beach & Water:\n• Surf lessons (Arugam Bay, Weligama)\n• Snorkeling\n• Beach hopping\n\n" +
             "Which interests you?";
    }

    // Food
    if (text.includes("food") || text.includes("eat") || text.includes("restaurant") || text.includes("dish")) {
      return "🍛 Sri Lankan Cuisine:\n\n" +
             "Must-try dishes:\n" +
             "• Rice & Curry - The national staple\n" +
             "• Hoppers - Coconut pancakes (breakfast)\n" +
             "• Kottu Roti - Chopped roti stir-fry (street food)\n" +
             "• String hoppers - Steamed rice noodles\n" +
             "• Fresh seafood - Grilled or curry\n" +
             "• Ceylon Tea - World's best!\n\n" +
             "🌶️ Spice level: Can be very spicy - ask for \"mild\" if sensitive!\n\n" +
             "Meal costs:\n" +
             "• Local spots: $3-8\n" +
             "• Tourist restaurants: $10-20\n" +
             "• Fine dining: $25-40";
    }

    // Hotels/accommodation
    if (text.includes("hotel") || text.includes("stay") || text.includes("accommodation") || 
        text.includes("villa") || text.includes("resort") || text.includes("browse") || text.includes("listing")) {
      return "🏨 Ready to find your perfect stay!\n\n" +
             "We have:\n" +
             "• Luxury hotels & resorts\n" +
             "• Charming villas\n" +
             "• Beach bungalows\n" +
             "• Hill country retreats\n\n" +
             "All locations across Sri Lanka!\n\n" +
             "👉 Click the button below to browse our listings, or tell me your preferred location.";
    }

    // Transport/vehicles
    if (text.includes("car") || text.includes("bike") || text.includes("vehicle") || 
        text.includes("transport") || text.includes("rental") || text.includes("driver") || text.includes("tuk")) {
      return "🚗 Transportation Options:\n\n" +
             "🚙 Car with Driver (recommended):\n" +
             "• $40-60/day\n" +
             "• No stress, local knowledge\n" +
             "• Book through us!\n\n" +
             "🏍️ Bike/Scooter Rental:\n" +
             "• $10-20/day\n" +
             "• Freedom to explore\n" +
             "• Need international license\n\n" +
             "🛺 Tuk-tuk:\n" +
             "• Short trips: $2-10\n" +
             "• Day hire: $25-35\n" +
             "• Use Uber/PickMe in cities\n\n" +
             "🚂 Train:\n" +
             "• Kandy to Ella = Most scenic!\n" +
             "• Book tickets in advance\n\n" +
             "Want to see our vehicle rentals?";
    }

    // Default helpful response
    return "I'm here to help plan your perfect Sri Lanka trip! 🌴\n\n" +
           "Try asking me:\n" +
           "• \"Weather in February\" or \"Best time to visit\"\n" +
           "• \"7 day itinerary\" or \"What to do in Kandy\"\n" +
           "• \"How much does it cost?\" or \"Budget for 2 weeks\"\n" +
           "• \"Do I need a visa?\" or \"Is it safe?\"\n" +
           "• \"Where to stay in Ella?\" or \"Show me hotels\"\n" +
           "• \"Best food to try\" or \"Activities to do\"\n\n" +
           "What would you like to know?";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input, time: new Date() };
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const botMessage = { 
        sender: "bot", 
        text: getSmartResponse(input),
        time: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 600);

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const quickReplies = [
    "Weather in January",
    "7 day itinerary", 
    "Budget for trip",
    "Things to do",
    "Show hotels",
    "Do I need visa?"
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="font-serif text-4xl text-sand-900">AI Trip Planner 🤖</h1>
        <p className="mt-2 text-sand-700">
          Get personalized Sri Lanka travel recommendations - weather, itineraries, tips & bookings
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
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
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
          <div className="mb-2 text-xs font-semibold text-sand-600">Quick questions:</div>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => setInput(reply)}
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
              placeholder="Ask me anything about your Sri Lanka trip..."
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
          Ready to book? Browse hotels, villas & vehicle rentals
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
