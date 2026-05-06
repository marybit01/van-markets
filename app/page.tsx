"use client";

import { useState } from "react";

const markets = [
  { name: "West End", day: "Saturday", hours: "9am – 2pm", location: "1100 Comox St", season: "May 2 – Oct 31", area: "Vancouver", open: true, vendors: "30+ vendors", mapQuery: "West+End+Farmers+Market+Vancouver", produce: ["Asparagus", "Lettuce", "Radishes", "Strawberries", "Tomatoes", "Corn", "Apples"] },
  { name: "Trout Lake", day: "Saturday", hours: "9am – 2pm", location: "3300 Victoria Dr", season: "May – Oct", area: "East Vancouver", open: true, vendors: "Local farms & food trucks", mapQuery: "Trout+Lake+Farmers+Market+Vancouver", produce: ["Greens", "Mushrooms", "Berries", "Squash", "Root vegetables", "Fresh bread"] },
  { name: "Riley Park", day: "Saturday", hours: "10am – 2pm", location: "4601 Ontario St", season: "Year-round", area: "Vancouver", open: true, vendors: "Year-round market", mapQuery: "Riley+Park+Farmers+Market+Vancouver", produce: ["Winter greens", "Root vegetables", "Eggs", "Cheese", "Preserves", "Baked goods"] },
  { name: "Kitsilano", day: "Sunday", hours: "10am – 2pm", location: "2690 Larch St", season: "May – Oct", area: "Kitsilano", open: true, vendors: "48 vendors", mapQuery: "Kitsilano+Farmers+Market+Vancouver", produce: ["Herbs", "Lettuce", "Berries", "Stone fruit", "Flowers", "Honey"] },
  { name: "Mount Pleasant", day: "Sunday", hours: "10am – 2pm", location: "2300 Guelph St", season: "Late Apr – Oct", area: "East Vancouver", open: true, vendors: "35 vendors", mapQuery: "Mount+Pleasant+Farmers+Market+Vancouver", produce: ["Organic greens", "Mushrooms", "Artisan cheese", "Fresh pasta", "Seasonal fruit"] },
  { name: "Ambleside", day: "Sunday", hours: "9am – 2pm", location: "Ambleside Park, 13th St", season: "May 3 – Oct 25", area: "West Vancouver", open: true, vendors: "Artisan & farm", mapQuery: "Ambleside+Farmers+Market+West+Vancouver", produce: ["Fresh produce", "Artisan bread", "Flowers", "Jams", "Handmade goods"] },
  { name: "Steveston Village", day: "Sunday", hours: "10am – 3pm", location: "Steveston Hwy & No 1 Rd", season: "May – Oct", area: "Richmond", open: true, vendors: "Seafood & produce", mapQuery: "Steveston+Farmers+Market+Richmond+BC", produce: ["Fresh seafood", "Blueberries", "Corn", "Herbs", "Honey", "Baked goods"] },
  { name: "Fort Langley", day: "Saturday", hours: "9am – 3pm", location: "9025 Glover Rd", season: "Apr 18 – Dec 5", area: "Langley", open: true, vendors: "Heritage village", mapQuery: "Fort+Langley+Farmers+Market+BC", produce: ["Fraser Valley produce", "Berries", "Preserves", "Artisan crafts", "Pumpkins", "Apples"] },
  { name: "Burnaby Brentwood", day: "Sunday", hours: "10am – 2pm", location: "The Amazing Brentwood", season: "May – Oct", area: "Burnaby", open: true, vendors: "Artisan market", mapQuery: "Brentwood+Artisan+Farmers+Market+Burnaby", produce: ["Local produce", "Baked goods", "Artisan foods", "Fresh flowers", "Honey"] },
  { name: "Lonsdale Shipyards", day: "Friday", hours: "3pm – 10pm", location: "125 Victory Ship Way", season: "May – Sep", area: "North Vancouver", open: true, vendors: "Night market", mapQuery: "Shipyards+Night+Market+North+Vancouver", produce: ["Street food", "Local produce", "Artisan goods", "Fresh seafood", "Craft drinks"] },
  { name: "Squamish", day: "Saturday", hours: "10am – 2pm", location: "Cleveland Ave & Victoria St", season: "Mar 7 – Dec 19", area: "Squamish", open: true, vendors: "Sea to Sky region", mapQuery: "Squamish+Farmers+Market+BC", produce: ["Mountain herbs", "Local honey", "Mushrooms", "Berries", "Artisan cheese"] },
  { name: "Haney (Maple Ridge)", day: "Saturday", hours: "9am – 2pm", location: "11925 Haney Place", season: "May 2 – Oct 31", area: "Maple Ridge", open: true, vendors: "Local farms", mapQuery: "Haney+Farmers+Market+Maple+Ridge+BC", produce: ["Fraser Valley produce", "Berries", "Corn", "Squash", "Local meat"] },
  { name: "Abbotsford", day: "Saturday", hours: "9am – 1pm", location: "2552 McCallum Rd", season: "May 2 – Oct 31", area: "Abbotsford", open: true, vendors: "Fraser Valley farms", mapQuery: "Abbotsford+Farm+Country+Market+BC", produce: ["Blueberries", "Raspberries", "Sweet corn", "Tomatoes", "Peppers", "Peaches"] },
  { name: "Downtown", day: "Wednesday", hours: "2pm – 6pm", location: "Hornby & Georgia", season: "May 13 – Dec 23", area: "Vancouver", open: false, vendors: "40+ vendors", mapQuery: "Downtown+Farmers+Market+Vancouver+Art+Gallery", produce: ["Seasonal greens", "Flowers", "Artisan bread", "Cheese", "Prepared foods"] },
  { name: "False Creek / Main St", day: "Thursday", hours: "2pm – 6pm", location: "Main St & Terminal Ave", season: "Jun – Oct", area: "False Creek", open: false, vendors: "Produce & food", mapQuery: "False+Creek+Farmers+Market+Vancouver", produce: ["Organic produce", "Fresh pasta", "Baked goods", "Seasonal fruit"] },
  { name: "New Westminster", day: "Thursday", hours: "3pm – 7pm", location: "315 Queens Ave, Tipperary Park", season: "Jun – Oct", area: "New Westminster", open: false, vendors: "Up to 50 vendors", mapQuery: "New+West+Farmers+Market+Tipperary+Park", produce: ["Local vegetables", "Berries", "Honey", "Baked goods", "Live music"] },
  { name: "Coquitlam", day: "Sunday", hours: "9am – 1pm", location: "624 Poirier St", season: "Jun – Oct", area: "Coquitlam", open: false, vendors: "60–70 vendors", mapQuery: "Coquitlam+Farmers+Market+Poirier+Street", produce: ["Local farms", "Berries", "Corn", "Squash", "Artisan foods"] },
  { name: "Burnaby Artisan", day: "Saturday", hours: "10am – 2pm", location: "3778 Grande Promenade", season: "Jun 13 – Aug 29", area: "Burnaby", open: false, vendors: "Local farms & crafters", mapQuery: "Burnaby+Artisan+Farmers+Market+Lougheed", produce: ["Summer produce", "Artisan crafts", "Baked goods", "Fresh flowers"] },
  { name: "Surrey Urban", day: "Saturday", hours: "10am – 3pm", location: "Bear Creek Park", season: "Jun 13 – Oct 3", area: "Surrey", open: false, vendors: "Local farms", mapQuery: "Surrey+Urban+Farmers+Market+Bear+Creek+Park", produce: ["Local vegetables", "Berries", "Honey", "Ethnic produce", "Baked goods"] },
  { name: "Ladner Village", day: "Sunday", hours: "10am – 4pm", location: "48th Ave & Elliott St", season: "Select Sundays Jun–Sep", area: "Delta", open: false, vendors: "160+ vendors", mapQuery: "Ladner+Village+Market+Delta+BC", produce: ["Fraser Valley farms", "Blueberries", "Corn", "Artisan crafts", "Baked goods", "Flowers"] },
  { name: "Port Coquitlam", day: "Saturday", hours: "9am – 1pm", location: "Wilson Farm Park", season: "Jun – Oct", area: "Port Coquitlam", open: false, vendors: "Fraser North market", mapQuery: "Port+Coquitlam+Farmers+Market+Wilson+Farm+Park", produce: ["Local produce", "Berries", "Eggs", "Honey", "Artisan goods"] },
  { name: "White Rock", day: "Sunday", hours: "10am – 2pm", location: "White Rock Promenade", season: "Jun – Sep", area: "White Rock", open: false, vendors: "Seaside market", mapQuery: "White+Rock+Farmers+Market+BC", produce: ["Seaside produce", "Fresh seafood", "Berries", "Artisan foods", "Flowers"] },
];

const days = ["All", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const dayColors: Record<string, string> = {
  Wednesday: "#7C3AED",
  Thursday: "#B45309",
  Friday: "#0369A1",
  Saturday: "#166534",
  Sunday: "#9D174D",
};

const produceEmoji: Record<string, string> = {
  "Asparagus": "🌿", "Lettuce": "🥬", "Radishes": "🌸", "Strawberries": "🍓",
  "Tomatoes": "🍅", "Corn": "🌽", "Apples": "🍎", "Greens": "🥬",
  "Mushrooms": "🍄", "Berries": "🫐", "Squash": "🎃", "Root vegetables": "🥕",
  "Fresh bread": "🍞", "Winter greens": "🥬", "Eggs": "🥚", "Cheese": "🧀",
  "Preserves": "🫙", "Baked goods": "🧁", "Herbs": "🌿", "Stone fruit": "🍑",
  "Flowers": "💐", "Honey": "🍯", "Organic greens": "🌱", "Artisan cheese": "🧀",
  "Fresh pasta": "🍝", "Seasonal fruit": "🍇", "Artisan bread": "🍞",
  "Jams": "🫙", "Handmade goods": "🎁", "Fresh seafood": "🐟",
  "Blueberries": "🫐", "Fraser Valley produce": "🥦", "Artisan crafts": "🎨",
  "Pumpkins": "🎃", "Local produce": "🧺", "Artisan foods": "🫙",
  "Street food": "🥙", "Artisan goods": "🎁", "Craft drinks": "🍵",
  "Mountain herbs": "🌿", "Local honey": "🍯", "Seasonal greens": "🥬",
  "Prepared foods": "🍱", "Organic produce": "🥦", "Local vegetables": "🥕",
  "Summer produce": "☀️", "Fresh flowers": "🌷", "Local farms": "🌾",
  "Ethnic produce": "🌶️", "Raspberries": "🍓", "Sweet corn": "🌽",
  "Peppers": "🫑", "Peaches": "🍑", "Local meat": "🥩",
  "Fresh produce": "🧺", "Live music": "🎵", "Fraser Valley farms": "🌾",
  "Seaside produce": "🌊",
};

type Market = typeof markets[0];

function getMapUrl(q: string) {
  return "https://www.google.com/maps/search/?api=1&query=" + q;
}

function getInstaUrl(name: string) {
  return "https://www.instagram.com/explore/search/keyword/?q=" + name.replace(/ /g, "%20") + "%20Farmers%20Market";
}

export default function Home() {
  const [activeDay, setActiveDay] = useState("All");
  const [selected, setSelected] = useState<Market | null>(null);

  const filtered = activeDay === "All" ? markets : markets.filter(m => m.day === activeDay);
  const openCount = markets.filter(m => m.open).length;

  return (
    <main style={{ minHeight: '100vh', background: '#f4f7f2', fontFamily: 'Georgia, serif' }}>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(20,40,20,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: '#fffef9', borderRadius: '24px', padding: '2rem', maxWidth: '460px', width: '100%', position: 'relative', border: '1px solid #e2ecd8' }}
          >
            <button
              onClick={() => setSelected(null)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#f0f4ec', border: 'none', borderRadius: '99px', width: '30px', height: '30px', cursor: 'pointer', fontSize: '14px', color: '#888' }}
            >✕</button>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ background: dayColors[selected.day] || '#1a3d2b', color: 'white', fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '99px', fontFamily: 'system-ui' }}>{selected.day}</span>
                <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '99px', background: selected.open ? '#e6f4ea' : '#f3f4f6', color: selected.open ? '#1a6b3a' : '#9ca3af', fontWeight: '600', fontFamily: 'system-ui' }}>
                  {selected.open ? '🌿 Open now' : '🌙 Coming soon'}
                </span>
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1a2e1a', margin: '0 0 2px' }}>{selected.name}</h2>
              <div style={{ fontSize: '13px', color: '#8a9e8a', fontFamily: 'system-ui' }}>{selected.area}</div>
            </div>

            <div style={{ background: '#f4f9f0', borderRadius: '14px', padding: '1rem', marginBottom: '1.25rem', fontFamily: 'system-ui' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px', color: '#4a5e4a' }}>
                <div>🕐 {selected.hours}</div>
                <div>🗓 {selected.season}</div>
                <div style={{ gridColumn: '1/-1' }}>📍 {selected.location}</div>
                <div style={{ gridColumn: '1/-1' }}>🛒 {selected.vendors}</div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#8a9e8a', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'system-ui' }}>
                ✨ Typically in season
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selected.produce.map(p => (
                  <span key={p} style={{ background: 'white', color: '#2d5a2d', fontSize: '12px', padding: '4px 12px', borderRadius: '99px', border: '1px solid #c8e0c0', fontFamily: 'system-ui' }}>
                    {produceEmoji[p] || '🌱'} {p}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <a href={getMapUrl(selected.mapQuery)} target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, padding: '12px', borderRadius: '12px', background: '#1a3d2b', color: 'white', textAlign: 'center', textDecoration: 'none', fontSize: '13px', fontWeight: '600', fontFamily: 'system-ui' }}>
                📍 Open in Maps
              </a>
              <a href={getInstaUrl(selected.name)} target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, padding: '12px', borderRadius: '12px', background: '#f0f4ec', color: '#2d5a2d', textAlign: 'center', textDecoration: 'none', fontSize: '13px', fontWeight: '600', fontFamily: 'system-ui' }}>
                📸 Instagram
              </a>
            </div>
          </div>
        </div>
      )}

      <div style={{ background: 'linear-gradient(135deg, #1a3d2b 0%, #2d5a3d 100%)', color: 'white', padding: '3.5rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', color: '#a8d5b5', marginBottom: '10px', letterSpacing: '0.12em', fontFamily: 'system-ui' }}>
            🌱 GREATER VANCOUVER · 2026 SEASON
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '10px', lineHeight: 1.2 }}>
            Vancouver Farmers Markets
          </h1>
          <p style={{ color: '#b8d5c0', fontSize: '16px', marginBottom: '2rem', maxWidth: '500px', lineHeight: 1.6 }}>
            Find fresh local produce, artisan goods, and seasonal food across the Lower Mainland.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#7ee8a2' }}>{openCount}</div>
              <div style={{ fontSize: '11px', color: '#a8d5b5', letterSpacing: '0.05em', fontFamily: 'system-ui' }}>OPEN NOW</div>
            </div>
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.15)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#7ee8a2' }}>{markets.length}</div>
              <div style={{ fontSize: '11px', color: '#a8d5b5', letterSpacing: '0.05em', fontFamily: 'system-ui' }}>TOTAL MARKETS</div>
            </div>
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.15)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#7ee8a2' }}>5</div>
              <div style={{ fontSize: '11px', color: '#a8d5b5', letterSpacing: '0.05em', fontFamily: 'system-ui' }}>DAYS A WEEK</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '1.5rem' }}>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {days.map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              style={{
                padding: '7px 18px', borderRadius: '99px', border: '1.5px solid',
                borderColor: activeDay === day ? (dayColors[day] || '#1a3d2b') : '#cdd9c5',
                background: activeDay === day ? (dayColors[day] || '#1a3d2b') : 'white',
                color: activeDay === day ? 'white' : '#5a7a5a',
                fontSize: '13px', cursor: 'pointer', fontWeight: '500',
                fontFamily: 'system-ui',
              }}
            >
              {day}
            </button>
          ))}
        </div>

        <div style={{ fontSize: '13px', color: '#8a9e8a', marginBottom: '1.25rem', fontFamily: 'system-ui' }}>
          {filtered.length} market{filtered.length !== 1 ? 's' : ''} · {filtered.filter(m => m.open).length} open now · tap any card for details
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '14px' }}>
          {filtered.map((market) => (
            <div
              key={market.name}
              onClick={() => setSelected(market)}
              style={{
                background: market.open ? '#fffef9' : '#f9faf8',
                borderRadius: '18px', overflow: 'hidden',
                border: '1px solid', borderColor: market.open ? '#d4e8c8' : '#e8ede4',
                opacity: market.open ? 1 : 0.7,
                transition: 'transform 0.15s, box-shadow 0.15s', cursor: 'pointer',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 10px 30px rgba(30,70,30,0.1)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              }}
            >
              <div style={{ height: '5px', background: market.open ? 'linear-gradient(90deg, #2d8a4e, #7ee8a2)' : '#e8ede4' }} />
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '16px', color: '#1a2e1a', marginBottom: '2px' }}>{market.name}</div>
                    <div style={{ fontSize: '11px', color: '#8a9e8a', fontFamily: 'system-ui', letterSpacing: '0.04em' }}>{market.area.toUpperCase()}</div>
                  </div>
                  <span style={{
                    fontSize: '11px', padding: '4px 10px', borderRadius: '99px',
                    background: market.open ? '#e6f4ea' : '#f0f0ee',
                    color: market.open ? '#1a6b3a' : '#9ca3af',
                    fontWeight: '600', whiteSpace: 'nowrap', fontFamily: 'system-ui',
                  }}>
                    {market.open ? '🌿 Open' : '🌙 Soon'}
                  </span>
                </div>
                <div style={{ borderTop: '1px solid #eef2ea', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px', fontFamily: 'system-ui' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      background: dayColors[market.day] || '#1a3d2b', color: 'white',
                      fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '99px', letterSpacing: '0.03em',
                    }}>{market.day.toUpperCase()}</span>
                    <span style={{ fontSize: '13px', color: '#4a5e4a' }}>{market.hours}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#6a7e6a' }}>📍 {market.location}</div>
                  <div style={{ fontSize: '12px', color: '#6a7e6a' }}>🗓 {market.season}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: '560px', margin: '3.5rem auto 0', textAlign: 'center', padding: '2.5rem 2rem', background: '#fffef9', borderRadius: '24px', border: '1px solid #d4e8c8' }}>
          <div style={{ fontSize: '28px', marginBottom: '1rem' }}>🌸</div>
          <p style={{ fontSize: '15px', color: '#3a5a3a', lineHeight: '1.9', marginBottom: '1.25rem' }}>
            hi im mariam murabit, and I built this because I kept missing my local market:
            wrong day, wrong time, no idea what was even in season.
            this is my small fix for that. I hope it gets you outside and eating something grown nearby.
          </p>
          <p style={{ fontSize: '15px', color: '#7a9e7a', fontStyle: 'italic', marginBottom: '6px' }}>
            "The earth laughs in flowers."
          </p>
          <p style={{ fontSize: '12px', color: '#a8b8a8', fontFamily: 'system-ui' }}>— Rumi</p>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '12px', color: '#a8b8a8', paddingBottom: '2.5rem', fontFamily: 'system-ui' }}>
          made for vancouverites · data from eatlocal.org
        </div>

      </div>
    </main>
  )
}