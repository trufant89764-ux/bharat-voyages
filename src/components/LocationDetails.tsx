import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Cloud, Thermometer, Wind, Droplets, Navigation } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import { supabase } from "@/integrations/supabase/client";

export interface LocationDest {
  id: string;
  title: string;
  state: string;
  category: string;
  lat: number;
  lng: number;
  itineraryDays?: number;
}

interface Props {
  dest: LocationDest;
}

interface NearbyRow {
  id: string;
  title: string;
  state: string;
  category: string;
  image: string;
  short_desc: string;
  lat: number | null;
  lng: number | null;
  distance: number;
}

const haversineKm = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
};

interface Weather {
  temperature: number;
  windspeed: number;
  humidity?: number;
  weathercode: number;
}

const WEATHER_DESC: Record<number, string> = {
  0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
  45: "Foggy", 48: "Foggy", 51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle",
  61: "Light rain", 63: "Rain", 65: "Heavy rain", 71: "Light snow", 73: "Snow",
  75: "Heavy snow", 80: "Rain showers", 81: "Rain showers", 82: "Heavy showers",
  95: "Thunderstorm", 96: "Thunderstorm", 99: "Severe thunderstorm",
};

const LocationDetails = ({ dest }: Props) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [nearby, setNearby] = useState<NearbyRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    const fetchNearby = async () => {
      const { data } = await supabase
        .from("destinations")
        .select("id, title, state, category, image, short_desc, lat, lng")
        .neq("id", dest.id);
      if (cancelled || !data) return;
      const withDist = data
        .filter((d) => d.lat != null && d.lng != null)
        .map((d) => ({
          ...d,
          distance: haversineKm(dest, { lat: Number(d.lat), lng: Number(d.lng) }),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 4) as NearbyRow[];
      setNearby(withDist);
    };
    fetchNearby();
    return () => { cancelled = true; };
  }, [dest.id, dest.lat, dest.lng]);

  useEffect(() => {
    let cancelled = false;
    const fetchWeather = async () => {
      try {
        setLoadingWeather(true);
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${dest.lat}&longitude=${dest.lng}&current_weather=true&hourly=relative_humidity_2m`,
        );
        const json = await res.json();
        if (cancelled) return;
        const cw = json.current_weather;
        const hum = json.hourly?.relative_humidity_2m?.[0];
        setWeather({
          temperature: cw.temperature,
          windspeed: cw.windspeed,
          humidity: hum,
          weathercode: cw.weathercode,
        });
      } catch {
        if (!cancelled) setWeather(null);
      } finally {
        if (!cancelled) setLoadingWeather(false);
      }
    };
    fetchWeather();
    return () => { cancelled = true; };
  }, [dest.lat, dest.lng]);

  const bbox = [dest.lng - 0.05, dest.lat - 0.05, dest.lng + 0.05, dest.lat + 0.05].join(",");
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${dest.lat},${dest.lng}`;
  const directionsHref = `https://www.openstreetmap.org/?mlat=${dest.lat}&mlon=${dest.lng}#map=12/${dest.lat}/${dest.lng}`;

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50/50 via-background to-blue-50/50 dark:from-orange-950/10 dark:via-background dark:to-blue-950/10">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-3">
            Discover the Region
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Explore {dest.title} & Surroundings
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Map, weather and nearby attractions — everything you need to plan your visit
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-border shadow-lg bg-card">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                <MapPin size={18} className="text-primary" /> Location
              </h3>
              <a
                href={directionsHref}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
              >
                <Navigation size={12} /> Get Directions
              </a>
            </div>
            <iframe
              title={`Map of ${dest.title}`}
              src={mapSrc}
              className="w-full h-[360px] border-0"
              loading="lazy"
            />
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                <Cloud size={18} className="text-primary" /> Current Weather
              </h3>
              {loadingWeather ? (
                <p className="text-muted-foreground text-sm">Loading…</p>
              ) : weather ? (
                <div className="space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold text-foreground">
                      {Math.round(weather.temperature)}°C
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {WEATHER_DESC[weather.weathercode] || "—"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Wind size={12} /> {Math.round(weather.windspeed)} km/h
                    </div>
                    {weather.humidity != null && (
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Droplets size={12} /> {weather.humidity}%
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">Weather unavailable</p>
              )}
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                <Thermometer size={18} className="text-primary" /> Quick Info
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span className="text-muted-foreground">State</span><span className="font-medium">{dest.state}</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Category</span><span className="font-medium">{dest.category}</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Coordinates</span><span className="font-medium text-xs">{dest.lat.toFixed(2)}, {dest.lng.toFixed(2)}</span></li>
                {dest.itineraryDays && (
                  <li className="flex justify-between"><span className="text-muted-foreground">Best for</span><span className="font-medium">{dest.itineraryDays} days</span></li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {nearby.length > 0 && (
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">Nearby Places to Visit</h3>
            <p className="text-muted-foreground text-sm mb-6">Discover more incredible destinations close to {dest.title}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {nearby.map((d) => (
                <Link
                  key={d.id}
                  to={`/destination/${d.id}`}
                  className="group rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="relative h-40 overflow-hidden">
                    <SafeImage
                      src={d.image}
                      alt={d.title}
                      width={400}
                      height={280}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[10px] font-medium">
                      {Math.round(d.distance)} km away
                    </div>
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
