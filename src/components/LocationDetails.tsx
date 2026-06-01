import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Cloud, Wind, Droplets, Navigation } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import { supabase } from "@/integrations/supabase/client";

export interface LocationDest {
  id: string;
  title: string;
  state: string;
  category: string;
  lat: number | null;
  lng: number | null;
  itineraryDays?: number;
}

interface Nearby {
  id: string;
  title: string;
  state: string;
  category: string;
  image: string;
  short_desc: string;
  distance: number | null;
}

// Distance between two coordinates in km
function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const toRad = (v: number) => (v * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

const WEATHER: Record<number, string> = {
  0: "Clear", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
  45: "Foggy", 48: "Foggy", 51: "Drizzle", 61: "Light rain", 63: "Rain",
  65: "Heavy rain", 71: "Snow", 80: "Showers", 95: "Thunderstorm",
};

const LocationDetails = ({ dest }: { dest: LocationDest }) => {
  const hasCoords = dest.lat != null && dest.lng != null;
  const [weather, setWeather] = useState<{ temp: number; wind: number; humidity?: number; code: number } | null>(null);
  const [nearby, setNearby] = useState<Nearby[]>([]);

  // Weather (only with coords)
  useEffect(() => {
    if (!hasCoords) return;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${dest.lat}&longitude=${dest.lng}&current_weather=true&hourly=relative_humidity_2m`;
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        const w = d.current_weather;
        setWeather({ temp: w.temperature, wind: w.windspeed, humidity: d.hourly?.relative_humidity_2m?.[0], code: w.weathercode });
      })
      .catch(() => setWeather(null));
  }, [dest.lat, dest.lng, hasCoords]);

  // Recommendations: closest by distance if we have coords, else same category
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("destinations")
        .select("id, title, state, category, image, short_desc, lat, lng")
        .neq("id", dest.id);
      if (!data) return;

      if (hasCoords) {
        const list = data
          .filter((d) => d.lat != null && d.lng != null)
          .map((d) => ({
            ...d,
            distance: distanceKm(Number(dest.lat), Number(dest.lng), Number(d.lat), Number(d.lng)),
          }))
          .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0))
          .slice(0, 4);
        setNearby(list as Nearby[]);
      } else {
        const list = data
          .filter((d) => d.category === dest.category)
          .slice(0, 4)
          .map((d) => ({ ...d, distance: null }));
        setNearby(list as Nearby[]);
      }
    };
    load();
  }, [dest.id, dest.lat, dest.lng, dest.category, hasCoords]);

  const bbox = hasCoords
    ? [Number(dest.lng) - 0.05, Number(dest.lat) - 0.05, Number(dest.lng) + 0.05, Number(dest.lat) + 0.05].join(",")
    : "";
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${dest.lat},${dest.lng}`;
  const directionsHref = `https://www.openstreetmap.org/?mlat=${dest.lat}&mlon=${dest.lng}#map=12/${dest.lat}/${dest.lng}`;

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50/50 via-background to-blue-50/50 dark:from-orange-950/10 dark:via-background dark:to-blue-950/10">
      <div className="container-custom">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase mb-3">
            Discover the Region
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Explore {dest.title} & Surroundings
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            {hasCoords ? "Map, weather and nearby attractions to plan your visit" : "More places you might love to visit"}
          </p>
        </div>

        {hasCoords && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-border shadow-lg bg-card">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                  <MapPin size={18} className="text-primary" /> Location
                </h3>
                <a href={directionsHref} target="_blank" rel="noreferrer" className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                  <Navigation size={12} /> Get Directions
                </a>
              </div>
              <iframe title={`Map of ${dest.title}`} src={mapSrc} className="w-full h-[360px] border-0" loading="lazy" />
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                  <Cloud size={18} className="text-primary" /> Current Weather
                </h3>
                {!weather ? (
                  <p className="text-muted-foreground text-sm">Loading…</p>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-4xl font-bold">{Math.round(weather.temp)}°C</span>
                      <span className="text-muted-foreground text-sm">{WEATHER[weather.code] || "—"}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5"><Wind size={12} /> {Math.round(weather.wind)} km/h</div>
                      {weather.humidity != null && (
                        <div className="flex items-center gap-1.5"><Droplets size={12} /> {weather.humidity}%</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h3 className="font-display text-lg font-semibold mb-3">Quick Info</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between"><span className="text-muted-foreground">State</span><span className="font-medium">{dest.state}</span></li>
                  <li className="flex justify-between"><span className="text-muted-foreground">Category</span><span className="font-medium">{dest.category}</span></li>
                  <li className="flex justify-between"><span className="text-muted-foreground">Coordinates</span><span className="font-medium text-xs">{Number(dest.lat).toFixed(2)}, {Number(dest.lng).toFixed(2)}</span></li>
                  {dest.itineraryDays && (
                    <li className="flex justify-between"><span className="text-muted-foreground">Best for</span><span className="font-medium">{dest.itineraryDays} days</span></li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {nearby.length > 0 && (
          <div>
            <h3 className="font-display text-2xl font-bold mb-2">
              {hasCoords ? "Nearby Places to Visit" : "Recommended for You"}
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              {hasCoords ? `Discover more destinations close to ${dest.title}` : `More ${dest.category.toLowerCase()} experiences across India`}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {nearby.map((d) => (
                <Link key={d.id} to={`/destination/${d.id}`} className="group rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="relative h-40 overflow-hidden">
                    <SafeImage src={d.image} alt={d.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    {d.distance != null && (
                      <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/60 text-white text-[10px] font-medium">
                        {Math.round(d.distance)} km away
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-[10px] uppercase tracking-wider text-white/80">{d.state} · {d.category}</p>
                      <h4 className="text-white font-semibold text-sm leading-tight">{d.title}</h4>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-muted-foreground line-clamp-2">{d.short_desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LocationDetails;
