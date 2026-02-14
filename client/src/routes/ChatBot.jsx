import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// COMPREHENSIVE KNOWLEDGE BASE - ChatGPT Level Intelligence
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

  // Expanded locations with more destinations
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
      transport: "Walk everywhere, tuk-tuks for far places"
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
    },
    unawatuna: {
      stay: "Beach guesthouses, mid-range hotels",
      do: ["Safe beach swimming", "Snorkel at Jungle Beach", "Visit Japanese Peace Pagoda", "Rumassala viewpoint"],
      food: "Beachfront cafes, seafood restaurants",
      transport: "Walk along beach, tuk-tuks to Galle"
    },
    arugambay: {
      stay: "Surf hostels, beach cabanas",
      do: ["Surf Main Point (best in SL!)", "Visit Pottuvil Point", "Elephant Rock", "Lagoon safari"],
      food: "Surf cafes, beachside restaurants",
      transport: "Rent scooter or bicycle"
    },
    bentota: {
      stay: "Beach resorts, luxury hotels",
      do: ["Water sports (jet ski, banana boat)", "Visit Turtle Hatchery", "Bentota River boat ride", "Relax on beach"],
      food: "Resort restaurants, local seafood",
      transport: "Hotel transport, tuk-tuks"
    },
    trincomalee: {
      stay: "Beach hotels, guesthouses",
      do: ["Swim Nilaveli Beach", "Pigeon Island snorkeling", "Koneswaram Temple", "Whale watching"],
      food: "Tamil cuisine, fresh seafood",
      transport: "Tuk-tuks, rental scooters"
    }
  },

  // Beaches comprehensive guide
  beaches: {
    best: ["Unawatuna (calm & safe)", "Mirissa (beautiful)", "Arugam Bay (surf)", "Nilaveli (pristine)", "Tangalle (secluded)"],
    family: "Unawatuna, Bentota, Hikkaduwa - calm waters, shallow",
    party: "Hikkaduwa, Arugam Bay - bars & nightlife",
    romantic: "Tangalle, Mirissa - quiet & stunning sunsets"
  },

  // Waterfalls
  waterfalls: ["Ravana Falls (Ella)", "Diyaluma Falls (2nd highest)", "Bambarakanda (tallest 263m)", "Devon Falls", "Ramboda Falls", "Dunhinda Falls"],

  // Festivals & Events
  festivals: {
    perahera: "July/August in Kandy - Grand Buddhist festival with elephants & dancers. Book hotels 6 months ahead!",
    avurudu: "April 13-14 - Sinhala/Tamil New Year. Everything closes, families gather.",
    vesak: "May - Buddhist festival, cities lit with paper lanterns. Beautiful!",
    poya: "Full moon days every month - Public holidays, alcohol ban, some places closed"
  },

  // Wildlife info
  wildlife: {
    elephants: "Best: Udawalawe NP (guaranteed sightings), Minneriya (Aug-Sep gathering), Yala",
    leopards: "Yala NP - Highest density in world! Block 1 best. Dawn safaris recommended.",
    whales: "Mirissa/Dondra Point (Nov-Apr) - Blue whales & dolphins. $40-60 tours, 3-6 hours",
    birds: "400+ species. Sinharaja Rainforest, Bundala NP for serious birdwatchers",
    turtles: "5 species nest here. Watch releases at Kosgoda/Rekawa turtle hatcheries"
  },

  // Health & Safety
  health: {
    vaccinations: "No mandatory vaccines. Recommended: Hepatitis A/B, Typhoid, Tetanus. Malaria risk is LOW.",
    hospitals: "Good private hospitals in Colombo (Asiri, Nawaloka, Apollo). Travel insurance essential!",
    water: "Don't drink tap water. Bottled water everywhere ($0.30-1)",
    stomach: "Common issue. Bring medication. Eat at busy restaurants. Avoid ice in rural areas.",
    leeches: "In rainforests & wet hill country. Wear socks, use salt/repellent. Harmless but annoying!",
    dengue: "Mosquito-borne. Use repellent, especially during monsoon. No vaccine."
  },

  // Language & Culture
  language: {
    basics: ["Ayubowan (hello)", "Bohoma stuti (thank you)", "Kohomada (how are you)", "Mata therenne naa (I don't understand)"],
    english: "Widely spoken in tourist areas. Less in rural villages.",
    tamil: "Spoken in north & east. Hindi NOT useful here!",
    tips: "Smile & nod works everywhere. Locals very friendly & helpful!"
  },

  // Scams & Safety
  scams: {
    common: ["Tuk-tuk overcharging - Agree price BEFORE", "Gem shop detours - Just say no politely", "Taxi 'meter broken' - Use Uber/PickMe", "Temple entrance 'fees' - Real temples are cheap/free"],
    avoid: "Unofficial 'guides' who approach you. Pre-book tours through hotels/proper agencies.",
    solo: "Very safe! Women can travel alone comfortably. Usual precautions: Don't walk alone late at night, watch drinks."
  },

  // Practical tips
  practical: {
    tipping: "Not mandatory. Round up bills, 10% for exceptional service. Drivers: $5-10/day",
    wifi: "Good in cities & hotels. Slow in rural areas. Buy SIM card with data!",
    laundry: "Guesthouses offer service - $1-3 per kg. Same-day or next-day.",
    toilets: "Western style in hotels. Squat toilets in local places (bring tissue!).",
    electricity: "230V, UK-style 3-pin plugs. Power cuts rare now. Bring adapter!",
    photography: "Ask before photographing people/monks. Some temples charge for cameras.",
    drones: "Need CAA permit (complex). Many areas restricted. Not recommended unless you get proper license.",
    bargaining: "Expected in markets & tuk-tuks. Not in shops/restaurants with fixed prices."
  },

  // Travel essentials
  essentials: {
    visa: "ETA (Electronic Travel Authorization) - Apply online before arrival. $50 for most countries, 30 days.",
    currency: "Sri Lankan Rupee (LKR). $1 ≈ 300 LKR. Use ATMs in cities, carry cash for rural areas.",
    simcard: "Buy at airport: Dialog or Mobitel. ~$10 for tourist package with data.",
    safety: "Very safe for tourists. Watch belongings in crowded areas. Dress modestly at temples.",
    packing: "Light clothes, sunscreen, insect repellent. Light jacket for hills. Modest wear for temples."
  },

  // Special interests
  special: {
    yoga: "Lots of retreats! Talalla, Hikkaduwa, Unawatuna. $20-200/day depending on luxury.",
    ayurveda: "Traditional healing. Resorts in Negombo, Bentota. Authentic: Barberyn resorts. Book 7-14 day packages.",
    photography: "Golden hour at Nine Arch Bridge, sunrise at Adam's Peak, stilt fishermen in Galle, tea pickers, elephants",
    honeymoon: "Galle Fort boutique hotels, Ella hills, private villas in Tangalle, luxury Bentota resorts",
    family: "Beaches (Bentota, Unawatuna), Pinnawala Elephant Orphanage, easy hikes, water sports",
    backpacker: "Cheap guesthouses $10-20. Long buses okay. Hostels in Ella, Arugam Bay. Great people!",
    luxury: "Aman resorts, Cape Weligama, Tea Trails, Santani Wellness. $300-1000/night."
  },

  // Food deep dive
  foodDetails: {
    breakfast: "Hoppers (egg/plain), string hoppers with curry, roti, kiri bath (milk rice), fresh fruit",
    lunch: "Rice & curry - Rice with 5-8 curries (dhal, vegetables, fish/chicken, sambol, papadam). Eat with hands!",
    snacks: "Patties, vadai, isso wade (prawn fritters), kottu roti, fried rice",
    dessert: "Watalappan (jaggery pudding), curd with palm honey, buffalo yogurt",
    drinks: "Ceylon tea (best: uva, pure Ceylon), King Coconut (thambili - orange coconut), fresh juices",
    vegetarian: "Lots of options! Say 'vegetarian' clearly. Temple food is always veg.",
    spicy: "Usually VERY spicy. Ask for 'not spicy' or 'mild'. Coconut/yogurt cools heat."
  }
};

export default function ChatBot() {
  const defaultGreeting = {
    sender: "bot",
    text:
      "Hello! 👋 I'm your AI Sri Lanka travel expert - trained on everything you need!\n\n" +
      "Ask me ANYTHING about:\n" +
      "✈️ Planning (itineraries, weather, best time)\n" +
      "🏖️ Places (beaches, waterfalls, temples, wildlife)\n" +
      "🏨 Practical (visa, SIM cards, money, safety, health)\n" +
      "🍛 Food (what to eat, vegetarian, dealing with spicy)\n" +
      "🎯 Activities (safaris, surfing, diving, hiking, yoga)\n" +
      "💑 Special trips (honeymoon, family, solo, backpacking)\n" +
      "🎉 Culture (festivals, language, customs, scams to avoid)\n\n" +
      "I know locations, wildlife, photography spots, health tips, transport options & more!\n\n" +
      "What do you want to know about Sri Lanka?",
    time: new Date()
  };

  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem("tripPlannerMessages");
      if (!raw) return [defaultGreeting];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) return [defaultGreeting];
      return parsed.map((msg) => ({
        ...msg,
        time: msg.time ? new Date(msg.time) : new Date()
      }));
    } catch {
      return [defaultGreeting];
    }
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const trimmed = messages.slice(-30).map((msg) => ({
      ...msg,
      time: msg.time instanceof Date ? msg.time.toISOString() : msg.time
    }));
    localStorage.setItem("tripPlannerMessages", JSON.stringify(trimmed));
  }, [messages]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
      }
    };
  }, []);

  // COMPREHENSIVE SMART RESPONSE SYSTEM - No API needed!
  const getSmartResponse = (userText) => {
    const text = userText.toLowerCase().trim();
    
    // TRIP PLANNING - Handle typos like "plane" instead of "plan"
    if (text.includes("plan my trip") || text.includes("plane my trip") || text.includes("plan a trip") || 
        text.includes("plane a trip") || text.includes("help me plan") || text.includes("planning a trip") ||
        text === "plan trip" || text === "plane trip" || text.includes("organize my trip") ||
        text.includes("create itinerary") || text.includes("make itinerary")) {
      return "Awesome! Let's plan your perfect Sri Lanka trip! 🎉✨\n\n" +
             "To create the best itinerary for you, tell me:\n\n" +
             "1️⃣ **When are you visiting?** (Which month? This affects weather & activities)\n" +
             "2️⃣ **How long?** (3 days? 1 week? 2 weeks?)\n" +
             "3️⃣ **What interests you most?**\n" +
             "   🏖️ Beaches & relaxation\n" +
             "   🏛️ Culture & temples\n" +
             "   🐘 Wildlife & safaris\n" +
             "   ⛰️ Adventure & hiking\n" +
             "   🍛 Food & local experiences\n" +
             "   💑 Romantic honeymoon\n\n" +
             "4️⃣ **Budget range?** (Budget/Mid-range/Luxury)\n\n" +
             "Share these details and I'll create a customized itinerary just for you! 🗺️";
    }
    
    // GREETINGS - Handle basic conversation
    const greetings = ["hi", "hello", "hey", "hii", "hiii", "helo", "hola", "good morning", "good afternoon", "good evening", "namaste", "ayubowan"];
    if (greetings.some(g => text === g || text === g + "!" || text.startsWith(g + " ") || text.endsWith(" " + g))) {
      const responses = [
        "Hey there! 👋 Ready to explore Sri Lanka? Ask me anything - weather, places to visit, food, wildlife, budget tips... I'm here to help!",
        "Hello! 🌴 Excited to help you plan your Sri Lanka adventure! What would you like to know?",
        "Hi! 😊 I'm your Sri Lanka travel expert. Want to know about beaches, safaris, temples, food, or something else?",
        "Ayubowan! 🙏 (That's 'hello' in Sinhala!) How can I help with your Sri Lanka trip today?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // THANK YOU responses
    if (text.includes("thank") || text.includes("thanks") || text === "thx" || text === "ty") {
      return "You're very welcome! 😊 Feel free to ask anything else about Sri Lanka. I'm here to help make your trip amazing!";
    }

    // HOW ARE YOU / SMALL TALK
    if (text.includes("how are you") || text.includes("how r u") || text.includes("hows it going") || text.includes("whats up") || text === "sup") {
      return "I'm doing great, thanks for asking! 🌟 More importantly - how can I help you plan an incredible Sri Lanka trip? Got any questions about places, activities, or travel tips?";
    }

    // GOODBYE
    if (text.includes("bye") || text.includes("goodbye") || text.includes("see you") || text.includes("good night") || text === "cya") {
      return "Safe travels! 🌏✈️ If you need any more Sri Lanka tips before your trip, I'm always here. Have an amazing adventure! 🌴";
    }

    // WHO ARE YOU
    if (text.includes("who are you") || text.includes("what are you") || text.includes("your name")) {
      return "I'm your AI Sri Lanka travel expert! 🤖🌴 I've been trained on everything about Sri Lanka - from the best beaches and wildlife safaris to practical tips like visas, food, safety, and avoiding scams. Think of me as your personal travel guide who never sleeps! What would you like to explore?";
    }

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

    // BEACHES - Comprehensive
    if (text.includes("beach") && !text.includes("hotel")) {
      if (text.includes("family") || text.includes("kid") || text.includes("child")) {
        return `👨‍👩‍👧 Best Family Beaches:\n\n${knowledge.beaches.family}\n\nAll have:\n• Calm, shallow water\n• Lifeguards present\n• Nearby restaurants\n• Easy access\n\nUnawatuna is #1 choice for families!`;
      }
      if (text.includes("party") || text.includes("nightlife") || text.includes("bar")) {
        return `🎉 Best Party Beaches:\n\n${knowledge.beaches.party}\n\nBeach bars, music, social scene!\n\nArugam Bay = backpacker vibe in peak season (May-Sep)`;
      }
      if (text.includes("romantic") || text.includes("honeymoon") || text.includes("quiet")) {
        return `💑 Most Romantic Beaches:\n\n${knowledge.beaches.romantic}\n\nPerfect for couples seeking peace & beauty.`;
      }
      return `🏖️ Sri Lanka's Best Beaches:\n\n${knowledge.beaches.best.join('\n• ')}\n\n🌊 ACTIVITIES:\n• Swimming, surfing, snorkeling\n• Whale watching (Mirissa)\n• Diving (Hikkaduwa, Trinco)\n\n📅 SEASON:\n• West/South coast: Nov-Apr\n• East coast: May-Sep\n\nWhich beach style do you prefer? (Party/romantic/family/surf)`;
    }

    // WATERFALLS
    if (text.includes("waterfall")) {
      return `💦 Best Waterfalls in Sri Lanka:\n\n${knowledge.waterfalls.map(w => `• ${w}`).join('\n')}\n\n🏆 TOP PICKS:\n• Ravana Falls - Easy access near Ella, great photo spot\n• Diyaluma Falls - Can swim at top!\n• Bambarakanda - Tallest! 263m drop\n\n💡 TIP: Visit during monsoon (May-Sep) for maximum flow.\n\nMost are free entry. Bring swimsuit!`;
    }

    // WILDLIFE - Detailed
    if (text.includes("elephant") && !text.includes("hotel")) {
      return `🐘 Elephant Encounters:\n\n${knowledge.wildlife.elephants}\n\n🎯 BEST OPTIONS:\n• Udawalawe NP - Safari ($30-40) - 100+ elephants!\n• Minneriya - "The Gathering" Aug-Sep (250+ elephants)\n• Kaudulla - Alternative to Minneriya\n\n⚠️ AVOID unethical: Elephant riding, Pinnawala at feeding time (overcrowded)\n\n🦟 Safari tips: Early morning best, bring binoculars, wear neutral colors\n\nBook safari through your hotel the day before!`;
    }

    if (text.includes("leopard") || text.includes("yala")) {
      return `🐆 Leopard Safari - Yala National Park:\n\n${knowledge.wildlife.leopards}\n\n💵 COST: $50-80 per person (includes jeep, driver, tracker)\n⏰ TIME: 6am-11am or 2pm-6pm (half-day)\n📅 BEST: Feb-July (dry season, animals near water)\n🏨 STAY: Tissamaharama town (30min from Yala)\n\n⚠️ CLOSED: September (animals mating season)\n\nBlock 1 has most leopards. Book 2-3 days in advance!\n\nAlso see: Elephants, sloth bears, crocodiles, deer, 200+ bird species`;
    }

    if (text.includes("whale")) {
      return `🐋 Whale Watching:\n\n${knowledge.wildlife.whales}\n\n🐳 SPECIES:\n• Blue whales (largest animal on Earth!)\n• Sperm whales\n• Dolphins (common!)\n\n📍 LOCATION: Mirissa/Dondra Point\n📅 SEASON: November-April (best Feb-Mar)\n💵 COST: $40-60 per person\n⏰ DURATION: 3-6 hours (early start 6-7am)\n\n🤢 WARNING: Rough seas! Take motion sickness pills.\n\nSuccess rate: 90%+ in peak season!\n\nBook day before through guesthouse or tour agency`;
    }

    if (text.includes("turtle")) {
      return `🐢 Sea Turtles:\n\n${knowledge.wildlife.turtles}\n\n🏖️ BEST SPOTS:\n• Kosgoda Turtle Hatchery - Conservation center\n• Rekawa Beach - Nesting site, night visits\n• Hikkaduwa - Snorkel with turtles!\n\n💵 COST: $5-10 hatchery entry\n\n🌙 NIGHT VISITS: See turtles laying eggs (April-Aug peak)\n\n♻️ Support conservation - these help protect endangered species`;
    }

    if (text.includes("bird") || text.includes("birdwatching")) {
      return `🦜 Birdwatching:\n\n${knowledge.wildlife.birds}\n\n🏆 TOP SPOTS:\n• Sinharaja Rainforest - 20+ endemic species!\n• Bundala NP - Wetland birds, flamingos\n• Kumana NP - Migrant birds (May-June)\n\n📸 ENDEMIC HIGHLIGHTS:\n• Sri Lanka Blue Magpie\n• Red-faced Malkoha\n• Ceylon Junglefowl (national bird)\n\nHire local guide ($20-40) for best sightings. Bring binoculars!`;
    }

    // FESTIVALS & EVENTS
    if (text.includes("festival") || text.includes("perahera") || text.includes("avurudu") || text.includes("vesak")) {
      if (text.includes("perahera")) {
        return `🎊 Kandy Esala Perahera:\n\n${knowledge.festivals.perahera}\n\n🐘 WHAT: 10-day festival with:\n• 100+ decorated elephants\n• Traditional dancers & drummers\n• Fire poi performers\n• Sacred tooth relic parade\n\n📅 WHEN: July/August (full moon)\n⏰ TIME: Evening parade ~7-11pm\n\n💡 TIPS:\n• Book hotels 6 months early!\n• Best viewing: Front seats $50-100\n• Last 2 nights are biggest\n• Arrive 3 hours early for seats\n\nMost spectacular festival in Asia!`;
      }
      return `🎉 Sri Lankan Festivals:\n\n**Kandy Perahera** (Jul/Aug):\n${knowledge.festivals.perahera}\n\n**Sinhala/Tamil New Year** (Apr 13-14):\n${knowledge.festivals.avurudu}\n\n**Vesak** (May):\n${knowledge.festivals.vesak}\n\n**Poya Days** (Monthly):\n${knowledge.festivals.poya}\n\nCheck dates before booking - Some tourist areas stay open, but cities quiet down!`;
    }

    // HEALTH & SAFETY
    if (text.includes("vaccine") || text.includes("vaccination") || text.includes("health") || text.includes("sick") || text.includes("hospital")) {
      if (text.includes("vaccine") || text.includes("vaccination")) {
        return `💉 Vaccinations:\n\n${knowledge.health.vaccinations}\n\n✅ NO mandatory shots!\n\n📋 RECOMMENDED:\n• Hep A (food/water)\n• Typhoid\n• Tetanus\n\n❌ NOT NEEDED:\n• Yellow Fever (unless from risk country)\n• Malaria pills (low risk)\n\nConsult travel doctor 4-6 weeks before trip!`;
      }
      if (text.includes("hospital")) {
        return `🏥 Medical Care:\n\n${knowledge.health.hospitals}\n\n💊 PHARMACIES: Everywhere! Most meds available without prescription.\n\n🚨 EMERGENCY: 110 (ambulance), 119 (emergency)\n\n💰 COST: Much cheaper than West! Doctor visit ~$20-40.\n\n⚠️ GET TRAVEL INSURANCE! Essential for serious issues.`;
      }
      if (text.includes("water")) {
        return `💧 Drinking Water:\n\n${knowledge.health.water}\n\nSAFE:\n• Sealed bottled water\n• Boiled water/tea\n• Filtered water at good hotels\n\nAVOID:\n• Tap water\n• Ice in rural areas\n• Unwashed fruits\n\nBottled water very cheap & everywhere!`;
      }
      if (text.includes("stomach") || text.includes("diarrhea") || text.includes("sick")) {
        return `🤢 Avoiding Stomach Issues:\n\n${knowledge.health.stomach}\n\n✅ SAFE:\n• Busy restaurants (food fresh)\n• Cooked hot food\n• Peeled fruits\n\n❌ AVOID:\n• Street food in dirty areas\n• Salads in budget places\n• Ice cream if power cuts common\n\n💊 BRING: Imodium, rehydration salts\n\nIf bad, see doctor! Cheap & quick.`;
      }
      if (text.includes("dengue") || text.includes("mosquito")) {
        return `🦟 Dengue & Mosquitoes:\n\n${knowledge.health.dengue}\n\n🛡️ PREVENTION:\n• Use DEET repellent\n• Long sleeves dawn/dusk\n• Sleep under fan/AC\n• Avoid stagnant water areas\n\n⚠️ SYMPTOMS: High fever, severe headache, joint pain\n→ See doctor immediately!\n\nRisk higher during monsoon. Bring strong repellent!`;
      }
      if (text.includes("leech")) {
        return `🪱 Leeches:\n\n${knowledge.health.leeches}\n\n📍 WHERE: Rainforests, wet hill areas (Sinharaja, Horton Plains)\n\n🛡️ PREVENTION:\n• Wear long socks over pants\n• Apply salt or tobacco water\n• Use leech socks (buy locally)\n• Check yourself every 30min\n\n🩸 IF BITTEN:\n• Don't pull! Use salt/heat to remove\n• Harmless but bleeds a lot\n• Clean & bandage\n\nAnnoying but part of rainforest adventure!`;
      }
    }

    // LANGUAGE & COMMUNICATION
    if (text.includes("language") || text.includes("speak") || text.includes("english") || text.includes("sinhala") || text.includes("phrase")) {
      return `🗣️ Language in Sri Lanka:\n\n**English Level:**\n${knowledge.language.english}\n\n**Languages:**\n• Sinhala - Majority (75%)\n• Tamil - North & East (18%)\n${knowledge.language.tamil}\n\n**Useful Phrases:**\n${knowledge.language.basics.map(p => `• ${p}`).join('\n')}\n\n💡 TIP: ${knowledge.language.tips}\n\nGoogle Translate works well! Download offline pack.`;
    }

    // SCAMS & SAFETY
    if (text.includes("scam") || text.includes("rip off") || text.includes("overcharge") || text.includes("cheat")) {
      return `⚠️ Common Tourist Scams:\n\n${knowledge.scams.common.map(s => `• ${s}`).join('\n')}\n\n🚫 HOW TO AVOID:\n${knowledge.scams.avoid}\n\n✅ SAFE BOOKING:\n• Use Uber/PickMe apps\n• Book tours through hotel\n• Check prices on TripAdvisor\n• Agree price in writing\n\nMost Sri Lankans are honest & helpful! Don't be paranoid, just aware.`;
    }

    if (text.includes("solo travel") || text.includes("travel alone") || text.includes("woman") || text.includes("female")) {
      return `👩 Solo Travel (Including Women):\n\n${knowledge.scams.solo}\n\n✅ SAFETY TIPS:\n• Stay in well-reviewed guesthouses\n• Join group tours to meet people\n• Keep phone charged\n• Share location with family\n• Trust your instincts\n\n👫 SOCIAL:\n• Easy to meet travelers in Ella, Arugam Bay\n• Hostels have group dinners\n• Tours are great for making friends\n\n🇱🇰 Locals are respectful & helpful. One of Asia's safest countries!\n\nThousands of solo women travel SL safely every year.`;
    }

    // SPECIAL INTERESTS
    if (text.includes("honeymoon") || text.includes("romantic") || text.includes("couple")) {
      return `💑 Honeymoon in Sri Lanka:\n\n${knowledge.special.honeymoon}\n\n✨ ROMANTIC ACTIVITIES:\n• Private villa with pool\n• Sunset at Coconut Tree Hill\n• Couples spa & Ayurveda treatments\n• Scenic train ride side-by-side\n• Private beach dinner\n• Hot air balloon over Sigiriya\n\n💰 BUDGET: $2000-5000 for 10 days (mid to luxury)\n\nPerfect mix of adventure, culture, beaches & relaxation!`;
    }

    if (text.includes("family") || text.includes("kids") || text.includes("children")) {
      return `👨‍👩‍👧‍👦 Family Travel:\n\n${knowledge.special.family}\n\n🎯 KID-FRIENDLY:\n• Elephant watching (exciting!)\n• Beach activities (safe)\n• Short easy hikes\n• Train rides (fun!)\n• Turtle hatcheries\n\n⚠️ SKIP:\n• Long hikes (Adam's Peak)\n• Rough safaris for young kids\n• Super spicy food\n\n💡 TIPS:\n• Bring motion sickness meds\n• Snacks (Western brands in Colombo)\n• Sun protection!\n• Most hotels have family rooms\n\nSri Lankans LOVE children - very welcoming!`;
    }

    if (text.includes("backpack") || text.includes("budget travel") || text.includes("hostel")) {
      return `🎒 Backpacker's Guide:\n\n${knowledge.special.backpacker}\n\n💰 DAILY BUDGET:\n• Dorm bed: $8-15\n• Local food: $5-10\n• Bus/train: $2-5\n• Activities: $10-30\n→ Total: $30-50/day\n\n🏠 BEST HOSTELS:\n• Ella (tons of budget options)\n• Arugam Bay (chill surf vibe)\n• Kandy (social hostels)\n• Mirissa (beach hostels)\n\n🚌 TRANSPORT: Local buses are dirt cheap but slow!\n\nGreat backpacker scene! Easy to travel cheap here.`;
    }

    if (text.includes("luxury") || text.includes("expensive") || text.includes("5 star") || text.includes("resort")) {
      return `💎 Luxury Travel:\n\n${knowledge.special.luxury}\n\n🏆 TOP RESORTS:\n• Aman resorts - Ultra luxury\n• Cape Weligama - Clifftop villas\n• Tea Trails - Plantation bungalows\n• Wild Coast Tented Lodge - Luxury safari\n• Santani Wellness - Spa retreat\n\n💰 BUDGET: $300-1000+/night\n\n✨ INCLUDES:\n• Private pools\n• Butler service\n• Gourmet dining\n• Spa treatments\n• Private tours\n\nSri Lanka luxury is world-class but still cheaper than Maldives!`;
    }

    if (text.includes("yoga") || text.includes("wellness") || text.includes("meditation")) {
      return `🧘 Yoga & Wellness:\n\n${knowledge.special.yoga}\n\n🏖️ TOP RETREATS:\n• Talalla Retreat - Beachfront yoga\n• Santani - Mountain wellness resort\n• Ulpotha - Eco village, authentic\n• Siddhalepa Ayurveda - Traditional\n\n💰 COST RANGE:\n• Budget: $20-40/day\n• Mid: $80-150/day\n• Luxury: $200-400/day\n\n📦 PACKAGES:\n• 5-21 day programs\n• Includes yoga, meals, accommodation\n• Some include Ayurveda treatments\n\nPerfect for digital detox & rejuvenation!`;
    }

    if (text.includes("ayurveda") || text.includes("spa") || text.includes("massage")) {
      return `💆 Ayurveda Treatments:\n\n${knowledge.special.ayurveda}\n\n🌿 WHAT IS IT?\nTraditional healing with oils, herbs, massage, diet.\n\n💊 TREATS:\n• Stress, anxiety\n• Digestive issues\n• Skin problems\n• Chronic pain\n• General wellness\n\n⏰ DURATION:\n• Day treatments: 1-3 hours\n• Full programs: 7-21 days\n\n💰 COST:\n• Single massage: $20-60\n• Full program: $80-300/day\n\n✅ AUTHENTIC: Look for licensed Ayurveda doctors!\n\nVery relaxing & therapeutic. Great combo with beach time!`;
    }

    if (text.includes("photograph") || (text.includes("photo") && !text.includes("hotel"))) {
      return `📸 Photography in Sri Lanka:\n\n${knowledge.special.photography}\n\n🏆 MUST-SHOOT:\n• Nine Arch Bridge (golden hour!)\n• Tea pickers in plantations\n• Stilt fishermen (Galle)\n• Sigiriya sunrise\n• Train hanging out doorway\n• Elephants at watering hole\n\n💰 CAMERA FEES:\n• Some temples: $2-5\n• Sigiriya Rock: Included\n• Most places: Free!\n\n📱 INSTAGRAM SPOTS:\n• Coconut Tree Hill\n• Ella Rock viewpoint\n• Galle Fort walls\n\n⚠️ DRONES: Need permit! ${knowledge.practical.drones}\n\nASK before photographing people/monks!`;
    }

    // PRACTICAL DETAILS
    if (text.includes(" tip") || text.includes("tipping")) {
      return `💵 Tipping Culture:\n\n${knowledge.practical.tipping}\n\n📋 GUIDELINES:\n• Restaurants: 10% if great service\n• Tuk-tuks: Round up fare\n• Drivers: $5-10/day for full day\n• Guides: $10-15/day\n• Hotel staff: $1-2 for helpful service\n\n❌ NOT EXPECTED at:\n• Street food stalls\n• Local restaurants\n• Shops\n\nNever obligatory! Only for good service.`;
    }

    if (text.includes("wifi") || text.includes("internet") || text.includes("data")) {
      return `📶 Internet & WiFi:\n\n${knowledge.practical.wifi}\n\n📱 BEST OPTION: SIM Card!\n• Dialog or Mobitel at airport\n• $10-15 for 30 days\n• 5-20GB data + calls\n• 4G in cities, 3G elsewhere\n• Setup takes 10 minutes\n\n💻 WIFI:\n• Good: Hotels, cafes in tourist areas\n• Slow: Rural guesthouses\n• Spotty: During power cuts\n\n💡 Download offline maps (Google, Maps.me) before trips!`;
    }

    if (text.includes("laundry") || text.includes("clothes") || text.includes("wash")) {
      return `👕 Laundry:\n\n${knowledge.practical.laundry}\n\n🏨 HOW:\n• Give to guesthouse/hotel\n• They wash & iron\n• Usually by weight\n\n⏰ TIMING:\n• Same-day if morning drop-off\n• Next-day if afternoon\n\n💡 TIP: Pack quick-dry clothes! Hand wash in room if needed.`;
    }

    if (text.includes("toilet") || text.includes("bathroom") || text.includes("restroom")) {
      return `🚻 Toilets:\n\n${knowledge.practical.toilets}\n\n🧻 TOILET PAPER:\n• Provided in tourist places\n• Local places: Use water spray (bum gun)\n• ALWAYS carry tissue pack!\n\n💡 TIP: Use bathroom at hotels/restaurants before long drives.\n\nPublic toilets rare outside cities. Plan ahead!`;
    }

    if (text.includes("electricity") || text.includes("power") || text.includes("plug") || text.includes("adapter") || text.includes("voltage")) {
      return `🔌 Electricity:\n\n${knowledge.practical.electricity}\n\n⚡ SPECS:\n• 230V, 50Hz\n• UK-style 3-pin plugs (Type D/G)\n\n🔌 ADAPTER:\n• UK adapter works!\n• Buy at airport if forgot\n\n🕯️ POWER CUTS:\n${knowledge.practical.electricity.split('.')[1]}\n\nMost hotels have backup generators!`;
    }

    if (text.includes("drone")) {
      return `🚁 Drones:\n\n⚠️ ${knowledge.practical.drones}\n\n📋 RESTRICTIONS:\n• Military zones\n• Near airports\n• Crowded areas\n• Cultural sites\n\n📝 PERMIT:\n• Apply to CAASL (Civil Aviation)\n• Takes weeks\n• Complex process\n\n💡 NOT WORTH IT for tourists. Just use camera/phone!`;
    }

    if (text.includes("bargain") || text.includes("haggle") || text.includes("negotiate price")) {
      return `💰 Bargaining:\n\n${knowledge.practical.bargaining}\n\n✅ BARGAIN AT:\n• Markets (Pettah, local markets)\n• Tuk-tuks (agree before!)\n• Souvenir shops\n• Beach vendors\n\n❌ FIXED PRICES:\n• Restaurants\n• Supermarkets\n• Hotels\n• Entrance fees\n\n💡 TIP: Start at 50-60% of asking price, meet in middle. Smile & be friendly!`;
    }

    // FOOD - Deep Dive
    if (text.includes("breakfast") || (text.includes("hopper") && !text.includes("grasshopper"))) {
      return `🍳 Sri Lankan Breakfast:\n\n${knowledge.foodDetails.breakfast}\n\n🥞 HOPPERS (Appa):\n• Bowl-shaped pancake\n• Crispy edges, soft center\n• Egg hopper = egg in center (best!)\n• Eat with sambol & curry\n\n🍜 STRING HOPPERS:\n• Steamed rice noodles\n• Eat with curry & coconut sambol\n\n💰 COST: $2-5 at local spots\n\nMUST TRY! Very different from Western breakfast but delicious!`;
    }

    if (text.includes("rice and curry") || text.includes("rice & curry") || text.includes("lunch")) {
      return `🍛 Rice & Curry:\n\n${knowledge.foodDetails.lunch}\n\n🍽️ WHAT YOU GET:\n• Mound of rice (center)\n• 5-8 small portions of:\n  - Dhal (lentil curry)\n  - 2-3 vegetable curries\n  - Fish or chicken curry\n  - Sambol (spicy coconut)\n  - Papadam (crispy)\n  - Sometimes egg\n\n🤚 HOW TO EAT:\n${knowledge.foodDetails.lunch.includes('hands') ? '• Traditional: Mix with right hand!\n• Foreigners: Spoon & fork okay' : ''}\n\n💰 COST: $3-5 (unlimited rice!)\n\n🌶️ Usually VERY SPICY! Ask for mild.`;
    }

    if (text.includes("kottu") || text.includes("street food") || text.includes("snack")) {
      return `🥘 Street Food & Snacks:\n\n${knowledge.foodDetails.snacks}\n\n🏆 KOTTU ROTI (MUST TRY!):\n• Chopped roti stir-fried with veggies, egg, meat\n• Made on hot griddle - loud clanging sound!\n• Served with curry sauce\n• Best late-night food\n• $2-3\n\n🍤 ISSO WADE:\n• Deep-fried prawn fritters\n• Spicy & crispy\n\n💰 STREET FOOD: Very cheap, $1-3\n\n✅ SAFE: Eat at busy stalls (food fresh!)`;
    }

    if (text.includes("dessert") || text.includes("sweet")) {
      return `🍮 Sri Lankan Desserts:\n\n${knowledge.foodDetails.dessert}\n\n🏆 MUST TRY:\n• **Watalappan** - Coconut jaggery pudding (like crème caramel)\n• **Curd & Honey** - Buffalo yogurt with palm honey\n• **Kiri Pani** - Creamy milk toffee\n\n💰 COST: $1-3\n\nNot as sweet as Western desserts. Very rich & coconutty!`;
    }

    if (text.includes("tea") || text.includes("ceylon")) {
      return `☕ Ceylon Tea:\n\n${knowledge.foodDetails.drinks}\n\n🌿 WHY IT'S SPECIAL:\n• Perfect climate (cool hills)\n• Hand-picked\n• No pesticides\n• Different regions = different flavors\n\n🏆 BEST TYPES:\n• **Uva** - Strong, bright\n• **Nuwara Eliya** - Delicate, light\n• **Dimbula** - Balanced\n\n🛒 BUYING:\n• Tea factories: $5-20/pack\n• Supermarkets: Cheaper\n• Brands: Dilmah, Mlesna, Ceylon Tea Trails\n\n✅ Look for "Pure Ceylon Tea" lion logo!\n\n💡 Visit tea plantation! Learn process, free tasting.`;
    }

    if (text.includes("vegetarian") || text.includes("vegan") || text.includes("veggie")) {
      return `🥗 Vegetarian/Vegan Food:\n\n${knowledge.foodDetails.vegetarian}\n\n🌱 VEG DISHES:\n• Rice & curry (without fish/meat)\n• Dhal curry (lentils)\n• Coconut sambol\n• Vegetable roti\n• String hoppers\n• Fresh fruits\n\n📝 WHAT TO SAY:\n• "I'm vegetarian" (they understand!)\n• "No fish, no chicken, no meat"\n• "Only vegetables"\n\n🛕 TEMPLE TIP:\n${knowledge.foodDetails.vegetarian.split('.')[1]}\n\n✅ Sri Lanka has LOTS of veg options. Easy for vegetarians!`;
    }

    if (text.includes("spicy")) {
      return `🌶️ Dealing with Spicy Food:\n\n${knowledge.foodDetails.spicy}\n\n🔥 IT'S REALLY SPICY!\n\n💡 HOW TO ORDER:\n• Say "Not spicy please"\n• "Can you make it mild?"\n• "Less chili"\n\n🥥 IF TOO SPICY:\n• Eat rice (absorbs heat)\n• Drink coconut water\n• Yogurt/curd helps\n❌ Water makes it worse!\n\n🍽️ MILD OPTIONS:\n• Tourist restaurants\n• Western-style cafes (Ella)\n• Order plain rice + mild curries\n\nLocal food is spicy by default - always specify!`;
    }

    // Best places / beautiful places queries
    if (text.includes("beautiful") || text.includes("best place") || text.includes("top place") || 
        text.includes("must visit") || text.includes("must see") || text.includes("worth visiting") ||
        text.includes("where should i go") || text.includes("where to go") || text.includes("recommend place")) {
      return "🏆 Sri Lanka's Most Beautiful Places:\n\n" +
             "🏖️ BEACHES:\n" +
             "• Unawatuna - Gorgeous bay, safe swimming\n" +
             "• Mirissa - Whale watching & stunning sunsets\n" +
             "• Arugam Bay - Surfer's paradise\n" +
             "• Tangalle - Peaceful & pristine\n\n" +
             "⛰️ HILL COUNTRY:\n" +
             "• Ella - Nine Arch Bridge, hikes, tea plantations (MUST!)\n" +
             "• Nuwara Eliya - Little England vibes\n" +
             "• Adam's Peak - Sacred sunrise hike\n\n" +
             "🏛️ CULTURAL:\n" +
             "• Sigiriya Rock - Ancient fortress (UNESCO)\n" +
             "• Galle Fort - Dutch colonial charm\n" +
             "• Temple of the Tooth, Kandy - Sacred Buddhist site\n" +
             "• Polonnaruwa - Ancient city ruins\n\n" +
             "🐘 WILDLIFE:\n" +
             "• Yala National Park - Leopards & elephants\n" +
             "• Udawalawe - Elephant orphanage\n" +
             "• Minneriya - Elephant gathering (Aug-Sep)\n\n" +
             "📸 INSTAGRAM SPOTS:\n" +
             "• Ella's Nine Arch Bridge\n" +
             "• Coconut Tree Hill, Mirissa\n" +
             "• Train ride Kandy to Ella\n" +
             "• Stilt fishermen in Galle\n\n" +
             "Want details on any specific place?";
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

    // Best time to visit
    if (text.includes("best time") || text.includes("when to visit") || text.includes("when should i go") || text.includes("ideal time")) {
      return "📆 Best Time to Visit Sri Lanka:\n\n" +
             "🌟 PEAK SEASON (Dec-March):\n" +
             "• Perfect weather: 25-30°C, sunny & dry\n" +
             "• Great for west/south coast beaches\n" +
             "• Cultural sites & hill country excellent\n" +
             "• Most expensive but worth it!\n\n" +
             "🌤️ SHOULDER (April, Nov):\n" +
             "• Good weather, fewer crowds\n" +
             "• Better prices\n" +
             "• Some rain possible\n\n" +
             "🌧️ MONSOON (May-September):\n" +
             "• Southwest coast rainy\n" +
             "• BUT: East coast (Arugam Bay, Trinco) is perfect!\n" +
             "• Lowest prices\n\n" +
             "💡 Pro tip: Sri Lanka has two coasts - one is always good!\n\n" +
             "Which month are you thinking?";
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

    // Train queries
    if (text.includes("train") || text.includes("railway") || text.includes("scenic ride")) {
      return "🚂 Sri Lanka's Famous Train Rides:\n\n" +
             "🏆 KANDY TO ELLA (Most scenic!):\n" +
             "• Duration: 6-7 hours\n" +
             "• Views: Tea plantations, mountains, tunnels\n" +
             "• Cost: $1-3 (2nd/3rd class), $8 (1st class)\n" +
             "• Tip: Book 1st class in advance, or ride in doorway (safe!)\n\n" +
             "🌊 COLOMBO TO GALLE (Coastal):\n" +
             "• Duration: 2.5 hours\n" +
             "• Views: Indian Ocean coastline\n" +
             "• Cost: $1-2\n\n" +
             "📸 PRO TIPS:\n" +
             "• Sit on right side Kandy→Ella\n" +
             "• Book tickets at train stations day before\n" +
             "• Or buy on train (conductor)\n" +
             "• Open windows = best photos!\n\n" +
             "Want to know what to do in Ella?";
    }

    // Specific attractions
    if (text.includes("sigiriya") || text.includes("lion rock")) {
      return "🏔️ Sigiriya Rock Fortress:\n\n" +
             "UNESCO World Heritage Site - ancient palace on 200m rock!\n\n" +
             "⏰ Time needed: 2-3 hours (1200 steps)\n" +
             "💵 Entrance: $30\n" +
             "🕐 Best time: Early morning (6am) or late afternoon (4pm) - avoid heat!\n" +
             "📸 Views: 360° panorama of jungle\n\n" +
             "NEARBY:\n" +
             "• Pidurangala Rock - Free, better views of Sigiriya!\n" +
             "• Minneriya Safari - Elephant gathering\n" +
             "• Dambulla Cave Temple\n\n" +
             "Stay in Sigiriya village, check our hotel listings!";
    }

    if (text.includes("adam's peak") || text.includes("adams peak") || text.includes("sri pada")) {
      return "⛰️ Adam's Peak (Sri Pada):\n\n" +
             "Sacred mountain - 2,243m sunrise pilgrimage hike!\n\n" +
             "⏰ Duration: 4-6 hours round trip\n" +
             "🌅 Start: 2-3am for sunrise\n" +
             "📅 Season: Dec-May (dry season only!)\n" +
             "💪 Difficulty: Moderate - 5,500 steps\n" +
             "💵 Free entry\n\n" +
             "TIPS:\n" +
             "• Bring flashlight & warm jacket\n" +
             "• Rest stops sell tea/snacks\n" +
             "• Sacred site - dress modestly\n" +
             "• Start from Dalhousie village\n\n" +
             "Amazing spiritual experience! Worth the early wake-up.";
    }

    if (text.includes("how long") || text.includes("how many days") || text.includes("duration")) {
      return "⏳ How Long to Stay in Sri Lanka:\n\n" +
             "⚡ 3-4 days: Colombo + one area (Galle or Kandy)\n" +
             "✅ 7 days: Cultural triangle + beaches (recommended!)\n" +
             "🏆 10-14 days: Full experience - culture, hills, wildlife, beaches\n" +
             "🌴 2-3 weeks: Relaxed pace, off-beaten-path spots\n\n" +
             "Most visitors spend 7-10 days.\n\n" +
             "How many days do you have? I'll create a perfect itinerary!";
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

    // Surfing
    if (text.includes("surf") || text.includes("wave")) {
      return "🏄 Surfing in Sri Lanka:\n\n" +
             "🌊 BEST SPOTS:\n" +
             "• Arugam Bay - World-class (May-Sep)\n" +
             "• Weligama - Perfect for beginners!\n" +
             "• Hikkaduwa - Good waves, reef breaks\n" +
             "• Mirissa - Mellow waves\n\n" +
             "💵 COSTS:\n" +
             "• Board rental: $5-10/day\n" +
             "• Lessons: $20-40 (2 hours)\n\n" +
             "📅 SEASONS:\n" +
             "• West/South coast: Nov-Apr\n" +
             "• East coast (Arugam): May-Sep\n\n" +
             "Weligama is best for learning - shallow, safe bay!";
    }

    // Diving/snorkeling
    if (text.includes("dive") || text.includes("diving") || text.includes("snorkel") || text.includes("underwater")) {
      return "🤿 Diving & Snorkeling:\n\n" +
             "🐠 TOP SPOTS:\n" +
             "• Hikkaduwa - Coral reefs, turtles\n" +
             "• Pigeon Island (Trinco) - Best reefs!\n" +
             "• Unawатuna - Turtles, good for beginners\n" +
             "• Kalpitiya - Whale sharks, dolphins\n\n" +
             "💵 COSTS:\n" +
             "• Snorkel gear: $5/day\n" +
             "• Dive (certified): $40-60\n" +
             "• PADI course: $300-400\n\n" +
             "📅 Best: Dec-Apr (calm seas)\n\n" +
             "See sea turtles everywhere!";
    }

    // Activities
    if (text.includes("what to do") || text.includes("activities") || text.includes("things to do") || 
        text.includes("safari") || text.includes("whale") || text.includes("adventure")) {
      return "🎯 Must-Do Activities:\n\n" +
             "🐘 Wildlife:\n• Safari at Yala/Udawalawe (elephants, leopards)\n• Whale watching in Mirissa (Nov-Apr)\n\n" +
             "🏞️ Nature & Adventure:\n• Climb Sigiriya Rock\n• Hike Little Adam's Peak (Ella)\n• Visit tea plantations\n• Waterfall hunting\n\n" +
             "🏛️ Culture:\n• Temple of the Tooth (Kandy)\n• Galle Fort walk\n• Traditional dance shows\n\n" +
             "🏄 Beach & Water:\n• Surf lessons (Arugam Bay, Weligama)\n• Snorkeling\n• Beach hopping\n\n" +
             "Which interests you?";
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

    // SHORT RESPONSES - Ok, cool, nice, wow, etc. (conversational acknowledgments)
    const shortResponses = ["ok", "okay", "k", "kk", "cool", "nice", "great", "good", "awesome", "wow", "ohh", "oh", "i see", "got it", "alright", "perfect", "yeah", "yes", "yup", "uh huh"];
    if (shortResponses.includes(text) || shortResponses.includes(text.replace(/[!.]+$/, ''))) {
      return "Anything else you'd like to know about Sri Lanka? 😊\n\nI can help with:\n• Places to visit\n• Weather & best time\n• Budget & costs\n• Food recommendations\n• Safety & health tips\n• Activities & wildlife\n\nJust ask away!";
    }

    // HELP / I DON'T KNOW WHAT TO ASK
    if (text.includes("help") || text.includes("dont know") || text.includes("don't know") || text.includes("not sure") || text === "?") {
      return "No worries! Let me help you get started:\n\n" +
             "🗓️ **Planning Stage:**\n• When are you going?\n• How many days?\n• What's your budget?\n\n" +
             "🎯 **Interest Based:**\n• Love beaches? Ask about best beaches!\n• Wildlife fan? Ask about safaris!\n• Foodie? Ask about Sri Lankan cuisine!\n• Adventure seeker? Ask about hiking, surfing, diving!\n\n" +
             "📋 **Practical Questions:**\n• \"Do I need a visa?\"\n• \"Is it safe?\"\n• \"How much does it cost?\"\n• \"Best time to visit?\"\n\n" +
             "Just type naturally - ask me anything! 😊";
    }

    // CAN YOU / ARE YOU ABLE TO
    if (text.startsWith("can you") || text.startsWith("are you able")) {
      return "Yes! I can help you with literally everything about Sri Lanka travel:\n\n" +
             "✅ Trip planning & itineraries\n" +
             "✅ Weather forecasts by month\n" +
             "✅ Best places for your interests\n" +
             "✅ Budget estimates & costs\n" +
             "✅ Food & restaurant tips\n" +
             "✅ Wildlife safaris & whale watching\n" +
             "✅ Beaches, temples, hiking, diving\n" +
             "✅ Safety, health, visas, SIM cards\n" +
             "✅ Avoid scams, language tips\n" +
             "✅ Special trips (honeymoon, family, solo)\n\n" +
             "Go ahead and ask - I'm trained on 50+ topics! 🚀";
    }

    // I WANT TO / I'M INTERESTED IN / I LIKE / I NEED
    if (text.startsWith("i want") || text.startsWith("i wanna") || text.startsWith("i'd like") || 
        text.startsWith("i'm interested") || text.startsWith("im interested") || 
        text.startsWith("i like") || text.startsWith("i love") || text.startsWith("i need")) {
      
      if (text.includes("plan") || text.includes("plane") || text.includes("trip") || text.includes("visit") || text.includes("itinerary")) {
        return "Perfect! Let's create your dream Sri Lanka itinerary! 🗺️✨\n\n" +
               "Please share:\n" +
               "1️⃣ **When?** (Which month are you visiting?)\n" +
               "2️⃣ **Duration?** (How many days?)\n" +
               "3️⃣ **Your interests?**\n" +
               "   🏖️ Beaches & water activities\n" +
               "   🏛️ Ancient temples & culture\n" +
               "   🐘 Wildlife safaris\n" +
               "   ⛰️ Hiking & mountains\n" +
               "   🍛 Food & cooking\n" +
               "   💑 Romantic experiences\n\n" +
               "4️⃣ **Budget?** (Backpacker/Moderate/Luxury)\n\n" +
               "The more you tell me, the better I can customize your perfect trip! 🌟";
      }
      
      if (text.includes("beach")) {
        return "🏖️ Beach lover here! Sri Lanka has stunning beaches:\n\n" +
               "**West/South Coast** (Nov-Apr):\n• Unawatuna - Family-friendly\n• Mirissa - Whale watching\n• Hikkaduwa - Snorkeling\n• Bentota - Water sports\n\n" +
               "**East Coast** (May-Sep):\n• Arugam Bay - Surfing paradise\n• Trincomalee - Pristine & quiet\n\n" +
               "What type of beach vibe are you looking for? Party, romantic, or family-friendly?";
      }
      
      if (text.includes("adventure") || text.includes("hiking") || text.includes("trek")) {
        return "⛰️ Adventure seeker! You're gonna love Sri Lanka:\n\n" +
               "🥾 **Top Hikes**:\n• Adam's Peak - Sacred sunrise climb (4-6 hrs)\n• Ella Rock - Stunning 360° views (2-3 hrs)\n• Knuckles Range - Multi-day treks\n• Horton Plains - World's End cliff (3-4 hrs)\n\n" +
               "🌊 **Water Adventures**:\n• White water rafting (Kitulgala)\n• Surfing (Arugam Bay, Weligama)\n• Diving (Trincomalee, Hikkaduwa)\n\n" +
               "Which sounds most exciting to you?";
      }
      
      if (text.includes("wildlife") || text.includes("safari") || text.includes("elephant") || text.includes("leopard")) {
        return "🐘🐆 Wildlife enthusiast! Perfect choice:\n\n" +
               "**Top Parks**:\n• Yala NP - Leopards (#1 density worldwide!)\n• Udawalawe NP - 100+ elephants guaranteed\n• Minneriya - \"The Gathering\" Aug-Sep\n• Wilpattu - Sloth bears & remote wilderness\n\n" +
               "💵 Safari cost: $40-80 per person\n⏰ Best: Early morning (6am)\n🦟 Bring: Binoculars, sunscreen, neutral clothes\n\n" +
               "Want details on a specific park?";
      }
      
      return "Awesome! I'd love to help! 😊 Tell me more details and I'll give you personalized Sri Lanka recommendations!";
    }

    // Default helpful response with personality
    return "Hey! I'm your Sri Lanka travel expert 🌴🤖\n\n" +
           "**Popular questions I crush:**\n" +
           "💬 \"Plan my trip\" - Custom itineraries\n" +
           "🌤️ \"Weather in [month]\" - Best time to visit\n" +
           "🏖️ \"Best beaches\" - All coastal gems\n" +
           "🐘 \"Where to see elephants\" - Safari guides\n" +
           "🍛 \"What food to try\" - Culinary tips\n" +
           "💵 \"How much does it cost\" - Budget planning\n" +
           "✈️ \"Do I need a visa\" - Travel essentials\n" +
           "🏨 \"Where to stay in [city]\" - Accommodation\n\n" +
           "Just ask naturally - I understand typos too! 😉\n\n" +
           "What would you like to know?";
  };

  const addBotMessage = (fullText, { animate = true } = {}) => {
    const messageId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const baseMessage = { id: messageId, sender: "bot", text: "", time: new Date() };

    if (!animate) {
      setMessages((prev) => [...prev, { ...baseMessage, text: fullText }]);
      return;
    }

    setMessages((prev) => [...prev, baseMessage]);

    let index = 0;
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }

    typingTimerRef.current = setInterval(() => {
      index += 1;
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? { ...msg, text: fullText.slice(0, index) }
            : msg
        )
      );

      if (index >= fullText.length) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    }, 12);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: "user", text: input.trim(), time: new Date() };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Try to use real AI first
      const response = await fetch("http://localhost:4000/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage.text,
          history: nextMessages.slice(-6).map(m => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text
          }))
        })
      });

      if (response.ok && response.body) {
        // Stream the AI response
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        const messageId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        
        setMessages(prev => [...prev, { 
          id: messageId, 
          sender: "bot", 
          text: "", 
          time: new Date() 
        }]);

        let fullText = "";
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullText += chunk;
          setMessages(prev => prev.map(msg => 
            msg.id === messageId ? { ...msg, text: fullText } : msg
          ));
        }
      } else {
        // Fallback to built-in responses
        const fallbackResponse = getSmartResponse(userMessage.text);
        setTimeout(() => {
          addBotMessage(fallbackResponse, { animate: true });
        }, 300);
      }
    } catch (error) {
      // If server is not running, use built-in responses
      const fallbackResponse = getSmartResponse(userMessage.text);
      setTimeout(() => {
        addBotMessage(fallbackResponse, { animate: true });
      }, 300);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      handleSend();
    }
  };

  const quickReplies = [
    "Plan my trip",
    "Best beaches",
    "7 day itinerary", 
    "Where to see leopards",
    "Vegetarian food",
    "Is it safe?"
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
              placeholder={isLoading ? "Thinking..." : "Ask me anything about your Sri Lanka trip..."}
              disabled={isLoading}
              className="flex-1 rounded-full border border-sand-300 px-5 py-3 text-sm outline-none focus:border-sand-500 disabled:bg-sand-50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="rounded-full bg-sand-900 px-6 py-3 text-sm font-semibold text-sand-50 transition hover:bg-sand-800 disabled:opacity-40"
            >
              {isLoading ? "Thinking..." : "Send"}
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
