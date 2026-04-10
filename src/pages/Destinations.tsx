import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ArrowRight, Filter, Search } from "lucide-react";
import { destinations, categories, type Category } from "@/data/destinations";

const Destinations = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") as Category | null;
  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">(initialCategory || "All");
  const [sortBy, setSortBy] = useState<"rating" | "price-low" | "price-high">("rating");

  const filtered = useMemo(() => {
    let result = destinations.filter((d) => {
      const matchCategory = selectedCategory === "All" || d.category === selectedCategory;
      const matchSearch =
        !search ||
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.state.toLowerCase().includes(search.toLowerCase()) ||
        d.category.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });

    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    else result.sort((a, b) => b.price - a.price);

    return result;
  }, [search, selectedCategory, sortBy]);

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="container-custom py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Discover Destinations
          </h1>
          <p className="text-muted-foreground mb-8">
            Explore India's most incredible places, festivals, and craft traditions.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center gap-2 flex-1 px-4 py-3 rounded-xl bg-card border border-border">
            <Search size={18} className="text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destinations, states, categories..."
              className="bg-transparent text-foreground placeholder:text-muted-foreground text-sm w-full focus:outline-none"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="rating">Top Rated</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === "All"
                ? "gold-gradient text-accent-foreground"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === cat.name
                  ? "gold-gradient text-accent-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No destinations found. Try adjusting your filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/destination/${dest.id}`}
                  className="group block rounded-2xl overflow-hidden bg-card border border-border hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.title}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium glass text-primary-foreground">
                      {dest.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-foreground">{dest.title}</h3>
                        <p className="text-muted-foreground text-xs">{dest.state}</p>
                      </div>
                      <div className="flex items-center gap-1 text-accent">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-medium">{dest.rating}</span>
                        <span className="text-muted-foreground text-xs">({dest.reviews})</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{dest.shortDesc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold">
                        ₹{dest.price.toLocaleString("en-IN")}
                        <span className="text-muted-foreground font-normal text-xs"> /person</span>
                      </span>
                      <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;
