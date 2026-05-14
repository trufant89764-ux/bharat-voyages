import { useState, useEffect } from "react";
import SafeImage from "@/components/SafeImage";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ArrowRight, Search, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { useDestinations } from "@/hooks/useDestinations";
import { useCategories } from "@/hooks/useCategories";

const PAGE_SIZE = 9;

const Destinations = () => {
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get("category") || "All";
  const urlSearch = searchParams.get("search") || "";
  const urlExclude = searchParams.get("exclude") || "";

  const [search, setSearch] = useState(urlSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [excludeCategories, setExcludeCategories] = useState<string[]>(
    urlExclude ? urlExclude.split(",").map((c) => c.trim()).filter(Boolean) : []
  );

  // Sync state when URL search params change (e.g., clicking navbar links while on this page)
  useEffect(() => {
    setSelectedCategory(urlCategory);
    setSearch(urlSearch);
    setDebouncedSearch(urlSearch);
    setExcludeCategories(
      urlExclude ? urlExclude.split(",").map((c) => c.trim()).filter(Boolean) : []
    );
    setPage(1);
  }, [urlCategory, urlSearch, urlExclude]);
  const [sortBy, setSortBy] = useState<"rating" | "price-low" | "price-high">("rating");
  const [priceMin, setPriceMin] = useState<number | undefined>();
  const [priceMax, setPriceMax] = useState<number | undefined>();
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const { categories } = useCategories();
  const { destinations, totalCount, totalPages, currentPage, loading } = useDestinations({
    search: debouncedSearch,
    category: selectedCategory,
    excludeCategories,
    sortBy,
    priceMin,
    priceMax,
    page,
    pageSize: PAGE_SIZE,
  });

  // Simple debounce on search
  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
    clearTimeout((window as any).__searchTimer);
    (window as any).__searchTimer = setTimeout(() => setDebouncedSearch(val), 400);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setPage(1);
  };

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="container-custom py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">Discover Destinations</h1>
          <p className="text-muted-foreground mb-8">Explore India's most incredible places, festivals, and craft traditions.</p>
        </motion.div>

        {/* Search + Sort + Filter toggle */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex items-center gap-2 flex-1 px-4 py-3 rounded-xl bg-card border border-border">
            <Search size={18} className="text-muted-foreground" />
            <input type="text" value={search} onChange={(e) => handleSearch(e.target.value)} placeholder="Search destinations, states, categories..." className="bg-transparent text-foreground placeholder:text-muted-foreground text-sm w-full focus:outline-none" />
          </div>
          <select value={sortBy} onChange={(e) => { setSortBy(e.target.value as any); setPage(1); }} className="px-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="rating">Top Rated</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
          </select>
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>

        {/* Price range filters */}
        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex flex-wrap gap-4 mb-6 p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2">
              <label className="text-xs text-muted-foreground">Min ₹</label>
              <input type="number" value={priceMin || ""} onChange={(e) => { setPriceMin(e.target.value ? Number(e.target.value) : undefined); setPage(1); }} placeholder="0" className="w-24 px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground focus:outline-none" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-muted-foreground">Max ₹</label>
              <input type="number" value={priceMax || ""} onChange={(e) => { setPriceMax(e.target.value ? Number(e.target.value) : undefined); setPage(1); }} placeholder="50000" className="w-24 px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground focus:outline-none" />
            </div>
            <button onClick={() => { setPriceMin(undefined); setPriceMax(undefined); setPage(1); }} className="text-xs text-primary hover:underline">Clear filters</button>
          </motion.div>
        )}

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => handleCategoryChange("All")} className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${selectedCategory === "All" ? "gold-gradient text-accent-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"}`}>
            All
          </button>
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => handleCategoryChange(cat.name)} className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${selectedCategory === cat.name ? "gold-gradient text-accent-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"}`}>
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-xs text-muted-foreground mb-4">
          Showing {destinations.length} of {totalCount} destinations • Page {currentPage} of {totalPages || 1}
        </p>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-muted animate-pulse h-80" />
            ))}
          </div>
        ) : destinations.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No destinations found. Try adjusting your filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest, i) => (
              <motion.div key={dest.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link to={`/destination/${dest.id}`} className="group block rounded-2xl overflow-hidden bg-card border border-border hover:shadow-xl transition-shadow">
                  <div className="relative h-56 overflow-hidden">
                    <SafeImage src={dest.image} alt={dest.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium glass text-primary-foreground">{dest.category}</span>
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
                        <span className="text-muted-foreground text-xs">({dest.reviews_count})</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{dest.short_desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold">₹{dest.price.toLocaleString("en-IN")}<span className="text-muted-foreground font-normal text-xs"> /person</span></span>
                      <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">View Details <ArrowRight size={14} /></span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="flex items-center gap-1 px-4 py-2 rounded-xl bg-card border border-border text-sm text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors">
              <ChevronLeft size={16} /> Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .map((p, idx, arr) => (
                <span key={p}>
                  {idx > 0 && arr[idx - 1] !== p - 1 && <span className="text-muted-foreground px-1">…</span>}
                  <button onClick={() => setPage(p)} className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${p === page ? "gold-gradient text-accent-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"}`}>
                    {p}
                  </button>
                </span>
              ))}
            <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="flex items-center gap-1 px-4 py-2 rounded-xl bg-card border border-border text-sm text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors">
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;
