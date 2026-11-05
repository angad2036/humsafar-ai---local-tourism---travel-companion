import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || '';
const hasApiKey = Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY');

const ai = hasApiKey
  ? new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', hasApiKey });
});

// 1. Cinematic Travel Film Script Generation Endpoint
app.post('/api/gemini/travel-film', async (req: Request, res: Response) => {
  try {
    const { destinationId, destinationName, region, highlights } = req.body;

    if (ai) {
      const prompt = `You are a world-class documentary filmmaker and poetic travel storyteller writing a 6-scene cinematic travel film script for "${destinationName}" (${region || 'India'}).
The style must be captivating, factual, evocative, and grounded in real cultural heritage.
Key highlights to weave in: ${highlights || 'heritage, spiritual landmarks, local folklore, tranquil landscapes, regional delicacies'}.

Respond ONLY with a valid JSON object matching this exact structure:
{
  "title": "Cinematic film title (e.g. Kurukshetra: Where Timeless Legends Breathe)",
  "tagline": "Evocative one-line hook",
  "scenes": [
    {
      "sceneNumber": 1,
      "title": "Welcome",
      "subtitle": "Short atmospheric subtitle",
      "narration": "3 to 4 sentences introducing the destination's aura, setting the cinematic tone.",
      "visualDescription": "Camera movement and visual direction for establishing shot.",
      "highlightPoints": ["Point 1", "Point 2"],
      "estimatedDurationSeconds": 14
    },
    {
      "sceneNumber": 2,
      "title": "History & Heritage",
      "subtitle": "Echoes of the Past",
      "narration": "3 to 4 sentences exploring historical significance and monuments.",
      "visualDescription": "Camera movement and historical monument framing.",
      "highlightPoints": ["Point 1", "Point 2"],
      "estimatedDurationSeconds": 15
    },
    {
      "sceneNumber": 3,
      "title": "Famous Attractions",
      "subtitle": "Landmarks of Wonder",
      "narration": "3 to 4 sentences highlighting the prominent attractions and architectural marvels.",
      "visualDescription": "Camera panning across iconic vistas.",
      "highlightPoints": ["Point 1", "Point 2"],
      "estimatedDurationSeconds": 14
    },
    {
      "sceneNumber": 4,
      "title": "Hidden Gems",
      "subtitle": "Untold Whispers",
      "narration": "3 to 4 sentences revealing quiet, lesser-known corners and local lore.",
      "visualDescription": "Intimate lens framing peaceful off-the-beaten-track locations.",
      "highlightPoints": ["Point 1", "Point 2"],
      "estimatedDurationSeconds": 14
    },
    {
      "sceneNumber": 5,
      "title": "Culture & Food",
      "subtitle": "Soul and Flavors",
      "narration": "3 to 4 sentences celebrating local traditions, culinary delicacies, and warmth of people.",
      "visualDescription": "Sights of steaming regional dishes, vibrant artisans, and evening gatherings.",
      "highlightPoints": ["Point 1", "Point 2"],
      "estimatedDurationSeconds": 15
    },
    {
      "sceneNumber": 6,
      "title": "Your Journey Awaits",
      "subtitle": "An Invitation to Experience",
      "narration": "3 to 4 sentences offering thoughtful travel advice and an inspiring invitation to visit.",
      "visualDescription": "Golden hour twilight horizon fading into starlight.",
      "highlightPoints": ["Point 1", "Point 2"],
      "estimatedDurationSeconds": 14
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          systemInstruction: 'You are an award-winning travel documentarian and historian for HUMSAFAR AI. Deliver historically accurate, evocative, poetic scripts in valid JSON.',
        },
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text);
        return res.json({ success: true, data: parsed, source: 'gemini' });
      }
    }
  } catch (error) {
    console.error('Gemini Travel Film Generation error:', error);
  }

  // Graceful fallback script
  const fallback = getFallbackFilmScript(req.body.destinationName || 'Kurukshetra');
  return res.json({ success: true, data: fallback, source: 'curated' });
});

// 2. AI Budget Recommendations Endpoint
app.post('/api/gemini/budget-recommendations', async (req: Request, res: Response) => {
  try {
    const { startingLocation, budgetINR, travellers, durationDays, interests, preferredDistance } = req.body;

    if (ai) {
      const prompt = `You are a budget travel analyst for HUMSAFAR AI in India.
User details:
- Starting Location: ${startingLocation || 'Delhi / NCR'}
- Total Trip Budget: ₹${budgetINR || 15000} INR
- Travellers: ${travellers || 2} persons
- Duration: ${durationDays || 2} days
- Interests: ${(interests || ['history', 'culture']).join(', ')}
- Preferred Distance: ${preferredDistance || 'Within 250 km'}

Provide 3 suitable destination recommendations strictly within or realistically under the user's total budget of ₹${budgetINR} INR.
Focus on Haryana, Punjab, Himachal foothills, and nearby heritage corridors (e.g. Kurukshetra, Morni Hills, Pinjore & Kalka, Rakhigarhi, Sultanpur, Narnaul, Panipat).

Respond ONLY with a JSON object in this exact schema:
{
  "budgetSummary": "Concise 1-line assessment of how realistic the budget is",
  "assumptions": "Short note on assumptions (e.g., mid-range guesthouse, road/train travel, authentic local dining)",
  "recommendations": [
    {
      "destinationId": "unique-slug",
      "destinationName": "Name of Place",
      "stateRegion": "State, India",
      "whyItMatches": "Direct reason this destination matches the specified interests and duration",
      "distanceKm": 150,
      "costBreakdown": {
        "travelCost": 2200,
        "accommodationCost": 4000,
        "foodCost": 2500,
        "localTransportCost": 1200,
        "activityCost": 800,
        "totalEstimatedCost": 10700
      },
      "suggestedDays": 2,
      "budgetCategory": "Economical / Balanced / Premium",
      "travelTip": "Specific insider tip for saving money or visiting early"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          systemInstruction: 'You are a meticulous travel budget advisor. Ensure all total costs are strictly <= the given budget. Use realistic Indian Rupee figures.',
        },
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text);
        return res.json({ success: true, data: parsed, source: 'gemini' });
      }
    }
  } catch (error) {
    console.error('Gemini Budget Explorer error:', error);
  }

  return res.json({ success: true, data: null, source: 'client_fallback' });
});

// 3. AI Itinerary Planner Endpoint
app.post('/api/gemini/itinerary', async (req: Request, res: Response) => {
  try {
    const { destinationName, days, travellerType, interests } = req.body;

    if (ai) {
      const prompt = `Create a realistic, culturally rich ${days || 2}-day itinerary for ${destinationName || 'Kurukshetra, Haryana'}.
Traveller type: ${travellerType || 'Couple / Small Group'}.
Interests: ${(interests || ['history', 'spirituality', 'local food']).join(', ')}.

Respond ONLY with JSON matching this structure:
{
  "destinationName": "${destinationName}",
  "totalDays": ${days || 2},
  "pacing": "Relaxed & culturally rich",
  "estimatedBudgetTotal": 9500,
  "dailyPlans": [
    {
      "dayNumber": 1,
      "title": "Theme of Day 1",
      "morning": { "time": "08:00 AM - 12:00 PM", "activity": "Activity description", "place": "Place name", "estExpense": 400 },
      "lunch": { "place": "Authentic dining recommendation", "foodItem": "Local specialty to try", "estExpense": 600 },
      "afternoon": { "time": "02:00 PM - 05:30 PM", "activity": "Activity description", "place": "Place name", "estExpense": 300 },
      "evening": { "time": "06:00 PM - 08:30 PM", "activity": "Evening experience", "place": "Sunset or ghat point", "estExpense": 350 },
      "dinner": { "place": "Recommended dinner spot", "foodItem": "Local dinner treat", "estExpense": 700 }
    }
  ],
  "localTips": ["Tip 1", "Tip 2", "Tip 3"]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          systemInstruction: 'You are a master local guide crafting realistic travel itineraries with realistic timings and authentic local food spots.',
        },
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text);
        return res.json({ success: true, data: parsed, source: 'gemini' });
      }
    }
  } catch (error) {
    console.error('Gemini Itinerary error:', error);
  }

  return res.json({ success: true, data: null, source: 'client_fallback' });
});

// Helper: Curated Fallback Film Script
function getFallbackFilmScript(destination: string) {
  return {
    title: `${destination}: Where Every Pathway Tells a Legend`,
    tagline: 'An immersive cinematic journey through heritage, sacred waters, and living culture.',
    scenes: [
      {
        sceneNumber: 1,
        title: 'Welcome',
        subtitle: 'The Sacred Gateway',
        narration: `Welcome to ${destination}. Here, the morning mist gently rises over timeless waters, where millennia of history, faith, and philosophy coalesce. Step into a land where every stone whispers an epic.`,
        visualDescription: 'Sweeping aerial camera gliding across serene waters as golden morning rays illuminate temple pinnacles and stone ghats.',
        highlightPoints: ['Sacred morning tranquility', 'Timeless cultural welcome'],
        estimatedDurationSeconds: 14,
      },
      {
        sceneNumber: 2,
        title: 'History & Heritage',
        subtitle: 'Echoes of the Great Epics',
        narration: `${destination} is renowned as the cradle of legendary civilizational crossroads. From the discourse of the Bhagavad Gita at sacred banyan canopies to archaeological settlements dating back over five thousand years, the past remains profoundly alive.`,
        visualDescription: 'Slow pan across ancient terracotta bricks, inscribed stone pillars, and revered banyan roots.',
        highlightPoints: ['Discourse of timeless wisdom', '5,000+ years of documented civilization'],
        estimatedDurationSeconds: 15,
      },
      {
        sceneNumber: 3,
        title: 'Famous Attractions',
        subtitle: 'Architectural Splendor & Sacred Sarovars',
        narration: `Marvel at the vast Brahma Sarovar, an engineering wonder that accommodates countless pilgrims during solar eclipses. Nearby stands Sheikh Chilli’s majestic marble mausoleum and the Krishna Museum, housing rare bronze relics and ancient art.`,
        visualDescription: 'Golden hour panorama of the monumental water reservoir reflecting grand red sandstone arches.',
        highlightPoints: ['Brahma Sarovar grand reservoir', 'Mughal-era marble dome architecture'],
        estimatedDurationSeconds: 15,
      },
      {
        sceneNumber: 4,
        title: 'Hidden Gems',
        subtitle: 'Unspoken Sanctuaries',
        narration: `Beyond the primary pilgrim paths lie tranquil village ashrams, silent Harappan mounds, and hidden stepwells where centuries-old neem trees shade contemplative wanderers away from the bustling highways.`,
        visualDescription: 'Intimate close-ups of carved terracotta steps and dappled sunlight filtering through ancient banyan leaves.',
        highlightPoints: ['Off-the-beaten-path stepwells', 'Lesser-known Harappan mounds'],
        estimatedDurationSeconds: 14,
      },
      {
        sceneNumber: 5,
        title: 'Culture & Food',
        subtitle: 'Earthly Warmth & Rich Flavors',
        narration: `The soul of this region thrives in its hospitable households. Taste the comforting warmth of freshly churned white makhan, bajra khichri, hot jalebis, and creamy sweet lassi served in traditional earthen kulhads with unbounded kindness.`,
        visualDescription: 'Warm glow of traditional clay tandoors, swirling golden jalebis, and welcoming smiles of local artisans.',
        highlightPoints: ['Kulhad lassi & hot jalebi', 'Bajra khichri with fresh makhan'],
        estimatedDurationSeconds: 14,
      },
      {
        sceneNumber: 6,
        title: 'Your Journey Awaits',
        subtitle: 'Every Journey Has a Story',
        narration: `HUMSAFAR invites you to travel not just as a visitor, but as an appreciative wanderer. Walk the storied ghats, listen to local storytellers, and discover that the greatest journeys are the ones that touch your soul.`,
        visualDescription: 'Evening aarti lamps floating on the calm waters as twilight settles into serene indigo starlight.',
        highlightPoints: ['Aarti lamp reflections', 'Cherished memories to carry forward'],
        estimatedDurationSeconds: 14,
      },
    ],
  };
}

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HUMSAFAR AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
