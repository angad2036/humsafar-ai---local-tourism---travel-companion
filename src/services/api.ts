import { FilmScript, BudgetRecommendation, CostBreakdown } from '../types/travel';
import { DESTINATIONS } from '../data/destinations';

export async function fetchTravelFilmScript(
  destinationId: string,
  destinationName: string,
  region: string
): Promise<FilmScript> {
  const destination = DESTINATIONS.find((d) => d.id === destinationId) || DESTINATIONS[0];

  try {
    const res = await fetch('/api/gemini/travel-film', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        destinationId,
        destinationName,
        region,
        highlights: destination ? destination.whyVisit : undefined,
      }),
    });

    if (res.ok) {
      const json = await res.json();
      if (json && json.success && json.data) {
        // Map images to the scenes
        const script: FilmScript = {
          title: json.data.title || `${destinationName}: A Timeless Odyssey`,
          tagline: json.data.tagline || 'Every Journey Has a Story',
          destinationName,
          scenes: json.data.scenes.map((scene: any, idx: number) => {
            const img =
              idx === 0
                ? destination.heroImage
                : idx === 1
                ? destination.galleryImages[1] || destination.heroImage
                : idx === 2
                ? destination.heroImage
                : idx === 3
                ? destination.galleryImages[0] || destination.heroImage
                : idx === 4
                ? destination.heroImage
                : destination.heroImage;
            return {
              ...scene,
              image: img,
              estimatedDurationSeconds: scene.estimatedDurationSeconds || 14,
            };
          }),
        };
        return script;
      }
    }
  } catch (err) {
    console.warn('API call failed, switching to curated destination script:', err);
  }

  // Curated Fallback
  return generateCuratedScript(destination);
}

function generateCuratedScript(destination: typeof DESTINATIONS[0]): FilmScript {
  return {
    title: `${destination.name}: Where Sacred Waters & Legends Meet`,
    tagline: 'An immersive cinematic journey through Haryana’s timeless heritage.',
    destinationName: destination.name,
    scenes: [
      {
        sceneNumber: 1,
        title: 'Welcome',
        subtitle: 'The Sacred Gateway',
        narration: `Welcome to ${destination.name}. Here, early morning sunlight reflects across sacred waters and storied lands. For thousands of years, wanderers, philosophers, and travelers have gathered here to seek wisdom, peace, and discovery.`,
        visualDescription: 'Gliding drone shot across the vast tranquil waters as dawn turns into warm amber gold.',
        image: destination.heroImage,
        highlightPoints: ['Sacred morning peace', 'Living traditions & welcoming ghats'],
        estimatedDurationSeconds: 14,
      },
      {
        sceneNumber: 2,
        title: 'History & Heritage',
        subtitle: 'Epochs of Wisdom & Architecture',
        narration: `${destination.name} stands as an open book of civilization. ${destination.history.slice(0, 220)}... The enduring brick structures and sacred groves connect modern travelers directly to ancient epics.`,
        visualDescription: 'Slow pan over weathered terracotta stones, monumental arches, and sacred banyan roots.',
        image: destination.galleryImages[1] || destination.heroImage,
        highlightPoints: ['Ancient civilizational crossroads', 'Historic monuments and sacred groves'],
        estimatedDurationSeconds: 15,
      },
      {
        sceneNumber: 3,
        title: 'Famous Attractions',
        subtitle: 'Landmarks That Define the Horizon',
        narration: `Discover the grandeur of ${destination.famousAttractions[0]?.name || 'the heritage ghats'}, alongside ${destination.famousAttractions[1]?.name || 'magnificent architectural marvels'}. Each site blends monumental scale with intricate spiritual artistry.`,
        visualDescription: 'Sweeping view across grand heritage domes and evening illumination.',
        image: destination.heroImage,
        highlightPoints: [
          destination.famousAttractions[0]?.name || 'Grand Heritage Waters',
          destination.famousAttractions[1]?.name || 'Architectural Landmarks',
        ],
        estimatedDurationSeconds: 14,
      },
      {
        sceneNumber: 4,
        title: 'Hidden Gems',
        subtitle: 'Untold Whispers & Quiet Corners',
        narration: `Venture beyond the primary avenues to find ${destination.hiddenGems[0]?.name || 'secluded shrines'}. ${destination.hiddenGems[0]?.description || 'Quiet rural paths offer serene moments of reflection away from hurried crowds.'}`,
        visualDescription: 'Intimate close-ups of carved terracotta steps and dappled sunlight filtering through neem trees.',
        image: destination.galleryImages[0] || destination.heroImage,
        highlightPoints: [
          destination.hiddenGems[0]?.name || 'Offbeat heritage trail',
          'Peaceful contemplation spots',
        ],
        estimatedDurationSeconds: 14,
      },
      {
        sceneNumber: 5,
        title: 'Culture & Food',
        subtitle: 'Earthly Warmth & Rich Flavors',
        narration: `No journey here is complete without tasting the authentic local cuisine. Savor ${destination.localDelicacies[0]?.name || 'hot bajra khichri with fresh makhan'}, finished with fragrant sweets and earthen glasses of creamy lassi.`,
        visualDescription: 'Warm glow of village tandoors, clay pottery, and welcoming local hosts.',
        image: destination.heroImage,
        highlightPoints: [
          destination.localDelicacies[0]?.name || 'Local culinary specialties',
          'Generous hospitality and rural craft',
        ],
        estimatedDurationSeconds: 14,
      },
      {
        sceneNumber: 6,
        title: 'Your Journey Awaits',
        subtitle: 'Every Journey Has a Story',
        narration: `HUMSAFAR AI invites you to step onto these ancient pathways with curious eyes and an open heart. Discover places, meet local storytellers, and make this journey your own unforgettable chapter.`,
        visualDescription: 'Twilight evening lamps gently floating on the water as night sky stars emerge.',
        image: destination.galleryImages[0] || destination.heroImage,
        highlightPoints: ['Sacred evening memories', 'An invitation to experience more'],
        estimatedDurationSeconds: 14,
      },
    ],
  };
}

export interface BudgetInputParams {
  startingLocation: string;
  totalBudgetINR: number;
  travellers: number;
  durationDays: number;
  interests: string[];
  preferredDistance: string;
}

export async function fetchBudgetRecommendations(
  params: BudgetInputParams
): Promise<{ recommendations: BudgetRecommendation[]; assumptions: string; source: string }> {
  try {
    const res = await fetch('/api/gemini/budget-recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startingLocation: params.startingLocation,
        budgetINR: params.totalBudgetINR,
        travellers: params.travellers,
        durationDays: params.durationDays,
        interests: params.interests,
        preferredDistance: params.preferredDistance,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.data && data.data.recommendations && data.data.recommendations.length > 0) {
        // Enforce safety constraint: No recommendation exceeds totalBudgetINR
        const validRecs: BudgetRecommendation[] = data.data.recommendations
          .filter((r: any) => r.costBreakdown && r.costBreakdown.totalEstimatedCost <= params.totalBudgetINR * 1.05)
          .map((r: any) => {
            const matchedDest = DESTINATIONS.find((d) => d.id === r.destinationId || d.name.toLowerCase().includes(r.destinationName.toLowerCase()));
            return {
              destinationId: matchedDest ? matchedDest.id : 'kurukshetra',
              destinationName: r.destinationName,
              stateRegion: r.stateRegion || (matchedDest ? matchedDest.region : 'Haryana'),
              heroImage: matchedDest ? matchedDest.heroImage : DESTINATIONS[0].heroImage,
              description: matchedDest ? matchedDest.description : 'A rich cultural destination matching your travel preferences.',
              whyItMatches: r.whyItMatches,
              distanceKm: r.distanceKm || (matchedDest ? matchedDest.distanceFromDelhiKm : 150),
              costBreakdown: r.costBreakdown,
              suggestedDays: r.suggestedDays || params.durationDays,
              budgetCategory: r.budgetCategory || 'Balanced',
              travelTip: r.travelTip || 'Book heritage walks in advance and carry cash for local crafts.',
            };
          });

        if (validRecs.length >= 2) {
          return {
            recommendations: validRecs.slice(0, 3),
            assumptions: data.data.assumptions || 'Estimates assume road/train travel, twin-sharing clean guesthouses, and authentic local dining.',
            source: 'gemini',
          };
        }
      }
    }
  } catch (e) {
    console.warn('Backend budget recommendation error, using deterministic calculation:', e);
  }

  // Deterministic local engine respecting user budget strictly
  return computeLocalBudgetRecommendations(params);
}

function computeLocalBudgetRecommendations(params: BudgetInputParams) {
  const budget = params.totalBudgetINR;
  const numPersons = Math.max(1, params.travellers);
  const days = Math.max(1, params.durationDays);

  // Score destinations based on interests
  const scored = DESTINATIONS.map((dest) => {
    let matchScore = 0;
    const cat = dest.category;
    if (params.interests.includes('history') && (cat === 'historical' || dest.id === 'kurukshetra' || dest.id === 'rakhigarhi')) matchScore += 3;
    if (params.interests.includes('spirituality') && (cat === 'spiritual' || dest.id === 'kurukshetra')) matchScore += 3;
    if (params.interests.includes('nature') && (cat === 'nature' || dest.id === 'morni-hills' || dest.id === 'sultanpur-national-park')) matchScore += 3;
    if (params.interests.includes('photography')) matchScore += 2;
    if (params.interests.includes('food')) matchScore += 2;
    if (params.interests.includes('culture') && (cat === 'culture' || cat === 'historical')) matchScore += 2;

    // Estimate realistic total cost
    const baseDaily = dest.estimatedDailyBudgetPerPerson;
    // Shared accommodation factor
    const roomsNeeded = Math.ceil(numPersons / 2);
    const totalAcc = roomsNeeded * (baseDaily.accommodationCost * 1.1) * days;
    const totalTravel = numPersons * baseDaily.travelCost;
    const totalFood = numPersons * baseDaily.foodCost * days;
    const totalLocalTransit = Math.ceil(numPersons / 3) * baseDaily.localTransportCost * days;
    const totalActivities = numPersons * baseDaily.activityCost * days;

    let totalEst = Math.round(totalAcc + totalTravel + totalFood + totalLocalTransit + totalActivities);

    // If total exceeds budget slightly, adjust to fit economical scale
    let category: 'Economical' | 'Balanced' | 'Premium' = 'Balanced';
    if (totalEst > budget) {
      // Scale down to budget-friendly options
      const ratio = (budget * 0.9) / totalEst;
      if (ratio < 0.6) {
        // Can't fit
        matchScore = -10;
      } else {
        totalEst = Math.round(totalEst * ratio);
        category = 'Economical';
      }
    } else if (totalEst < budget * 0.65) {
      category = 'Economical';
    } else {
      category = 'Balanced';
    }

    const costBreakdown: CostBreakdown = {
      travelCost: Math.round(totalTravel * (totalEst / (totalAcc + totalTravel + totalFood + totalLocalTransit + totalActivities))),
      accommodationCost: Math.round(totalAcc * (totalEst / (totalAcc + totalTravel + totalFood + totalLocalTransit + totalActivities))),
      foodCost: Math.round(totalFood * (totalEst / (totalAcc + totalTravel + totalFood + totalLocalTransit + totalActivities))),
      localTransportCost: Math.round(totalLocalTransit * (totalEst / (totalAcc + totalTravel + totalFood + totalLocalTransit + totalActivities))),
      activityCost: Math.round(totalActivities * (totalEst / (totalAcc + totalTravel + totalFood + totalLocalTransit + totalActivities))),
      totalEstimatedCost: totalEst,
    };

    return {
      destination: dest,
      matchScore,
      costBreakdown,
      category,
    };
  });

  // Filter only those within budget
  const eligible = scored
    .filter((s) => s.costBreakdown.totalEstimatedCost <= budget && s.matchScore >= 0)
    .sort((a, b) => b.matchScore - a.matchScore);

  const finalPool = eligible.length >= 3 ? eligible : scored.sort((a, b) => a.costBreakdown.totalEstimatedCost - b.costBreakdown.totalEstimatedCost);

  const recommendations: BudgetRecommendation[] = finalPool.slice(0, 3).map((item) => ({
    destinationId: item.destination.id,
    destinationName: item.destination.name,
    stateRegion: `${item.destination.district}, ${item.destination.state}`,
    heroImage: item.destination.heroImage,
    description: item.destination.description,
    whyItMatches: `Fits seamlessly within your ₹${budget.toLocaleString('en-IN')} budget for ${numPersons} travellers over ${days} day(s), matching your interest in ${params.interests.join(' & ')}.`,
    distanceKm: item.destination.distanceFromDelhiKm,
    costBreakdown: item.costBreakdown,
    suggestedDays: days,
    budgetCategory: item.category,
    travelTip: item.destination.travelTips[0] || 'Take early morning departures to maximize daylight exploration.',
  }));

  return {
    recommendations,
    assumptions: `Estimates calculated for ${numPersons} traveller(s) for a ${days}-day trip starting from ${params.startingLocation}. Assumes twin-share accommodation, regional road/train transit, and authentic local cuisine.`,
    source: 'local_engine',
  };
}
