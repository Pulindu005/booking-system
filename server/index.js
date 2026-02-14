import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server directory
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const port = process.env.PORT || 4000;

const memoryFilePath = path.join(process.cwd(), "data", "chat-memory.json");

const ensureMemoryFile = async () => {
  await fs.mkdir(path.dirname(memoryFilePath), { recursive: true });
  try {
    await fs.access(memoryFilePath);
  } catch {
    await fs.writeFile(memoryFilePath, JSON.stringify({}), "utf-8");
  }
};

const readMemory = async () => {
  await ensureMemoryFile();
  const raw = await fs.readFile(memoryFilePath, "utf-8");
  return JSON.parse(raw || "{}");
};

const writeMemory = async (data) => {
  await ensureMemoryFile();
  await fs.writeFile(memoryFilePath, JSON.stringify(data, null, 2), "utf-8");
};

app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));

const weatherCodeMap = {
  0: "Clear",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail"
};

const decodeWeather = (code) => weatherCodeMap[code] || "Unknown";

const isWeatherQuery = (text) =>
  /(weather|forecast|temperature|rain|rainfall|humidity|wind)/i.test(text);

const extractLocation = (text) => {
  const match = text.match(/\b(?:in|for|at)\s+([a-zA-Z\s]{2,40})/i);
  if (!match) return null;
  return match[1].trim().replace(/[^a-zA-Z\s]/g, "");
};

const resolveLocation = async (req, text) => {
  const locationName = extractLocation(text);

  if (locationName) {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      locationName
    )}&count=1&language=en&format=json`;
    const geoRes = await fetch(geoUrl);
    if (geoRes.ok) {
      const geo = await geoRes.json();
      const result = geo.results?.[0];
      if (result) {
        return { name: result.name, lat: result.latitude, lon: result.longitude };
      }
    }
  }

  try {
    const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "")
      .toString()
      .split(",")[0]
      .trim();
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    if (geoRes.ok) {
      const geo = await geoRes.json();
      if (geo.latitude && geo.longitude) {
        return {
          name: geo.city || geo.region || geo.country_name || "your location",
          lat: geo.latitude,
          lon: geo.longitude
        };
      }
    }
  } catch {
    return null;
  }

  return null;
};

const fetchWeatherContext = async (req, text) => {
  if (!isWeatherQuery(text)) return "";

  const location = await resolveLocation(req, text);
  if (!location) return "";

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code` +
    `&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=3&timezone=auto`;

  const weatherRes = await fetch(url);
  if (!weatherRes.ok) return "";
  const data = await weatherRes.json();

  const current = data.current || {};
  const daily = data.daily || {};
  const dates = daily.time || [];
  const max = daily.temperature_2m_max || [];
  const min = daily.temperature_2m_min || [];
  const codes = daily.weather_code || [];

  const forecastText = dates
    .map((date, i) => {
      const desc = decodeWeather(codes[i]);
      return `${date}: ${desc}, min ${min[i] ?? "?"}°C, max ${max[i] ?? "?"}°C`;
    })
    .join(" | ");

  return (
    `Live weather data for ${location.name}: ` +
    `${decodeWeather(current.weather_code)}, ${current.temperature_2m ?? "?"}°C, ` +
    `humidity ${current.relative_humidity_2m ?? "?"}%, wind ${current.wind_speed_10m ?? "?"} km/h. ` +
    `Forecast: ${forecastText}`
  );
};

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/chat", async (req, res) => {
  const { message, history, clientId } = req.body || {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "OPENAI_API_KEY is not set" });
  }

  const systemPrompt =
    "You are an expert Sri Lanka travel assistant. Provide detailed, accurate, and friendly answers. " +
    "Ask clarifying questions when needed. Offer practical tips, costs, and best times to visit. " +
    "Avoid making up facts. If unsure, say so and suggest checking locally.";


  const safeHistory = Array.isArray(history)
    ? history
        .filter((item) => item && (item.role === "user" || item.role === "assistant") && typeof item.content === "string")
        .slice(-12)
    : [];

  try {
    const weatherContext = await fetchWeatherContext(req, message);
    const systemContent = weatherContext
      ? `${systemPrompt}\n\n${weatherContext}`
      : systemPrompt;

    const memory = clientId ? await readMemory() : {};
    const storedHistory = clientId && Array.isArray(memory[clientId]) ? memory[clientId] : [];
    const effectiveHistory = storedHistory.length ? storedHistory : safeHistory;

    const input = [
      { role: "system", content: [{ type: "text", text: systemContent }] },
      ...effectiveHistory.map((item) => ({ role: item.role, content: [{ type: "text", text: item.content }] })),
      { role: "user", content: [{ type: "text", text: message }] }
    ];

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input,
        temperature: 0.7,
        max_output_tokens: 500
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({ error: "OpenAI request failed", details: errorText });
    }

    const data = await response.json();
    const reply =
      data.output_text ||
      (data.output?.[0]?.content || [])
        .map((part) => part.text)
        .filter(Boolean)
        .join(" ") ||
      "";

    if (clientId) {
      const updated = [...effectiveHistory, { role: "user", content: message }, { role: "assistant", content: reply }].slice(-12);
      memory[clientId] = updated;
      await writeMemory(memory);
    }

    return res.json({ reply });
  } catch (error) {
    return res.status(500).json({ error: "Server error", details: error.message });
  }
});

app.post("/api/chat/stream", async (req, res) => {
  const { message, history, clientId } = req.body || {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "OPENAI_API_KEY is not set" });
  }

  const systemPrompt =
    "You are an expert Sri Lanka travel assistant. Provide detailed, accurate, and friendly answers. " +
    "Ask clarifying questions when needed. Offer practical tips, costs, and best times to visit. " +
    "Avoid making up facts. If unsure, say so and suggest checking locally.";


  const safeHistory = Array.isArray(history)
    ? history
        .filter((item) => item && (item.role === "user" || item.role === "assistant") && typeof item.content === "string")
        .slice(-12)
    : [];

  try {
    const weatherContext = await fetchWeatherContext(req, message);
    const systemContent = weatherContext
      ? `${systemPrompt}\n\n${weatherContext}`
      : systemPrompt;

    const memory = clientId ? await readMemory() : {};
    const storedHistory = clientId && Array.isArray(memory[clientId]) ? memory[clientId] : [];
    const effectiveHistory = storedHistory.length ? storedHistory : safeHistory;

    const input = [
      { role: "system", content: [{ type: "text", text: systemContent }] },
      ...effectiveHistory.map((item) => ({ role: item.role, content: [{ type: "text", text: item.content }] })),
      { role: "user", content: [{ type: "text", text: message }] }
    ];

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input,
        temperature: 0.7,
        max_output_tokens: 700,
        stream: true
      })
    });

    if (!response.ok || !response.body) {
      const errorText = await response.text();
      return res.status(500).json({ error: "OpenAI request failed", details: errorText });
    }

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let fullText = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const dataStr = trimmed.replace(/^data:\s*/, "");
        if (dataStr === "[DONE]") continue;

        try {
          const payload = JSON.parse(dataStr);
          if (payload.type === "response.output_text.delta") {
            const delta = payload.delta || "";
            fullText += delta;
            res.write(delta);
          }
        } catch {
          // Ignore parsing errors for non-JSON lines
        }
      }
    }

    if (clientId) {
      const updated = [...effectiveHistory, { role: "user", content: message }, { role: "assistant", content: fullText }].slice(-12);
      memory[clientId] = updated;
      await writeMemory(memory);
    }

    res.end();
  } catch (error) {
    return res.status(500).json({ error: "Server error", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
  console.log(`✅ OpenAI API Key: ${process.env.OPENAI_API_KEY ? 'LOADED ✓' : 'MISSING ✗'}`);
  if (process.env.OPENAI_API_KEY) {
    console.log(`🤖 ChatGPT-level AI responses enabled!`);
  } else {
    console.log(`⚠️  Using fallback responses only`);
  }
});
